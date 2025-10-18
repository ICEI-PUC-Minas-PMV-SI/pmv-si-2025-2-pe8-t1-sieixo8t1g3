# 3. Desenvolvimento de alternativas de soluções de SI

## 3.1. Conexão com o Plano de IC e Planejamento da Solução

### Relembrar o KIT, as KIQs e os dados críticos do Plano de IC.

### Identificar o(s) processo(s) que serão resolvidos com a aplicação.

### Definir funcionalidades iniciais a serem desenvolvidas.

### Criar um quadro-resumo com:

- Problema mapeado | Solução proposta | Como será resolvida no sistema

## 3.2. Levantamento de Requisitos e Modelagem Inicial

### Histórias de Usuários

| ID | Como... | Eu quero... | Para que... |
| :--- | :--- | :--- | :--- |
| HU01 | advogado | cadastrar clientes com dados padronizados e validados | garantir consistência nas informações e facilitar a comunicação futura. |
| HU02 | gestor | visualizar relatórios segmentados por tipo de cliente (pessoa física/jurídica, demanda, recorrência) | entender o perfil dos atendimentos e otimizar a prospecção. |
| HU03 | advogado | personalizar as comunicações com base no perfil e histórico do cliente | aumentar o engajamento e melhorar o relacionamento. |
| HU04 | advogado | registrar e acompanhar o andamento dos processos em tempo real | monitorar prazos e evitar perdas de prazo processual. |
| HU05 | gestor jurídico | consultar rapidamente o status, a instância e o tribunal de cada processo | analisar a distribuição das causas e tomar decisões estratégicas. |
| HU06 | gestor financeiro | registrar honorários, despesas adicionais e valores de sucumbência em um só lugar | controlar a receita e entender a rentabilidade por contrato. |
| HU07 | gestor | visualizar a receita total e por tipo de contrato em dashboards | acompanhar a sustentabilidade financeira do escritório. |
| HU08 | advogado | ter um histórico centralizado de comunicação com cada cliente | consultar rapidamente o contexto de cada atendimento e garantir continuidade no relacionamento. |
| HU09 | gestor | monitorar o percentual de processos por fase | identificar gargalos e priorizar recursos conforme a necessidade. |
| HU10 | gestor | medir o tempo médio de atendimento por etapa do processo | avaliar a eficiência e implementar melhorias nos fluxos internos. |
| HU11 | gestor | comparar a produtividade administrativa antes e depois da implantação do sistema | mensurar o impacto da solução Juris Fácil na rotina operacional. |
| HU12 | sócio do escritório | analisar a taxa de sucesso processual (casos ganhos vs. perdidos) | avaliar o desempenho jurídico e fortalecer a reputação da empresa. |

### Requisitos do Sistema

<p align="justify">
Com base nas histórias de usuário e nas necessidades de otimização do escritório, organizamos abaixo os requisitos funcionais e não funcionais. As prioridades (Alta, Média ou Baixa) foram definidas considerando a importância de cada requisito para a operação diária e para o sucesso da implantação inicial do sistema "Juris Fácil".</p>

#### Requisitos Funcionais
<p align="justify">
Os requisitos funcionais definem as funcionalidades que o sistema deve oferecer para atender às necessidades de advogados, gestores e sócios do escritório.</p>

| ID | Descrição do Requisito | Prioridade |
| :--- | :--- | :--- |
| RF01 | Cadastro e gestão de clientes (pessoas físicas e jurídicas). | Alta |
| RF02 | Cadastro e gestão de processos jurídicos, com acompanhamento de status, instância e tribunal. | Alta |
| RF03 | Módulo de controle financeiro para registrar honorários, despesas e receitas por processo/contrato. | Alta |
| RF04 | Geração de relatórios gerenciais e dashboards (perfil de clientes, status de processos, receita, etc.). | Alta |
| RF05 | Histórico centralizado de comunicações e atividades relacionadas a cada cliente e processo. | Alta |
| RF06 | Controle de acesso baseado em perfis de usuário (advogado, gestor, financeiro, sócio). | Alta |
| RF07 | Ferramenta para medir e analisar indicadores de desempenho (KPIs), como taxa de sucesso e tempo por etapa. | Média |

