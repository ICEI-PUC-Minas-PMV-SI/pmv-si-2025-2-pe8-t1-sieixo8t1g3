# 3. Desenvolvimento de alternativas de soluções de SI
## 3.1. Conexão com o Plano de IC e Planejamento da Solução

### Processos que serão resolvidos com a aplicação:

**- Gestão de processos judiciais:** organização, acompanhamento e controle de prazos.<br/>
**- Gestão de contratos e honorários:** controle financeiro e documental.<br/>
**- Comunicação com clientes:** registro e histórico de interações.<br/>
**- Monitoramento de atividades e conformidade com a LGPD.** <br/>

### Funcionalidades iniciais a serem desenvolvidas:

- Cadastro de clientes e processos
- Agenda de prazos e audiências com alertas
- Gestão de contratos e honorários
- Histórico de comunicações com o cliente
- Relatórios jurídicos e financeiros
- Controle de acesso por perfil
- Política de privacidade e consentimento
- Criptografia de dados

### Quadro-resumo: Problema mapeado | Solução proposta | Como será resolvida no sistema

| **Problema Mapeado**                                      | **Solução Proposta**                          | **Como será resolvida no sistema**                                               |
|-----------------------------------------------------------|-----------------------------------------------|-----------------------------------------------------------------------------------|
| Desorganização de processos e prazos                      | Centralização e controle automatizado         | Cadastro de processos com alertas                             |
| Falta de controle sobre contratos e honorários            | Gestão financeira e documental                | Geração de relatórios por processo, com valores, vencimentos e status do pagamento                        |
| Comunicação dispersa com clientes                         | Histórico centralizado de interações          | Registro de mensagens e notificações por cliente                                 |
| Risco de perda ou vazamento de dados                      | Armazenamento seguro em banco de dados        | Controle de acesso e backup                             |
| Ausência de relatórios para tomada de decisão             | Relatórios segmentados e exportáveis          | Geração de relatórios por cliente, processo e honorários                         |
| Riscos de não conformidade com a LGPD                     | Implementação de políticas e controles        | Consentimento, anonimização, logs e política de privacidade                      |

## 3.2. Levantamento de Requisitos e Modelagem Inicial

### Histórias de Usuários

| ID | Como... | Eu quero... | Para que... |
| :--- | :--- | :--- | :--- |
| HU01 | advogado | cadastrar clientes com dados padronizados e validados | garantir consistência nas informações e facilitar a comunicação futura. |
| HU02 | administrador | visualizar relatórios segmentados por tipo de cliente (pessoa física/jurídica, demanda, recorrência) | entender o perfil dos atendimentos e otimizar a prospecção. |
| HU03 | advogado | registrar e acompanhar o andamento dos processos em tempo real | monitorar prazos e evitar perdas de prazo processual. |
| HU04 | administrador | consultar rapidamente o status, a instância e o tribunal de cada processo | analisar a distribuição das causas e tomar decisões estratégicas. |
| HU05 | administrador| registrar honorários, despesas adicionais e valores de sucumbência em um só lugar | controlar a receita e entender a rentabilidade por contrato. |
| HU06 | administrador | visualizar a receita total e por tipo de contrato em dashboards | acompanhar a sustentabilidade financeira do escritório. |
| HU07 | advogado | ter um histórico centralizado de comunicação com cada cliente | consultar rapidamente o contexto de cada atendimento e garantir continuidade no relacionamento. |
| HU08 | administrador | monitorar o percentual de processos por fase | identificar gargalos e priorizar recursos conforme a necessidade. |
| HU9 | advogado | analisar a taxa de sucesso processual (casos ganhos vs. perdidos) | avaliar o desempenho jurídico e fortalecer a reputação da empresa. |

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
| RF06 | Controle de acesso baseado em perfis de usuário (advogado e administrador). | Alta |

#### Requisitos Não Funcionais
<p align="justify">
Os requisitos não funcionais determinam critérios de desempenho, segurança, usabilidade e confiabilidade do sistema. Eles garantem que o sistema funcione de forma eficiente, segura e estável.</p>

| ID | Descrição do Requisito | Prioridade |
| :--- | :--- | :--- |
| RNF01 | O sistema deve garantir a segurança e a confidencialidade das informações dos clientes e processos. | Alta |
| RNF02 | O sistema deve ter alta disponibilidade com padrão UpTime no mínimo de 99,99% . | Alta |
| RNF03 | A interface do sistema deve ser intuitiva e de fácil utilização (boa usabilidade). | Alta |
| RNF04 | O sistema deve garantir a integridade dos dados, com validações e backups automáticos. | Alta |
| RNF05 | As consultas e a geração de relatórios devem ser processadas em tempo hábil (bom desempenho). | Alta |
| RNF06 | O sistema deve ser compatível com os principais navegadores web do mercado. | Alta |
| RNF07 | A aplicação deve ser responsiva para permitir consultas básicas em dispositivos móveis. | Baixa |

