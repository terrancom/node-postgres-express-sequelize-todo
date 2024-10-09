FROM node:14-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install --production

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto 3000 (o el puerto que use tu app)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]