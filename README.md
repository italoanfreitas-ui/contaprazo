# ContaPrazo Calculadora

Calculadora de prazos processuais com calendário inteligente de feriados brasileiros e sistema completo de gestão de agenda.

## 📋 Sobre o Projeto

ContaPrazo é uma aplicação web standalone (HTML + CSS + JavaScript puro) desenvolvida para advogados, estudantes de direito e profissionais que precisam calcular prazos processuais com precisão. O sistema considera:

- **Dias úteis ou corridos**
- **Feriados nacionais** (fixos e móveis)
- **Feriados personalizados** (estaduais, municipais, pontos facultativos)
- **Finais de semana**
- **Calendário completo** com visualização mensal

## ✨ Funcionalidades Principais

### Calculadora de Prazos
- Cálculo de prazos em dias úteis ou corridos
- Detalhamento do cálculo dia a dia do período
- Identificação visual de feriados e finais de semana
- Campo opcional para descrição do prazo
- Visualização de calendário interativo (Mensal, Bimestral, Trimestral ou Anual)
- **Salvar no Google Agenda**: gera link dinâmico com data final, início, perfil de feriados e links dos atos normativos consultados

### Sistema de Feriados
- Feriados nacionais fixos pré-configurados
- Feriados móveis calculados automaticamente (Carnaval, Páscoa, Corpus Christi)
- Editor de feriados personalizados com validação
- Importação/exportação de conjuntos de feriados
- Conjuntos pré-definidos online para diferentes estados/municípios
- Atualização automática de feriados via repositório online
- **Perfis de feriados**: salve e alterne entre conjuntos diferentes de feriados personalizados (ex: TJSP, TJRJ, TRF3)

### Minha Agenda
- **Salvar prazos calculados** com título e descrição personalizados
- **Filtros inteligentes**: Todos, Atrasados, Vencendo (≤3 dias), Pendentes, Concluídos
- **Marcar como concluído** com data de conclusão automática
- **Detalhamento completo** de cada prazo salvo
- **Editar prazos** salvos
- **Sistema de arquivamento**:
  - Arquivar prazos antigos (>90 dias)
  - Arquivar todos os concluídos
  - Ver prazos arquivados separadamente
  - Desarquivar com escolha de status
  - Excluir permanentemente
- **Exportar/Importar agenda** em formato JSON
- **Paginação** (20 itens por página)
- **Notificações elegantes** estilo iOS
- **Alerta visual** ao abrir página com prazos vencendo

### Exportação e Compartilhamento
- **Imprimir PDF** via nova aba (Ctrl+P / Cmd+P)
- **Exportar como imagem PNG** (resumido ou completo)
- **Salvar no Google Agenda**: botão dedicado com logo oficial, abre evento pré-preenchido com data final, período, perfil ativo e atos normativos consultados
- **Copiar para área de transferência** (texto formatado ou puro)
- **Abrir em nova aba** para impressão
- **Baixar calculadora completa** em arquivo HTML único para uso offline

### Configurações Avançadas
- Editor de feriados fixos e móveis
- Editor batch de feriados personalizados
- Importação de arquivos JSON de configuração
- Restaurar configurações padrão
- Limpar feriados personalizados
- Atualização automática de conjuntos de feriados

## 🚀 Como Usar

### Uso Online
1. Acesse a aplicação no seu navegador
2. Não requer instalação, login ou internet (após carregar)
3. Todos os dados são salvos localmente no navegador (localStorage)

### Uso Offline
1. Clique em "Baixar esta calculadora para compartilhar" no rodapé
2. Salve o arquivo HTML no seu computador
3. Abra o arquivo em qualquer navegador moderno
4. Funciona 100% offline, sem necessidade de internet

### Compartilhamento
- Compartilhe o arquivo HTML baixado com colegas
- Exporte suas configurações de feriados personalizados
- Compartilhe conjuntos de feriados via JSON

## 💾 Armazenamento de Dados

Todos os dados são salvos localmente no navegador usando `localStorage`:
- Prazos salvos na agenda
- Prazos arquivados
- Feriados personalizados configurados
- Perfis de feriados criados
- Configurações de feriados fixos e móveis (se alteradas)

