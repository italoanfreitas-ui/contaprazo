# Conjuntos de Feriados Pré-definidos

Este diretório contém os conjuntos de feriados personalizados disponíveis para importação online na aplicação ContaPrazo, além do arquivo `manifest.json` que os indexa.

## 📋 Formato dos Arquivos de Feriados

Cada arquivo JSON de feriados segue o formato:

```json
{
  "nome": "TJBA - Tribunal de Justiça da Bahia (2025-2026)",
  "descricao": "Suspensões conforme Decretos Judiciários nº ...",
  "versao": "1.0",
  "ano": "2025-2026",
  "feriadosPersonalizados": [
    {
      "data": "2025-01-20",
      "nome": "Dia de São Sebastião"
    },
    {
      "data": "2025-11-30",
      "nome": "Dia do Evangélico"
    }
  ]
}
```

> Datas no formato ISO 8601: `YYYY-MM-DD`. Inclua apenas feriados personalizados (estaduais, municipais, pontos facultativos) — os feriados nacionais fixos e móveis já estão embutidos na aplicação.

## 📦 Formato do manifest.json

O `manifest.json` (versão 2.0) indexa todos os conjuntos disponíveis para importação. Estrutura completa:

```json
{
  "versao": "2.0",
  "conjuntos": [
    {
      "id": "tjba-2025-2026",
      "id2": "TJBA 2025-2026",
      "arquivo": "TJBA-2025-2026.json",
      "nome": "TJBA - Tribunal de Justiça da Bahia (2025-2026)",
      "descricao": "Suspensões conforme Decretos Judiciários nº ...",
      "dataAtualizacao": "DD-MM-YYYY",
      "ano": "2025-2026",
      "links": [...]
    }
  ]
}
```

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `id` | sim | Identificador único (slug) |
| `id2` | sim | Rótulo curto exibido na UI |
| `arquivo` | sim | Nome do arquivo JSON deste conjunto |
| `nome` | sim | Nome completo exibido na UI |
| `descricao` | sim | Descrição resumida dos atos normativos |
| `dataAtualizacao` | sim | Data da última atualização (`DD-MM-YYYY`) |
| `ano` | sim | Ano ou intervalo coberto (ex: `"2025"` ou `"2025-2026"`) |
| `links` | sim | Array de atos normativos (ver abaixo) |

### Campo `links`

Cada conjunto deve ter ao menos um link apontando para o ato normativo de referência. O sistema seleciona automaticamente o link correto para cada data de feriado.

#### Um único link

```json
"links": [
  {
    "url": "https://...",
    "rotulo": "Decreto Municipal nº 24.007/2025"
  }
]
```

#### Múltiplos links — por período (`ate`)

Use quando atos normativos diferentes cobrem anos distintos. O sistema seleciona o **primeiro** link cujo `ate` seja maior ou igual à data do feriado.

```json
"links": [
  {
    "url": "https://...",
    "rotulo": "Decreto nº 1050/2025",
    "ate": "2026-12-31"
  },
  {
    "url": "https://...",
    "rotulo": "Decretos nº 949-951/2024",
    "ate": "2025-12-31"
  }
]
```

#### Múltiplos links — por datas específicas (`datas`) *(novo)*

Use quando um ato normativo cobre apenas **datas pontuais ou intervalos específicos** dentro do período. A chave `datas` tem **prioridade** sobre `ate`.

```json
"links": [
  {
    "url": "https://...",
    "rotulo": "Portaria nº 10/2025",
    "datas": [
      "2025-01-20",
      {"de": "2025-06-01", "ate": "2025-06-30"},
      "2025-11-15"
    ]
  },
  {
    "url": "https://...",
    "rotulo": "Portaria nº 5/2025",
    "ate": "2025-12-31"
  }
]
```

**Tipos de entrada em `datas`:**

| Tipo | Formato | Descrição |
|------|---------|-----------|
| Data exata | `"YYYY-MM-DD"` | Cobre apenas aquela data |
| Intervalo | `{"de": "YYYY-MM-DD", "ate": "YYYY-MM-DD"}` | Intervalo fechado (início e fim inclusivos) |

**Regras de seleção de link** (em ordem de prioridade):
1. Se algum link tem `datas` que cobre a data do feriado → usa esse link
2. Caso contrário, aplica a lógica de `ate` (seleção pelo período)

> **Compatibilidade total**: `datas` é opcional. Links sem essa chave continuam funcionando normalmente.

## 🗓️ Conjuntos Disponíveis

| Arquivo | Conjunto | Período |
|---------|----------|---------|
| `TJBA-2025-2026.json` | Tribunal de Justiça da Bahia | 2025–2026 |
| `TJSP-2025-2026.json` | Tribunal de Justiça de São Paulo | 2025–2026 |
| `TRT5-2025-2026.json` | TRT 5ª Região | 2025–2026 |
| `TRF1-2025-2026.json` | TRF 1ª Região | 2025–2026 |
| `STJ-2025-2026.json` | Superior Tribunal de Justiça | 2025–2026 |
| `STF-2025-2026.json` | Supremo Tribunal Federal | 2025–2026 |
| `PMVC-2026.json` | Prefeitura Municipal de Vitória da Conquista | 2026 |

## 📝 Como Adicionar Novos Conjuntos

1. Crie o arquivo JSON de feriados seguindo o formato acima
2. Use o padrão de nome: `[SIGLA]-[ANO(S)].json`
3. Adicione a entrada correspondente no `manifest.json`
4. Teste a importação na aplicação

## ⚠️ Boas Práticas

- Sempre verifique as datas com a fonte oficial antes de publicar
- Mantenha os arquivos atualizados anualmente
- Use datas no formato ISO 8601 (`YYYY-MM-DD`) em todos os campos
- Atualize `dataAtualizacao` no manifest sempre que editar um conjunto

---

Para mais informações sobre a aplicação, consulte o README principal do projeto.
