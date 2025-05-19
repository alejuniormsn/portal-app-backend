# Backend em Node - Portal Adm e App

# - Banco de Dados via terminal (Linux) Docker Compose:

- Criar estrutura com o comando "docker compose up -d" via terminal na pasta que contem o arquivo docker-compose.yml.
- Fazer a conexão com um gerenciador de bancos e importar Dump (backup) que é gerado diariamente no server do Backend.

# - Install Postgresql 17

sudo apt install curl ca-certificates
sudo install -d /usr/share/postgresql-common/pgdg
sudo curl -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc --fail https://www.postgresql.org/media/keys/ACCC4CF8.asc
sudo sh -c 'echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt noble-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
sudo apt update
sudo apt-get install postgresql-client -y

# - Script para gerar Dump do bando de dados (Backup via terminal Linux)

PGPASSWORD="PASSWORD" pg_dump -U portaldb -h 192.168.0.26 -p 5432 portaldb > /home/dev/workspace/db-portal/$(date +%Y%m%d-%H%M%S)-portaldb.sql

# - Aplicação servida pelo PM2:

    https://pm2.keymetrics.io/docs/usage/quick-start/

- Comando via terminal Linux do server de backend:
  Server start: pm2 start build/server.js -i 3 --name Backend
  Server stop: pm2 stop all
  Server status: pm2 list
  Server restart: pm2 restart all
