# Etapa de build
FROM node:16 AS build

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos de configuração do package.json
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando todos os arquivos do projeto
COPY . .

# Rodando o comando de build da aplicação
RUN npm run build

# Definindo a imagem base para a próxima etapa
FROM nginx:alpine

# Copiando os arquivos de build da aplicação para o diretório de HTML do Nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expondo a porta 80 (se necessário)
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
