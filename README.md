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
- Detalhamento dia a dia do período
- Identificação visual de feriados e finais de semana
- Campo opcional para descrição do prazo
- Visualização de calendário interativo

### Sistema de Feriados
- Feriados nacionais fixos pré-configurados
- Feriados móveis calculados automaticamente (Carnaval, Páscoa, Corpus Christi)
- Editor de feriados personalizados com validação
- Importação/exportação de conjuntos de feriados
- Conjuntos pré-definidos online para diferentes estados/municípios
- Atualização automática de feriados via repositório online

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
- **Exportar para PDF** (resumido ou completo)
- **Exportar como imagem PNG** (resumido ou completo)
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

## ⚙️ Tecnologias

- **HTML5** - Estrutura
- **CSS3** - Estilo e animações
- **JavaScript ES6+** - Lógica e interatividade
- **localStorage** - Persistência de dados
- **html2canvas** - Geração de imagens (CDN)

## 📦 Estrutura do Projeto

```
contaprazo/
├── conta-prazo-html.html    # Aplicação completa (standalone)
├── README.md                 # Este arquivo
└── .git/                     # Controle de versão Git
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

### Versão 1.3 (Atual)
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

**ContaPrazo Calculadora** • 2025 • Ferramenta desenvolvida para facilitar o cálculo de prazos processuais