**Importante**: Os dados são específicos do navegador e dispositivo. Use a função de exportar/importar agenda para fazer backup ou transferir dados entre dispositivos.

## 🔔 Sistema de Notificações

A aplicação exibe notificações elegantes estilo iOS para feedback de ações:
- ✅ Sucesso (verde)
- ❌ Erro (vermelho)
- ⚠️ Aviso (amarelo)
- ℹ️ Informação (azul)

Ao abrir a página, se houver prazos vencendo, você verá um banner de alerta com opção de ir direto para a agenda.

## 🗓️ Feriados Suportados

### Feriados Nacionais Fixos (Padrão)
- Ano Novo (01/01)
- Tiradentes (21/04)
- Dia do Trabalho (01/05)
- Independência do Brasil (07/09)
- Nossa Senhora Aparecida (12/10)
- Finados (02/11)
- Proclamação da República (15/11)
- Consciência Negra (20/11) *
- Natal (25/12)

### Feriados Nacionais Móveis (Calculados Automaticamente)
- Carnaval (terça-feira)
- Paixão de Cristo (sexta-feira santa)
- Páscoa (domingo)
- Corpus Christi (quinta-feira)

### Feriados Personalizados
Configure feriados estaduais, municipais, pontos facultativos ou datas especiais da sua comarca/fórum.

## 🎨 Interface

- Design moderno e responsivo
- Cores intuitivas por status de prazo:
  - 🔴 Vermelho: Atrasado
  - 🟠 Laranja: Vence hoje
  - 🟡 Amarelo: Vencendo (≤3 dias)
  - 🔵 Azul: Pendente
  - 🟢 Verde: Concluído
- Ícones SVG inline (funciona offline)
- Animações suaves
- Menu dropdown inteligente (adapta posição ao scroll)
- Sistema de tooltips unificado com renderização em posição fixa (funciona em seções desativadas e em dispositivos touch)

## ⚙️ Tecnologias

- **HTML5** - Estrutura
- **CSS3** - Estilo e animações
- **JavaScript ES6+** - Lógica e interatividade
- **localStorage** - Persistência de dados
- **html2canvas** - Geração de imagens (CDN)

## 📦 Estrutura do Projeto

```
contaprazo/
├── index.html    # Aplicação completa (standalone)
├── README.md     # Este arquivo
└── .git/         # Controle de versão Git
```

## 🔒 Privacidade

- **100% local**: Todos os dados ficam no seu navegador
- **Sem servidor**: Não enviamos dados para nenhum servidor
- **Sem tracking**: Não coletamos informações de uso
- **Sem login**: Não requer cadastro ou autenticação
- **Offline-first**: Funciona completamente offline

## 🐛 Problemas Conhecidos

Nenhum no momento. Reporte bugs através dos issues do repositório.

## 📝 Changelog

### Versão 1.7 (Atual)
- **Botão "Salvar no Google Agenda"**: gera link dinâmico (sem API) com data final do prazo como evento de dia inteiro; inclui início, dias contados, tipo (úteis/corridos), perfil de feriados ativo, links dos atos normativos consultados (conjuntos online com link) e URL do app
  - Logo oficial do Google Agenda (SVG multicolor) no botão
  - Evento enriquecido com atribuição "Calculado com ContaPrazo"
- **Sistema de tooltips unificado** (`#calTooltipEl`): renderização em `position: fixed` no `<body>`, substituindo os tooltips CSS que quebravam em seções com `opacity` reduzida
  - Intercepta `[data-tooltip]`, `[data-tooltip-html]`, `[title]` e `[data-tiptitle]`
  - Funciona em seções desativadas (dias corridos) e em dispositivos touch (long-press 500ms, oculta ao scroll/arrastar)
- **Padronização do formulário de cálculo**: espaçamentos e tipografia uniformes entre todos os campos
  - Correção do duplo espaço em "Quantidade de dias" (gap do flex + margin do label somavam incorretamente)
  - Rótulos de seção (feriados, perfis) alinhados ao estilo dos demais campos do formulário
  - Badge de perfil desativado visualmente com tooltip explicativo no modo dias corridos
