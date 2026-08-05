# CRM de Clientes

Aplicação simples de cadastro de clientes (CRUD) para a atividade de manutenção da UC9.

## Tecnologias
- Backend: Java + Spring Boot (porta 8082)
- Banco de dados: PostgreSQL (via Docker, porta 5434)
- Frontend: React + Vite (porta 5174)

## Como rodar

1. **Subir o banco de dados** (na raiz `projetos-manutencao/`)
   ```
   docker compose up -d db-crm
   ```

2. **Rodar o backend**
   ```
   cd backend
   mvn spring-boot:run
   ```

3. **Rodar o frontend** (em outro terminal)
   ```
   cd frontend
   npm install
   npm run dev
   ```

4. Acesse **http://localhost:5174** no navegador.

## O que fazer

Cadastre clientes, edite um cliente existente, tente cadastrar e-mails diferentes, observe como os
telefones aparecem na lista. Qualquer comportamento inesperado pode virar um chamado (bug ou
melhoria) no Painel de Manutenção da turma.
