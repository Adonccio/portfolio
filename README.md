# Gustavo Adoncio — Portfólio

Portfólio profissional em português e inglês, com foco em Engenharia de Dados e Desenvolvimento de Software. Gustavo é Engenheiro de Dados I na EDS (Extreme Digital Solutions) e graduado em Sistemas de Informação.

A trajetória na EDS inclui estágio de agosto de 2024 a junho de 2026 e atuação como Engenheiro de Dados I desde junho de 2026. A experiência corporativa é apresentada por responsabilidades e tecnologias. Os projetos publicados são pessoais.

## Executar localmente

Requer Node.js 20 ou superior e npm.

```sh
npm ci
npm run dev
```

Acesse o endereço informado pelo Vite. Para gerar a versão de produção:

```sh
npm run build
npm run preview
```

## Verificações

```sh
npm run lint
npm test
```

Os testes usam Playwright com o Google Chrome instalado, sem precisar baixar outro navegador. A suíte verifica idiomas, metadados, persistência de tema, filtros, navegação mobile, prévias, responsividade e acessibilidade com axe.

## Arquitetura

- `src/components/`: seções da página e componentes de interface reutilizáveis.
- `src/data/portfolio.js`: projetos pessoais, tecnologias e links públicos.
- `src/locales/`: conteúdo profissional e interface em português e inglês.
- `src/hooks/`: animações, tema, metadados, media queries e seção ativa.
- `src/utils/`: preferências com tratamento para armazenamento indisponível.
- `src/index.css`: tokens dos temas e estilos base.
- `src/App.css`: layout, componentes e responsividade.
- `tests/`: regressões funcionais e verificações de acessibilidade.

React e Vite foram preservados. Os componentes usam HTML semântico e CSS próprio. GSAP e ScrollTrigger são carregados sob demanda; a seção de projetos usa code splitting. Animações respeitam `prefers-reduced-motion` e os efeitos de parallax ficam restritos ao desktop.

Os temas claro e escuro e o idioma escolhido persistem localmente. O tema inicial acompanha a preferência do sistema. A navegação mantém as âncoras e o histórico, com rolagem animada via GSAP ScrollToPlugin, indicação da seção ativa e entrada dos títulos. A animação pode ser interrompida ao rolar, usar o teclado ou selecionar outra seção. A foto tem movimento flutuante enquanto está visível. Os efeitos respeitam a preferência de movimento reduzido.

## Imagens

As imagens originais foram preservadas, e o site usa versões WebP otimizadas com dimensões reservadas e lazy loading. Para regenerar:

```sh
npm run optimize:images
```

Sharp é uma ferramenta de desenvolvimento para compressão de imagens. Playwright e axe são ferramentas de validação; não são incluídos no bundle do site.

## SEO e publicação

Defina `VITE_SITE_URL` no ambiente de publicação com a URL pública do portfólio. O build gera links canônicos e URLs absolutas para Open Graph e Twitter. O arquivo `.env.example` documenta essa opção sem assumir um domínio.

## Prévias visuais

Com o servidor local em execução:

```sh
node scripts/capture-preview.mjs
```

O script registra desktop nos dois temas, mobile e tablet em `artifacts/` e gera a imagem de compartilhamento em `public/social-card.png`.

## Conteúdo público e revisão

Mantenha os dois idiomas consistentes. Publique somente informações profissionais confirmadas e responsabilidades técnicas genéricas. Não inclua projetos corporativos identificáveis, clientes, sistemas internos, código proprietário, credenciais ou detalhes confidenciais.

O link do projeto Kritic apontava para o repositório de outro projeto. Esse link foi removido do card até que o endereço correto seja confirmado. Os demais links públicos existentes foram preservados. Os dashboards pessoais em Power BI, já documentados no repositório, passaram a integrar a seção de projetos.