- **Calendário**: visualização Mensal adapta-se automaticamente a Bimestral ou Trimestral conforme espaço disponível; tooltip do botão atualiza dinamicamente com o modo ativo; nomes dos meses exibidos em azul
- **"Detalhamento do cálculo"**: seção de detalhamento renomeada (era "Detalhamento")
- **Consistência visual dos botões de resultado**: fonte, peso e efeitos hover padronizados entre "Salvar no Google Agenda" e "Salvar na Minha Agenda"
- **Dropdown de perfis**: atualiza automaticamente após importação de conjuntos online

### Versão 1.6
- **Versão intermediária** (melhorias internas de perfis e exportações)

### Versão 1.5
- **Rastreabilidade de conjuntos de feriados online**: título e descrição de cada conjunto importado agora são salvos e exibidos em locais estratégicos
  - Exibidos discretamente após o detalhamento do cálculo na tela
  - Incluídos nos exports PDF e PNG (seção "Feriados online utilizados")
  - Persistidos nos perfis de feriados (`conjuntosImportados`), sendo restaurados ao carregar o perfil
  - Lógica de substituir/mesclar refletida nos metadados: substituir descarta conjuntos anteriores; mesclar os acumula
- **Indicador de alterações de perfil após importação**: ao importar feriados (substituir ou mesclar) com um perfil ativo, o indicador de alterações não salvas é sempre exibido
- **Exports PDF e PNG**: link discreto para `contaprazo.netlify.app` adicionado no cabeçalho de todos os exports
- **Modal Export PDF**: formatação alinhada ao modal de PNG (texto simplificado)
- **Dropdown de tipos de feriado** (chip "Incluir no cálculo"):
  - Dropdown usa `position: fixed` — fica sempre visível, acima de qualquer elemento, inclusive com painel colapsado
  - Layout do cabeçalho reestruturado: chip entre o título e a seta de colapso, eliminando o triângulo cinza confuso
  - `stopPropagation` no chip para não colapsar o painel ao clicar
- **Feriados personalizados têm prioridade de nome** sobre fixos e móveis em `obterNomeFeriado()`
- Versão atualizada para 1.5 no rodapé

### Versão 1.4
- **Sistema de perfis de feriados**: crie, gerencie e alterne entre perfis de feriados personalizados
  - Até 10 perfis com nomes de até 30 caracteres
  - Indicador de alterações não salvas
  - Confirmação ao trocar perfil com alterações pendentes
  - Gerenciamento completo (criar, renomear, excluir)
- Remoção da geração direta de PDF (substituída por "Imprimir PDF" via nova aba)
- Correção do toggle "Dias Úteis" que exibia sombra azul incorreta

### Versão 1.3
- Sistema completo de arquivamento de prazos
- Substituição de todos os alerts por notificações elegantes
- Modal para desarquivar com escolha de status
- Botão "Ver Arquivados" com toggle
- Checkbox desabilitado em arquivados
- Menu dropdown corrigido (não corta mais na viewport)
- Opções específicas de menu para arquivados

### Versão 1.2
- Sistema de notificações estilo iOS
- Banner de topo com hover pause
- Paginação (20 itens por página)
- Cores diferenciadas por urgência
- Concordância verbal corrigida
- Espaçamentos uniformes

### Versão 1.1
- Agenda de prazos completa
- Exportar/importar agenda
- Filtros por status
- Edição de prazos

### Versão 1.0
- Calculadora básica de prazos
- Sistema de feriados
- Exportação em múltiplos formatos

## 👤 Autor

**Italoan F.**

📧 Contato: [prazocerto@outlook.com](mailto:prazocerto@outlook.com)

## 📄 Licença

Este projeto não possui licença definida. Todos os direitos reservados ao autor.

---

**ContaPrazo Calculadora** • 2026 • Ferramenta desenvolvida para facilitar o cálculo de prazos processuais
