# Controle de Fraldas

Este é um projeto para controle de fraldas e despesas relacionadas, desenvolvido com Next.js.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Prisma](https://www.prisma.io/)
- [Recharts](https://recharts.org/)
- TypeScript

## Como Rodar o Projeto

1.  Clone o repositório:

    ```bash
    git clone https://github.com/hyansx/Controle-de-fraldas.git
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do projeto e configure a conexão com o banco de dados (ex: `DATABASE_URL="file:./dev.db"` para SQLite ou sua string de conexão preferida).

4.  Execute as migrações do banco de dados:

    ```bash
    npx prisma migrate dev
    ```

5.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

- `src/`: Código fonte da aplicação (componentes, páginas, utilitários).
- `prisma/`: Esquema do banco de dados e migrações.
- `public/`: Arquivos estáticos.
