---
name: feriados-contaprazo
description: Atualiza ou cria conjuntos de feriados do ContaPrazo a partir de um decreto, portaria, provimento ou resolução (PDF, link ou texto). Use quando o usuário enviar um ato normativo de tribunal ou prefeitura com feriados, pontos facultativos, recessos ou suspensões de prazo e quiser atualizar o arquivo do conjunto (ex.: TJBA-2025-2026.json) no repositório italoanfreitas-ui/contaprazo.
---

# Feriados ContaPrazo

Você ajuda a manter os conjuntos de feriados do ContaPrazo. Cada conjunto é **um único arquivo JSON** em `feriados-predefinidos/`. O usuário edita só esse arquivo; o `manifest.json` é gerado por uma automação do GitHub e **nunca** deve ser editado nem entregue.

## Fluxo

1. **Descubra o conjunto.** Pergunte qual tribunal/órgão e período, se não estiver claro. Conjuntos existentes:
   TJBA-2025-2026, TJSP-2025-2026, TRT5-2025-2026, TRF1-2025-2026, STJ-2025-2026, STF-2025-2026, PMVC-2026.
2. **Busque a versão atual** do arquivo, para não perder nada:
   `https://raw.githubusercontent.com/italoanfreitas-ui/contaprazo/main/feriados-predefinidos/<ARQUIVO>.json`
   Se não conseguir acessar, peça ao usuário para colar o conteúdo atual. Para um conjunto novo, comece do modelo abaixo.
3. **Leia o ato normativo** e extraia cada dia de feriado, ponto facultativo, recesso ou suspensão de expediente/prazos.
4. **Mostre a lista para conferência antes de gerar o arquivo**, numa tabela com: data, dia da semana, nome e situação (**nova**, **alterada**, **removida** ou **igual**). Destaque dúvidas (datas ambíguas, suspensões só em algumas unidades, expediente reduzido).
5. Depois da confirmação, **entregue o arquivo completo** (não um trecho), pronto para baixar, e explique como publicar (seção "Publicar").

## Formato do arquivo

```json
{
  "meta": {
    "id": "tjba-2025-2026",
    "id2": "TJBA 2025-2026",
    "nome": "TJBA - Tribunal de Justiça da Bahia (2025-2026)",
    "descricao": "Suspensões de acordo com o Decreto Judiciário nº 1050, de 04 de dezembro de 2025",
    "ano": "2025-2026",
    "links": [
      { "url": "https://...", "rotulo": "Decreto nº 1050/2025", "ate": "2026-12-31" }
    ]
  },
  "feriadosPersonalizados": [
    "07-12-2026 Dia da Justiça – TJBA",
    "08-12-2026 Dia da Justiça – TJBA"
  ]
}
```

### Regras de `feriadosPersonalizados`

- Cada item é um texto `"DD-MM-AAAA Nome"`. Datas sempre com dois dígitos e ano com quatro.
- Nome no padrão do conjunto: `Nome do feriado – SIGLA`, com **travessão (–)**, não hífen. Ex.: `"02-07-2026 Independência da Bahia – TJBA"`. Siga o estilo das linhas que já existem no arquivo.
- Em suspensões, use o padrão existente, ex.: `"Suspensão do expediente forense – Carnaval (TJBA)"` ou `"Recesso Forense – TJBA"`.
- Inclua **todos** os dias do ato, inclusive os que coincidem com feriados nacionais (os arquivos atuais fazem assim) e cada dia de um recesso (um item por dia).
- Ordem cronológica. Pode separar grupos (meses, recessos) com uma linha em branco, como nos arquivos atuais.
- Não repita a mesma linha. A mesma data com nomes diferentes só se o ato disser coisas diferentes.
- Ao atualizar para um ano novo, mantenha as datas dos anos ainda cobertos pelo conjunto e retire as que o novo ato revoga.

### Regras de `meta`

- `id2`, `nome`, `descricao` e `ano` são obrigatórios (texto). `id` é opcional; se faltar, vira o nome do arquivo em minúsculas.
- `descricao`: cite os atos normativos (número, data), como nas descrições atuais.
- `links`: ao menos um, com `url` (https) e `rotulo` curto, ex.: `"Decreto nº 1050/2025"`, `"Portaria PRESI nº 5/2026"`.
  - Um ato por período: use `"ate": "AAAA-MM-DD"` (último dia que o ato cobre). O app escolhe o primeiro link, em ordem de data, cujo `ate` seja igual ou posterior ao feriado.
  - Um ato que cobre só algumas datas (ex.: decreto extra de São João): use `"datas": ["2026-06-22", {"de": "2026-06-01", "ate": "2026-06-05"}]`. `datas` tem prioridade sobre `ate`.
  - Ao acrescentar um decreto novo, **mantenha os links antigos** que ainda cobrem datas do arquivo.
- Não inclua `arquivo` nem `dataAtualizacao`: a automação calcula.

### Nome do arquivo

`SIGLA-ANO.json` ou `SIGLA-ANO-ANO.json` (ex.: `TJBA-2026-2027.json`). Se o período mudar, pergunte se o usuário quer **atualizar o arquivo atual** (mesmo nome; os perfis dos usuários recebem a atualização) ou **criar um conjunto novo** (novo nome; aparece como opção nova no app).

## Antes de entregar, confira

- O JSON é válido (aspas duplas, sem vírgula sobrando no fim de listas).
- Toda data existe no calendário (nada de 31-02).
- Toda linha segue `DD-MM-AAAA Nome`.
- `meta` tem os campos obrigatórios e ao menos um link com `url` e `rotulo`.
- O resumo para o usuário diz quantas datas entraram, saíram e mudaram.

## Publicar

Diga ao usuário:

1. No GitHub, abra `italoanfreitas-ui/contaprazo` → pasta `feriados-predefinidos`.
2. Para atualizar: abra o arquivo, clique no lápis (Edit), apague tudo e cole o conteúdo novo. Para um conjunto novo: **Add file → Upload files** e envie o arquivo.
3. Clique em **Commit changes** no branch `main`.
4. Pronto. Em cerca de um minuto, a automação "Manifest de feriados" valida o arquivo e atualiza o `manifest.json`; o app avisa os usuários que há datas novas. Se a automação falhar, o GitHub manda um e-mail com o erro e o manifest não é alterado; traga a mensagem para corrigir.
