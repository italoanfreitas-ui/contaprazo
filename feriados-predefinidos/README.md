# Conjuntos de Feriados Pré-definidos

Este diretório contém conjuntos de feriados personalizados para diferentes tribunais, prefeituras e jurisdições.

## 📋 Formato dos Arquivos

Cada arquivo JSON de feriados deve seguir o formato:

```json
{
  "nome": "Nome do Conjunto",
  "descricao": "Descrição detalhada",
  "versao": "1.0",
  "ano": 2025,
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

## 🗓️ Conjuntos Disponíveis

### TJBA-2025-2026.json
Feriados do Tribunal de Justiça da Bahia para os anos 2025 e 2026, incluindo:
- Feriados estaduais
- Feriados municipais de Salvador
- Pontos facultativos do tribunal

### PMVC-2026.json
Feriados da Prefeitura Municipal de Vitória da Conquista para o ano 2026, incluindo:
- Feriados municipais
- Pontos facultativos
- Datas especiais

## 📝 Como Adicionar Novos Conjuntos

1. Crie um arquivo JSON no formato especificado
2. Use o padrão de nome: `[SIGLA]-[ANO(S)].json`
3. Adicione entrada no `manifest.json`
4. Teste a importação na aplicação

## 🔗 Atualização Automática

A aplicação pode verificar e baixar automaticamente novos conjuntos de feriados deste repositório através da funcionalidade "Atualizar Feriados" nas configurações.

## 📦 Manifest.json

O arquivo `manifest.json` lista todos os conjuntos disponíveis para download automático:

```json
{
  "versao": "1.0",
  "ultimaAtualizacao": "2025-01-15",
  "conjuntos": [
    {
      "id": "tjba-2025-2026",
      "nome": "TJBA 2025-2026",
      "arquivo": "TJBA-2025-2026.json",
      "descricao": "Feriados do Tribunal de Justiça da Bahia",
      "tags": ["bahia", "tribunal", "tj"]
    }
  ]
}
```

## 🤝 Contribuindo

Para contribuir com novos conjuntos de feriados:

1. Crie o arquivo JSON seguindo o formato
2. Valide o JSON em um validador online
3. Teste na aplicação localmente
4. Submeta via pull request

## ⚠️ Importante

- Sempre verifique as datas com a fonte oficial
- Mantenha os arquivos atualizados anualmente
- Use datas no formato ISO 8601 (YYYY-MM-DD)
- Inclua apenas feriados personalizados (estaduais, municipais, pontos facultativos)
- Os feriados nacionais fixos e móveis já estão incluídos na aplicação

---

Para mais informações, consulte o README principal do projeto.
