#!/usr/bin/env node
/**
 * Gera feriados-predefinidos/manifest.json a partir dos arquivos de conjunto.
 *
 * Cada conjunto (ex.: TJBA-2025-2026.json) traz as datas em "feriadosPersonalizados"
 * e os dados do índice num bloco "meta" (id2, nome, descricao, ano, links).
 * O manifest é sempre gerado por este script; não edite manifest.json à mão.
 *
 * dataAtualizacao: mantém a data anterior quando nada mudou no conjunto; quando as
 * datas ou o bloco meta mudam (comparando com --base-ref), grava a data de hoje.
 *
 * Uso:
 *   node scripts/gerar-manifest.js                    # gera (base: HEAD)
 *   node scripts/gerar-manifest.js --base-ref <sha>   # compara com outro commit
 *   node scripts/gerar-manifest.js --verificar        # só valida; não escreve nada
 *
 * Sem dependências externas. Requer git apenas para --base-ref.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const RAIZ = path.resolve(__dirname, '..');
const PASTA = path.join(RAIZ, 'feriados-predefinidos');
const MANIFEST = path.join(PASTA, 'manifest.json');
const PASTA_REL = 'feriados-predefinidos';

const args = process.argv.slice(2);
const VERIFICAR = args.includes('--verificar');
const baseIdx = args.indexOf('--base-ref');
const BASE_REF = baseIdx >= 0 ? args[baseIdx + 1] : 'HEAD';

const erros = [];
const avisos = [];

/* ---------- utilitários ---------- */
function dataValida(a, m, d) {
  const dt = new Date(Date.UTC(a, m - 1, d));
  return dt.getUTCFullYear() === a && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}
