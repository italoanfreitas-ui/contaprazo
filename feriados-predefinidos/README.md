# Conjuntos de Feriados Pré-definidos

Este diretório guarda os conjuntos de feriados que o ContaPrazo oferece para importação online. Cada conjunto é **um arquivo só**, com as datas e os dados do ato normativo. O `manifest.json` é o índice que o app lê, e é **gerado automaticamente**.

## ✍️ Como publicar um decreto novo

1. Abra (ou crie) o arquivo do conjunto, por exemplo `TJBA-2025-2026.json`.
2. Edite as datas em `feriadosPersonalizados` e, se for o caso, o bloco `meta` (descrição e links do decreto).
3. Salve no branch `main`.

Pronto. A automação **Manifest de feriados** (GitHub Actions) valida o arquivo e reescreve o `manifest.json`, inclusive a `dataAtualizacao`, que faz o app avisar os usuários que há datas novas. **Não edite o `manifest.json` à mão.**

Se houver erro no arquivo (vírgula a mais, data inexistente, campo faltando), a automação falha, avisa por e-mail e **não mexe no manifest**, então a lista de conjuntos do app continua funcionando.

## 📋 Formato do arquivo de conjunto

```json
{
  "meta": {
    "id": "tjba-2025-2026",
    "id2": "TJBA 2025-2026",
    "nome": "TJBA - Tribunal de Justiça da Bahia (2025-2026)",
    "descricao": "Suspensões de acordo com o Decreto Judiciário nº 1050, de 04 de dezembro de 2025",
    "ano": "2025-2026",
    "links": [
      {
        "url": "https://www7.tjba.jus.br/...",
        "rotulo": "Decreto nº 1050/2025",
        "ate": "2026-12-31"
      }
    ]
  },
  "feriadosPersonalizados": [
    "07-12-2026 Dia da Justiça – TJBA",
    "08-12-2026 Dia da Justiça – TJBA"
  ]
}
```

### `feriadosPersonalizados`

Cada item é um texto no formato **`DD-MM-AAAA Nome`**. Inclua só feriados estaduais, municipais, do tribunal e pontos facultativos: os nacionais fixos e móveis já estão no app. Linhas em branco entre grupos de datas são permitidas.

### `meta`

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `id` | não | Identificador único. Se faltar, vira o nome do arquivo em minúsculas (`tjba-2025-2026`) |
| `id2` | sim | Rótulo curto exibido no app |
| `nome` | sim | Nome completo exibido no app |
| `descricao` | sim | Resumo dos atos normativos |
| `ano` | sim | Ano ou intervalo coberto (`"2026"` ou `"2025-2026"`) |
| `links` | sim | Atos normativos (ao menos um) |

`arquivo` e `dataAtualizacao` não ficam aqui: a automação calcula e grava no manifest.

### `links`

O app escolhe sozinho o link certo para cada feriado.

- **Um link só:** `{ "url": "https://...", "rotulo": "Decreto nº 24.007/2025" }`
- **Por período (`ate`):** o app usa o primeiro link (em ordem de data) cujo `ate` seja igual ou posterior à data do feriado.
- **Por datas específicas (`datas`):** tem prioridade sobre `ate`. Aceita `"AAAA-MM-DD"` ou intervalos `{"de": "AAAA-MM-DD", "ate": "AAAA-MM-DD"}`.

```json
"links": [
  { "url": "https://...", "rotulo": "Decreto nº 24.279/2026", "datas": ["2026-06-22", "2026-06-23"] },
  { "url": "https://...", "rotulo": "Decreto nº 24.007/2025", "ate": "2026-12-31" }
]
```

## 🛠️ Rodar a automação localmente (opcional)

```bash
node scripts/gerar-manifest.js --verificar   # só valida
node scripts/gerar-manifest.js               # valida e gera o manifest
```

## 🗓️ Conjuntos disponíveis

| Arquivo | Conjunto | Período |
|---------|----------|---------|
| `TJBA-2025-2026.json` | Tribunal de Justiça da Bahia | 2025–2026 |
| `TJSP-2025-2026.json` | Tribunal de Justiça de São Paulo | 2025–2026 |
| `TRT5-2025-2026.json` | TRT 5ª Região | 2025–2026 |
| `TRF1-2025-2026.json` | TRF 1ª Região | 2025–2026 |
| `STJ-2025-2026.json` | Superior Tribunal de Justiça | 2025–2026 |
| `STF-2025-2026.json` | Supremo Tribunal Federal | 2025–2026 |
| `PMVC-2026.json` | Prefeitura Municipal de Vitória da Conquista | 2026 |

## ⚠️ Boas práticas

- Confira as datas na fonte oficial antes de publicar.
- Use o padrão de nome `SIGLA-ANO.json` ou `SIGLA-ANO-ANO.json`.
- Siga o padrão dos nomes: `Nome do feriado – SIGLA` (com travessão).