### Tecnologias e ferramentas utilizadas
<p align="justify">
Para o desenvolvimento deste projeto, foi selecionado um conjunto de tecnologias modernas e consolidadas no mercado, visando garantir uma aplicação robusta, segura e de alta performance. As ferramentas, bibliotecas e frameworks listados a seguir foram escolhidos para compor a arquitetura do front-end e do back-end, assegurando escalabilidade e manutenibilidade a longo prazo.</p>

### Frontend
<p align="justify">
<strong>Figma:</strong> é uma ferramenta de design de interfaces (UI) e experiência do usuário (UX) baseada na nuvem.
  
<a href="https://www.figma.com/make/ITWz72V2wtKo2NnZ1Y6y5w/P%C3%A1gina-Inicial-JURIS-F%C3%81CIL--c%C3%B3pia-?node-id=0-1&p=f">Figma Juris Fácil.</a>
</p>

<p align="justify">
<strong>Excalidraw:</strong> é um quadro branco virtual (whiteboard), de código-aberto e baseado em navegador, voltado para desenho livre de diagramas, esquemas, esboços e fluxos com visual “à mão” (hand-drawn).

<a href="https://excalidraw.com/#json=tUmKUvQhMW4q7mVsOuLbB,YSAJezME_EeIg_19ld9TRQ">Excalidraw Juris Fácil.</a>
</p> 

<p align="justify">
<strong>React + TypeScript + SWC (via Vite):</strong> o projeto foi desenvolvido utilizando React, uma biblioteca JavaScript para construção de interfaces de usuário, em conjunto com TypeScript, que adiciona tipagem estática ao código, garantindo maior segurança e manutenção. O SWC é o compilador de alta performance usado pelo Vite para otimizar o build e o tempo de execução da aplicação.</p>

<p align="justify">
<strong>TailwindCSS + PostCSS + Autoprefixer:</strong> o TailwindCSS é um framework CSS utilitário que permite criar interfaces modernas de forma rápida e consistente. O PostCSS é uma ferramenta que processa o CSS e aplica transformações automáticas, enquanto o Autoprefixer adiciona automaticamente prefixos para compatibilidade entre diferentes navegadores.</p>

<p align="justify">
<strong>Shadcn UI + Radix UI + Lucide:</strong> a aplicação utiliza o Shadcn UI, um conjunto de componentes pré-construídos e estilizados com Tailwind, baseados no Radix UI, que fornece componentes acessíveis e de baixo nível. Ícones vetoriais são fornecidos pelo Lucide, garantindo uma interface consistente e moderna.</p>

<p align="justify">
<strong>React Hook Form + Zod:</strong> o React Hook Form é utilizado para o gerenciamento eficiente de formulários e validação de dados, enquanto o Zod fornece um esquema de validação tipado que garante segurança e consistência nos dados enviados pelo usuário.</p>

<p align="justify">
<strong>Recharts, Embla e Sonner:</strong> o Recharts é utilizado para renderização de gráficos interativos e responsivos, o Embla para criação de carrosséis e sliders dinâmicos, e o Sonner para exibição de notificações e feedbacks visuais na interface.</p>

### Backend

<p align="justify">
<strong>Node.js:</strong> é o servidor do backend que proporciona um ambiente de execução JavaScript fora do navegador. </p>

<p align="justify">
<strong>Fastify:</strong> framework HTTP leve e rápido para criar APIs REST. </p>

<p align="justify">
<strong>Drizzle ORM:</strong> ORM moderno e tipado para TypeScript. Facilita criar e consultar tabelas no PostgreSQL (ou outros bancos). </p>

<p align="justify">
<strong>Drizzle Kit Studio:</strong> interface visual do Drizzle ORM que facilita a visualização, edição e gerenciamento do banco de dados diretamente no navegador. </p>

<p align="justify">
<strong>PostgreSQL:</strong> banco relacional usado para persistir dados (tabelas como procedure_stage, users, etc.). </p>

<p align="justify">
<strong>Zod:</strong> biblioteca TypeScript para validar e tipar os dados recebidos (ex: corpo de requisições, parâmetros). </p>

<p align="justify">
<strong>JWT + Fastify plugin:</strong> middleware usado para proteger rotas e validar usuários logados. </p>

