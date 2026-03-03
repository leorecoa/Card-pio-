# MenuPro — Fullstack TypeScript Application

![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=for-the-badge&logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-black?style=for-the-badge)
![Express](https://img.shields.io/badge/Express-Backend-000000?style=for-the-badge&logo=express)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite)
![JWT](https://img.shields.io/badge/JWT-Auth-black?style=for-the-badge&logo=jsonwebtokens)
![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?style=for-the-badge&logo=vitest)

Aplicação **fullstack em TypeScript** projetada para simular um sistema de **cardápio digital com fluxo de pedido e painel administrativo**.

O projeto demonstra integração consistente entre frontend moderno e backend Express com persistência em SQLite, mantendo separação clara de responsabilidades e estrutura escalável.

---

## Arquitetura

### Frontend
- React 19 com React Router
- Vite como bundler
- TailwindCSS para composição visual
- Zustand para gerenciamento de estado global com persistência
- Camada de serviços isolando consumo de API
- Separação clara entre componentes, páginas e domínio

### Backend
- Express estruturado em rotas REST
- SQLite (better-sqlite3) com criação automática de schema
- Seed automatizado para ambiente inicial
- Autenticação com JWT
- Hash de senha com bcryptjs

---

## Modelagem

### Entidades principais

- Users
- Categories
- Products
- Orders
- OrderItems

Relacionamentos são definidos no backend com foreign keys e criação programática de schema.

---

## Decisões Técnicas

### Persistência local e previsível
SQLite foi adotado para manter o projeto autocontido e facilmente reproduzível.

### Estado desacoplado da UI
Zustand com persist permite:
- Carrinho resiliente a refresh
- Controle de autenticação no cliente
- Redução de complexidade comparado a soluções mais pesadas

### API centralizada
A camada `services.ts` abstrai chamadas HTTP, evitando acoplamento direto de componentes com endpoints.

### Seed automático
Ambiente pronto para execução imediata sem setup manual.

---

## Execução Local

```bash
npm install
npm run dev