function isoValida(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s));
  return !!m && dataValida(+m[1], +m[2], +m[3]);
}
function hojeBR() {
  const p = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', year: 'numeric' })
    .formatToParts(new Date());
  const v = t => p.find(x => x.type === t).value;
  return `${v('day')}-${v('month')}-${v('year')}`;
}
function gitShow(ref, relPath) {
  try {
    return execFileSync('git', ['show', `${ref}:${relPath}`], { cwd: RAIZ, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch (e) {
    return null;
  }
}
function lerJSON(texto, nome) {
  try { return JSON.parse(texto); }
  catch (e) { erros.push(`${nome}: JSON inválido (${e.message}). Confira vírgulas, aspas e colchetes.`); return null; }
}

/* ---------- normalização (ordem de chaves estável) ---------- */
function normLinks(links) {
  return (links || []).map(l => {
    const o = { url: l.url, rotulo: l.rotulo };
    if (l.ate !== undefined) o.ate = l.ate;
    if (l.datas !== undefined) o.datas = l.datas;
    return o;
  });
}
function entradaManifest(arquivo, meta, dataAtualizacao) {
  return {
    id: meta.id || arquivo.replace(/\.json$/i, '').toLowerCase(),
    id2: meta.id2,
    arquivo,
    nome: meta.nome,
    descricao: meta.descricao,
    dataAtualizacao,
    ano: meta.ano,
    links: normLinks(meta.links)
  };
}
function assinatura(feriados, meta) {
  return JSON.stringify({
    feriados: feriados || [],
    meta: {
      id: meta.id, id2: meta.id2, nome: meta.nome, descricao: meta.descricao,
      ano: meta.ano, links: normLinks(meta.links)
    }
  });
}

/* ---------- validação ---------- */
function validarConjunto(arquivo, dados) {
  const n = arquivo;
  if (!/^[A-Z0-9]+(-[A-Z0-9]+)*-\d{4}(-\d{4})?\.json$/.test(arquivo)) {
    avisos.push(`${n}: nome fora do padrão SIGLA-ANO.json (ex.: TJBA-2025-2026.json).`);
  }
  const lista = dados.feriadosPersonalizados;
  if (!Array.isArray(lista) || lista.length === 0) {
    erros.push(`${n}: "feriadosPersonalizados" precisa ser uma lista com ao menos uma data.`);
  } else {
    const vistos = new Set();
    lista.forEach((linha, i) => {
      const m = /^(\d{2})-(\d{2})-(\d{4}) (.+)$/.exec(linha);
      if (typeof linha !== 'string' || !m) {
        erros.push(`${n}: item ${i + 1} ("${linha}") fora do formato "DD-MM-AAAA Nome".`);
        return;
      }
      if (!dataValida(+m[3], +m[2], +m[1])) erros.push(`${n}: item ${i + 1} tem data inexistente (${m[1]}-${m[2]}-${m[3]}).`);
      if (vistos.has(linha)) avisos.push(`${n}: linha repetida "${linha}".`);
      vistos.add(linha);
    });
  }
  const meta = dados.meta;
  if (!meta || typeof meta !== 'object') {
    erros.push(`${n}: falta o bloco "meta" (id2, nome, descricao, ano, links).`);
    return false;
  }
  ['id2', 'nome', 'descricao', 'ano'].forEach(k => {
    if (typeof meta[k] !== 'string' || !meta[k].trim()) erros.push(`${n}: meta.${k} é obrigatório (texto).`);
  });
  if (!Array.isArray(meta.links) || meta.links.length === 0) {
    erros.push(`${n}: meta.links precisa de ao menos um link para o ato normativo.`);
  } else {
    meta.links.forEach((l, i) => {
      const r = `${n}: meta.links[${i + 1}]`;
      if (!l || typeof l.url !== 'string' || !/^https?:\/\//.test(l.url)) erros.push(`${r}: "url" deve começar com https://`);
      if (!l || typeof l.rotulo !== 'string' || !l.rotulo.trim()) erros.push(`${r}: "rotulo" é obrigatório.`);
      if (l && l.ate !== undefined && !isoValida(l.ate)) erros.push(`${r}: "ate" deve estar no formato AAAA-MM-DD.`);
      if (l && l.datas !== undefined) {
        if (!Array.isArray(l.datas)) erros.push(`${r}: "datas" deve ser uma lista.`);
        else l.datas.forEach((d, j) => {
          const ok = typeof d === 'string' ? isoValida(d) : (d && isoValida(d.de) && isoValida(d.ate));
          if (!ok) erros.push(`${r}: datas[${j + 1}] deve ser "AAAA-MM-DD" ou {"de": "AAAA-MM-DD", "ate": "AAAA-MM-DD"}.`);
        });
      }
    });
  }
  return true;
}

/* ---------- principal ---------- */
const manifestAtualTxt = fs.existsSync(MANIFEST) ? fs.readFileSync(MANIFEST, 'utf8') : null;
const manifestAtual = manifestAtualTxt ? lerJSON(manifestAtualTxt, 'manifest.json') : null;
const baseManifestTxt = gitShow(BASE_REF, `${PASTA_REL}/manifest.json`);
const baseManifest = baseManifestTxt ? (() => { try { return JSON.parse(baseManifestTxt); } catch (e) { return null; } })() : null;

const porArquivoBase = new Map(((baseManifest && baseManifest.conjuntos) || []).map(c => [c.arquivo, c]));
const porArquivoAtual = new Map(((manifestAtual && manifestAtual.conjuntos) || []).map(c => [c.arquivo, c]));

const arquivos = fs.readdirSync(PASTA).filter(f => f.endsWith('.json') && f !== 'manifest.json');
const conjuntos = [];
const hoje = hojeBR();

for (const arquivo of arquivos) {
  const dados = lerJSON(fs.readFileSync(path.join(PASTA, arquivo), 'utf8'), arquivo);
  if (!dados) continue;
  if (!validarConjunto(arquivo, dados)) continue;
  const meta = dados.meta;

  // Data anterior: do manifest base (commit anterior) ou, na falta, do manifest atual.
  const anterior = porArquivoBase.get(arquivo) || porArquivoAtual.get(arquivo);
  let dataAtualizacao = anterior ? anterior.dataAtualizacao : hoje;

  // Compara com a versão anterior do arquivo para decidir se houve mudança.
  const baseArqTxt = gitShow(BASE_REF, `${PASTA_REL}/${arquivo}`);
  if (anterior && baseArqTxt) {
    let baseArq = null;
    try { baseArq = JSON.parse(baseArqTxt); } catch (e) { baseArq = null; }
    // Antes da migração, os dados do índice só existiam no manifest.
    const metaBase = { ...(porArquivoBase.get(arquivo) || {}), ...((baseArq && baseArq.meta) || {}) };
    const metaNova = { ...meta, id: meta.id || arquivo.replace(/\.json$/i, '').toLowerCase() };
    const mudou = !baseArq || assinatura(baseArq.feriadosPersonalizados, metaBase) !== assinatura(dados.feriadosPersonalizados, metaNova);
    if (mudou) dataAtualizacao = hoje;
  } else if (!anterior) {
    dataAtualizacao = hoje;
  }
  conjuntos.push(entradaManifest(arquivo, meta, dataAtualizacao));
}

// Ordem: mantém a do manifest atual; conjuntos novos entram no fim, em ordem alfabética.
const ordem = ((manifestAtual && manifestAtual.conjuntos) || []).map(c => c.arquivo);
conjuntos.sort((a, b) => {
  const ia = ordem.indexOf(a.arquivo), ib = ordem.indexOf(b.arquivo);
  if (ia >= 0 && ib >= 0) return ia - ib;
  if (ia >= 0) return -1;
  if (ib >= 0) return 1;
  return a.arquivo.localeCompare(b.arquivo);
});

avisos.forEach(a => console.log(`aviso: ${a}`));
if (erros.length) {
  erros.forEach(e => console.error(`erro: ${e}`));
  console.error(`\n${erros.length} erro(s). O manifest.json NÃO foi alterado.`);
  process.exit(1);
}

const novo = JSON.stringify({ versao: '2.0', conjuntos }, null, 2) + '\n';
if (VERIFICAR) {
  console.log(`ok: ${conjuntos.length} conjunto(s) válidos.`);
  process.exit(0);
}
if (novo === manifestAtualTxt) {
  console.log('manifest.json já está atualizado.');
} else {
  fs.writeFileSync(MANIFEST, novo);
  console.log(`manifest.json gerado com ${conjuntos.length} conjunto(s).`);
}