<p align="justify">
<strong>Docker:</strong> plataforma que permite criar, implantar e executar aplicações em containers, garantindo que o ambiente de desenvolvimento e execução seja padronizado e isolado. </p>

### Diagramas de caso de uso

#### - Caso de Uso 1: Tela inicial antes do login

<p align="justify">
Este diagrama descreve as interações do usuário para acessar a tela de login no sistema <strong>Juris Fácil</strong>.
</p>
  
<p align="justify">
<strong>Ator:</strong> Advogado ou administrador (representados como "Usuário do Sistema").
</p>

<p align="justify">
<strong>Ator:</strong> Sistema (representados como "Sistema").
</p>

<p align="justify">
<strong>Descrição:</strong> O usuário pode clicar no botão de "Acessar Sistema" para ser direcionado para a tela de login na plataforma.
</p>

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/1713b786-9fc7-4139-9e80-0acb2d365017" />
</p>

<p align="center">
Figura 1 – Caso de Uso 1:  Tela inicial antes do login
</p>

#### - Caso de Uso 2: Tela de login

<p align="justify">
Este diagrama descreve as interações do usuário para realizar o login no sistema <strong>Juris Fácil</strong> e também para voltar a tela inicial antes do login.
</p>
  
<p align="justify">
<strong>Ator:</strong> Advogado ou administrador (representados como "Usuário do Sistema").
</p>

<p align="justify">
<strong>Ator:</strong> Sistema (representados como "Sistema").
</p>

<p align="justify">
<strong>Descrição:</strong> O usuário pode digitar o usuário e a senha do sistema e clicar no botão de "Entrar" para realizar o login na plataforma. Também pode clicar no botão "Voltar" para retonar à tela inicial antes do login.
</p>

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/2840413f-8de7-4a5b-852c-3157a08974c4" />
</p>

<p align="center">
Figura 2 – Caso de Uso 2: Tela de login
</p>

#### - Caso de Uso 3: Gestão de Clientes

Este diagrama descreve as interações do usuário para gerenciar os dados dos clientes do escritório.

<p align="justify">
<strong>Ator:</strong> Advogado ou administrador (representados como "Usuário do Sistema").
</p>

<p align="justify">
<strong>Ator:</strong> Sistema (representados como "Sistema").
</p>

<p align="justify">
<strong>Descrição:</strong> O usuário pode cadastrar, consultar, editar e excluir clientes. O sistema valida os dados para garantir a consistência.
</p>

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/20e8d9af-65bd-4333-a07d-d14a7b374253" />
</p>

<p align="center">
Figura 3 – Caso de Uso 3: Gestão de Clientes
</p>


#### - Caso de Uso 4: Gestão de Processos

Descreve como os advogados gerenciam os processos jurídicos dentro do sistema.

<p align="justify">
<strong>Ator:</strong> Advogado ou administrador (representados como "Usuário do Sistema").
</p>

<p align="justify">
<strong>Ator:</strong> Sistema (representados como "Sistema").
</p>

<p align="justify">
<strong>Descrição:</strong> Permite o cadastro de novos processos, a consulta de processos, atualização de status e a edição do processo.
</p>

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/b8e660aa-b965-43c1-bd3a-46f68019d21b" />
</p>

<p align="center">
Figura 4 – Caso de Uso 4: Gestão de Processos
</p>

#### - Caso de Uso 5: Acompanhamento de Prazos Processuais e Audiências

<p align="justify">
Detalha as ações do advogado para visualizar e filtrar os prazos processuais e audiências por categoria (vencidos, hoje, próximos 7 dias, futuros), com opção de limpar os filtros e retornar à visão geral.
</p>

<p align="justify">
<strong>Ator:</strong> Advogado ou administrador (representados como "Usuário do Sistema").
</p>

<p align="justify">
<strong>Ator:</strong> Sistema (representados como "Sistema").
</p>

<p align="justify">
<strong>Descrição:</strong> Permite exibir os prazos que já passaram e estão pendentes de ação, mostra os prazos que vencem na data atual, apresenta os prazos que vencerão dentro de uma semana, lista os prazos com vencimento além de 7 dias e remove o filtro aplicado, retornando à visualização completa de todos os prazos.
</p>

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/2cd8c50a-d9ca-4d84-97bf-7615e69951e1" />
</p>

<p align="center">
Figura 5 – Caso de Uso 5: Acompanhamento de Prazos Processuais e Audiências
</p>

#### - Caso de Uso 6: Gestão de Contratos de Honorários

<p align="justify">
Detalha as ações do advogado para gerir os contratos dos clientes.
</p>

