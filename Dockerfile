# Utilizar una imagen oficial de Node.js
FROM node:16

# Crear y establecer el directorio de trabajo en el contenedor
WORKDIR /app


COPY package.json .
COPY package-lock.json .

# Instalar dependencias
RUN npm ci

# Copiar los archivos de tu proyecto al contenedor
COPY . .

# Compilar el proyecto (si usas TypeScript)
RUN npm run build

# Exponer el puerto que utiliza tu API (por ejemplo, 3000)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]