#### Requisitos Não Funcionais
<p align="justify">
Os requisitos não funcionais determinam critérios de desempenho, segurança, usabilidade e confiabilidade do sistema. Eles garantem que o sistema funcione de forma eficiente, segura e estável.</p>

| ID | Descrição do Requisito | Prioridade |
| :--- | :--- | :--- |
| RNF01 | O sistema deve garantir a segurança e a confidencialidade das informações dos clientes e processos. | Alta |
| RNF02 | O sistema deve ter alta disponibilidade, garantindo acesso durante o horário de expediente. | Alta |
| RNF03 | A interface do sistema deve ser intuitiva e de fácil utilização (boa usabilidade). | Alta |
| RNF04 | O sistema deve garantir a integridade dos dados, com validações e backups automáticos. | Alta |
| RNF05 | As consultas e a geração de relatórios devem ser processadas em tempo hábil (bom desempenho). | Alta |
| RNF06 | O sistema deve ser compatível com os principais navegadores web do mercado. | Alta |
| RNF07 | A aplicação deve ser responsiva para permitir consultas básicas em dispositivos móveis. | Baixa |

### Tecnologias e ferramentas utilizadas
<p align="justify">
Para o desenvolvimento deste projeto, foi selecionado um conjunto de tecnologias modernas e consolidadas no mercado, visando garantir uma aplicação robusta, segura e de alta performance. As ferramentas, bibliotecas e frameworks listados a seguir foram escolhidos para compor a arquitetura do front-end e do back-end, assegurando escalabilidade e manutenibilidade a longo prazo.</p>

#### Frontend

-  Canva: é uma plataforma de design gráfico online que permite aos usuários criar uma vasta gama de conteúdos visuais de forma intuitiva.
  
    (Canva [Juris Fácil](https://www.canva.com/design/DAG1NNkbWeg/6xc3dH8D3Fq2Z17CpPDi_A/edit))
  
-  Figma: é uma ferramenta de design de interfaces (UI) e experiência do usuário (UX) baseada na nuvem.
  
    (Figma [Juris Fácil](https://www.figma.com/make/ITWz72V2wtKo2NnZ1Y6y5w/P%C3%A1gina-Inicial-JURIS-F%C3%81CIL--c%C3%B3pia-?node-id=0-1&p=f))

#### Backend

### Diagramas de caso de uso

#### Caso de Uso 1: Gestão de Clientes

Este diagrama descreve as interações do usuário para gerenciar as informações dos clientes do escritório.

- Atores: Advogado, Gestor (representados como "Usuário do Sistema").

- Resumo: O usuário pode cadastrar, consultar, editar e excluir clientes. O sistema valida os dados para garantir a consistência.

#### Caso de Uso 2: Gestão de Processos

Descreve como os advogados e gestores gerenciam os processos jurídicos dentro do sistema.

- Atores: Advogado, Gestor (representados como "Usuário do Sistema").

- Resumo: Permite o cadastro de novos processos, a consulta de andamentos, atualização de status e o registro de comunicações importantes.

#### Caso de Uso 3: Gestão Financeira

Detalha as ações do gestor financeiro para controlar as finanças relacionadas aos processos e contratos.

- Atores: Gestor Financeiro.

- Resumo: O gestor pode registrar honorários e despesas, associando-os a processos específicos para controlar a rentabilidade.

#### Caso de Uso 4: Geração de Relatórios

Mostra como os gestores podem extrair informações estratégicas do sistema por meio de relatórios.

- Atores: Gestor.

- Resumo: O sistema permite a visualização de diversos relatórios para análise de desempenho, perfil de clientes e saúde financeira do escritório.


### Desenvolver esboço do banco de dados (modelo ER).