<p align="justify">
<strong>Ator:</strong> Advogado ou administrador (representados como "Usuário do Sistema").
</p>

<p align="justify">
<strong>Ator:</strong> Sistema (representados como "Sistema").
</p>

<p align="justify">
<strong>Descrição:</strong> Permite gerar um novo contrato a partir de um processo previamente cadastrado, lista, edita, salva e imprime os contratos cadastrados, mostra o status de que o contrato já está assinado ou não e permite fazer upload de contrato salvo no computador. 
</p>

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/4c9719b1-f6ee-4999-87a0-dc3e2bbb87f3" />
</p>

<p align="center">
Figura 6 – Caso de Uso 6: Gestão de Contratos de Honorários
</p>

#### - Caso de Uso 7: Relatórios do Sistema

<p align="justify">
Detalha as ações do advogado para consultar e gerir os dados dos clientes e dos processos dos clientes.
</p>

<p align="justify">
<strong>Ator:</strong> Advogado ou administrador (representados como "Usuário do Sistema").
</p>

<p align="justify">
<strong>Ator:</strong> Sistema (representados como "Sistema").
</p>

<p align="justify">
<strong>Descrição:</strong> Permite visualizar uma lista com os clientes e de processos cadastrados e seus dados, permite buscar clientes por nome, documento ou e-mail, e processos por número, cliente ou tipo de ação, exporta o relatório em formato csv, ao clicar no "olhinho", na linha de um cliente, exibe um pop-up com os dados básicos do cliente e informações processuais e ao clicar em "ações", o sistema redireciona para a tela de edição do cliente ou processo correspondente. 
</p>

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/22a5de2e-3e11-4483-9ef1-b212388fdcd7" />
</p>

<p align="center">
Figura 7 – Caso de Uso 7: Relatórios do Sistema
</p>

#### - Caso de Uso 8: Gestão de usuários

<p align="justify">
Detalha as ações do administrador para consultar e gerir os dados dos usuários do sistema.
</p>

<p align="justify">
<strong>Ator:</strong> Advogado ou administrador (representados como "Usuário do Sistema").
</p>

<p align="justify">
<strong>Ator:</strong> Sistema (representados como "Sistema").
</p>

<p align="justify">
<strong>Descrição:</strong> O adminitrador pode cadastrar usuários, consultar, editar e excluir os dados do usuários. O sistema valida os dados para garantir a consistência.
</p>

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/09899f52-e115-495f-9b1a-81011e60f3e2" />
</p>

<p align="center">
Figura 8 – Caso de Uso 8: Gestão de usuários
</p>

#### - Caso de Uso 9: Dashboard - Visão Geral

Mostra como os advogados podem extrair informações estratégicas sobre clientes, processos e contratos para tomada de decisão por meio de relatórios.

<p align="justify">
<strong>Ator:</strong> Advogado ou administrador (representados como "Usuário do Sistema").
</p>

<p align="justify">
<strong>Ator:</strong> Sistema (representados como "Sistema").
</p>

<p align="justify">
<strong>Descrição:</strong> O sistema permite a visualização de diversos relatórios para análise de desempenho, perfil de clientes e saúde financeira do escritório. Ele permite a visualização de número de cliente cadastrados no sistema, número total de processos e destaca os que têm prioridade urgente e alta, apresenta o valor total de honorários em contratos ativos, informa sobre prazos que vencem nos próximos dias para evitar atrasos, exibe gráfico com a distribuição dos processos por status e mostra gráfico com a quantidade de processos em cada fase. </p>

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/c84d4aa7-e618-4a36-9fb7-4164ec78e9c8" />
</p>

<p align="center">
Figura 9 – Caso de Uso 9: Dashboard - Visão Geral
</p>

#### - Caso de Uso 10: Suporte

Mostra como o usuário podem entrar em contato com o time de suporte do sistema para realizar alguma solicitação ou pergunta.

<p align="justify">
<strong>Ator:</strong> Advogado ou administrador (representados como "Usuário do Sistema").
</p>

<p align="justify">
<strong>Ator:</strong> Sistema (representados como "Sistema").
</p>

<p align="justify">
<strong>Descrição:</strong> O sistema apresenta para o usuário duas opções para solicitação de suporte. Ao clicar no botão "Entrar em Contato via WhatsApp", o usuário é direcionado para o grupo de WhatsApp do sistema. Ao clicar botão de "Enviar E-mail", o usuário é direcionado para sua Caixa de E-mail. É possível também voltar à tela inicial clicando no botão "Página Inicial" </p>

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/dacf35d0-bf78-481c-af6e-88c4c2dc911c" />
</p>

