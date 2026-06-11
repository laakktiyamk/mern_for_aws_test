# === VAIHE 1: Rakennetaan React (Vite) ===
FROM node:22-alpine AS frontend-builder
WORKDIR /usr/src/app/frontend

# Kopioidaan Viten pakettiluettelot ja asennetaan ne
COPY frontend/package*.json ./
RUN npm install

# Kopioidaan Viten koodit ja rakennetaan tuotantoversio (npm run build luo dist-kansion)
COPY frontend/ ./
RUN npm run build

# === VAIHE 2: Rakennetaan Express ===
FROM node:22-alpine
WORKDIR /usr/src/app

# Kopioidaan Expressin pakettiluettelot ja asennetaan vain tuotantopaketit
COPY package*.json ./
RUN npm install --only=production

# Kopioidaan Expressin kooditiedostot
COPY . .

# Kopioidaan valmis Vite-käännös VAIHEESTA 1 Expressin sisälle oikeaan paikkaan
COPY --from=frontend-builder /usr/src/app/frontend/dist ./frontend/dist

# Avataan portti ja käynnistetään palvelin
EXPOSE 8080
CMD [ "node", "index.js" ]
