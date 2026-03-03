# MenuPro – Cardápio Online Fullstack

[![Last Commit](https://img.shields.io/github/last-commit/leorecoa/Card-pio-?style=flat-square)](https://github.com/leorecoa/Card-pio-/commits/main)
[![Repo Size](https://img.shields.io/github/repo-size/leorecoa/Card-pio-?style=flat-square)](https://github.com/leorecoa/Card-pio-)
[![Top Language](https://img.shields.io/github/languages/top/leorecoa/Card-pio-?style=flat-square)](https://github.com/leorecoa/Card-pio-)
[![License](https://img.shields.io/badge/license-not%20specified-lightgrey?style=flat-square)](https://github.com/leorecoa/Card-pio-)

Aplicação fullstack em **TypeScript** para um sistema de **cardápio digital com carrinho e painel administrativo**.

O projeto demonstra domínio de frontend moderno com React + Vite e integração real com backend Express e banco SQLite.

---

## Visão Geral

O sistema permite:

- Listagem de categorias e produtos
- Adição de produtos ao carrinho
- Cálculo automático de total
- Finalização de pedido
- Login administrativo
- Visualização de pedidos no painel admin

O backend cria automaticamente as tabelas e realiza seed inicial caso o banco esteja vazio.

---

## Stack Tecnológica

### Frontend
- React 19
- Vite
- TypeScript
- React Router
- Zustand (estado global + persistência)
- Tailwind CSS
- motion (animações)
- lucide-react (ícones)

### Backend
- Node.js
- Express
- better-sqlite3
- bcryptjs
- jsonwebtoken (JWT)

### Testes
- Vitest
- Testing Library

---

## Arquitetura

### Estrutura simplificada