<p align="center">
Figura 10 – Caso de Uso 10: Suporte
</p>

### Interface do sistema

#### Tela inicial antes do login

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/d590b1d7-13d7-4f76-9b3d-a99de6b33b3f" />
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/5e0e0fc3-ad84-488a-9b8b-9a7d60843e21" />
</p>

<p align="center">
Figura 11 – Tela inicial antes do login
</p>

#### Tela de login

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/f04d36c6-be9b-43a8-a91b-d3779e1f8422" />
</p>

<p align="center">
Figura 12 –  Tela de login
</p>

#### Tela inicial após login

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/904200e5-073c-478a-a2dc-1824a941f31b" />
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/fe95ace1-9d97-4ec7-8f4d-5c4ea631c642" />
</p>

<p align="center">
Figura 13 –  Tela inicial após login
</p>

#### Tela Gestão de clientes

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/786ce327-8487-4f8f-82b7-7460a77a78cc" />
</p>

<p align="center">
Figura 14 –  Tela Gestão de clientes
</p>

#### Tela Gestão de processos

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/33f0bdd3-1d86-4564-9fc3-9f4c4b8d5b4c" />
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/f1595244-a73a-48ad-895f-f07f778d4392" />
</p>

<p align="center">
Figura 15 –  Tela Gestão de processos
</p>

#### Tela Prazos e Audiências

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/383415a9-8fd8-4728-b0e9-4b8f2ccd586f" />
</p>

<p align="center">
Figura 16 –  Tela Prazos e Audiências
</p>

#### Tela Contratos de Honorários

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/f748442b-d36b-41dc-8916-4a9cfb4929a7" />
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/4930ab12-da7d-4f9c-967c-0f8a8536b838" />
</p>

<p align="center">
Figura 17 –  Tela Contratos de Honorários
</p>

#### Tela Relatórios

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/21c2080a-17de-4d24-ab57-b7682dc65198" />
</p>

<p align="center">
Figura 18 –  Tela Relatórios
</p>

#### Tela Usuários

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/d7628a9d-9a77-4212-90ff-f6fcefb4ace7" />
</p>

<p align="center">
Figura 19 –  Tela Usuários
</p>

#### Tela Dashboard

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/a84e3676-24cb-4f0a-a834-a0f87aa067eb" />
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/57b796e7-98d7-43f1-9117-ee9858254917" />
</p>

<p align="center">
Figura 20 –  Tela Dashboard
</p>

#### Tela Suporte

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/377e8bf5-afb7-4ad8-99db-47ed9e493d4d" />
</p>

<p align="center">
Figura 21 –  Tela Suporte
</p>

#### Tela Termos de uso 

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/cf4ba304-e9a5-4277-8b3d-dd709e39f673" />
</p>

<p align="center">
Figura 22 –  Tela Termos de uso
</p>

#### Tela Politica de Privacidade

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/e4108b4e-9550-4277-b3bf-1f34cc3f5f7d" />
</p>


<p align="center">
Figura 23 –   Tela Politica de Privacidade
</p>

#### Tela Politica de cookies 

<p align="center">
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/b6d15ec7-6dc0-4756-a6ae-02231326ae46" />

</p>

<p align="center">
Figura 24 –  Tela Politica de cookies
</p>

#### Tela de responsividade (Celular) 

<p align="center">
<img width="342" height="654" alt="image" src="https://github.com/user-attachments/assets/34c0e428-882a-404e-a896-d311bb1eb36c" />
</p>


<p align="center">
Figura 25 –  Tela de responsividade (Celular) 
</p>


#### Tela de responsividade (Tablet) 

<p align="center">
<img width="458" height="698" alt="image" src="https://github.com/user-attachments/assets/ca2a4a9e-c919-4be0-b573-90e58a0c1d3f" />

</p>

<p align="center">
Figura 26 –  Tela de responsividade (Tablet) 
</p>

#### Tela de responsividade (Desktop)

<p align="center">
<img width="700" height="647" alt="image" src="https://github.com/user-attachments/assets/b94a6302-39be-41b9-ab8b-f27f92d6ee2b" />

</p>

<p align="center">
Figura 27 –  Tela de responsividade (Desktop)
</p>


<br>

### Esboço do modelo de dados (ER)

<p align="center">
<img width="2006" height="3166" alt="image" src="https://github.com/user-attachments/assets/bafa5cc2-4d01-4b0f-804a-f7b8c3fdb4ce" />
</p>

<p align="center">
Figura 28 – Esboço da mdelagem de dados do sistema.
</p>
