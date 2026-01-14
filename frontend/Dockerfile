FROM node:20-alpine
# English: Node.js image for Angular dev server.
# Italiano: Immagine Node.js per server di sviluppo Angular.
WORKDIR /app
# English: Copy package manifests and install dependencies.
# Italiano: Copia i manifest package e installa le dipendenze.
COPY package*.json ./
RUN npm install
# English: Copy application sources.
# Italiano: Copia i sorgenti dell'applicazione.
COPY . .
EXPOSE 4200
# English: Start the Angular dev server.
# Italiano: Avvia il server di sviluppo Angular.
CMD ["npm", "start"]
