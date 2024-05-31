# Usar uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências e package.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia os arquivos do projeto para o diretório de trabalho
COPY . .

# Compila o projeto
RUN npm run build

# Instala o servidor HTTP
RUN npm install -g serve

# Expor a porta padrão do servidor HTTP
EXPOSE 3000

# Define o comando padrão para executar o servidor HTTP
CMD ["serve", "-s", "build"]