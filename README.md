
# Projeto NestJS para gerenciamento de Leads e Intenções

<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  <strong>Projeto NestJS para gerenciamento de Leads e Intenções</strong><br/>
  Aplicação backend escalável e modular usando NestJS e TypeORM.
</p>

---

## Índice

- [Descrição](#descrição)  
- [Pré-requisitos](#pré-requisitos)  
- [Setup do Projeto](#setup-do-projeto)  
- [Configuração das Variáveis de Ambiente](#configuração-das-variáveis8848-de-ambiente)  
- [Execução](#execução)  
- [Testes](#testes)  
- [Documentação API](#documentação-api)  
- [Recursos](#recursos)  
- [Contato](#contato)  

---

## Descrição

Projeto backend baseado em NestJS, com foco em cadastro, associação e consulta de Leads e Intenções, usando TypeORM para banco PostgreSQL, com validações via `class-validator`, tratamento de exceções e envio de emails com `@nestjs-modules/mailer`.

---

## Pré-requisitos

- Node.js >= 18.x  
- npm >= 8.x  
- PostgreSQL configurado  
- Variáveis de ambiente definidas (`.env`) com dados do banco e SMTP para envio de emails  

---

## Setup do Projeto

Clone o repositório e instale dependências:

```bash
git clone <seu-repositorio-url>
cd api-leads
npm install
```

---

## Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no modelo abaixo:

```env
# Banco de dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=leads_db

# Configurações de SMTP para envio de emails
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=seu_email
MAIL_PASS=sua_senha

# Outras configurações
APP_PORT=8080
NODE_ENV=development
```

**Notas**:
- Substitua `seu_usuario` e `sua_senha` pelas credenciais do seu banco PostgreSQL.
- Para o envio de emails via Gmail, use uma senha de aplicativo gerada nas configurações de segurança da sua conta Google (não a senha padrão do email).
- Certifique-se de que as credenciais estejam corretas e que o banco de dados esteja acessível.

---

## Execução

### Modo de Desenvolvimento
Para rodar a aplicação em modo de desenvolvimento com hot-reload:

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:8080` (ou na porta configurada no `.env`).

### Modo de Produção
Para compilar e rodar em modo de produção:

```bash
npm run build
npm run start:prod
```

### Modo de Depuração
Para rodar com suporte a debug:

```bash
npm run start:debug
```

---

## Testes

O projeto inclui testes unitários e de integração usando Jest. Execute os testes com:

```bash
# Todos os testes
npm run test
```

Certifique-se de que o banco de testes esteja configurado no `.env` para testes de integração.

---

## Documentação API

A documentação da API é gerada automaticamente com Swagger e está disponível em:

```
http://localhost:8080/docs
```

Acesse este endpoint após iniciar a aplicação para visualizar os endpoints, modelos e testar chamadas.

---

## Recursos

- **NestJS**: Framework Node.js para construção de aplicações escaláveis. [Documentação](https://docs.nestjs.com/)
- **TypeORM**: ORM para integração com PostgreSQL. [Documentação](https://typeorm.io/)
- **Swagger**: Documentação automática da API com `@nestjs/swagger` e `swagger-ui-express`. [Documentação](https://swagger.io/)
- **Jest**: Framework de testes unitários e de integração. [Documentação](https://jestjs.io/)
- **Nodemailer**: Envio de emails com `@nestjs-modules/mailer`. [Documentação](https://nodemailer.com/)
- **Class Validator**: Validação de dados com `class-validator`. [Documentação](https://github.com/typestack/class-validator)
- **ESLint e Prettier**: Ferramentas para linting e formatação de código. [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

---

## Contato

Para dúvidas, sugestões ou suporte, entre em contato:

- **Email**: rodrigo.silvestre@gmail.com.br
- **Responsável**: Rodrigo Silvestre