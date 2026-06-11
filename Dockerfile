# 1. Käytetään virallista kevyttä Node-imagea
FROM node:22-alpine

# 2. Luodaan sovellukselle kansio kontin sisälle
WORKDIR /usr/src/app

# 3. Kopioidaan riippuvuuslistat ja asennetaan ne
COPY package*.json ./
RUN npm install --only=production

# 4. Kopioidaan kaikki loput kooditiedostot
COPY . .

# 5. Avataan portti 8080 kontin sisältä ulos
EXPOSE 8080

# 6. Komento, joka käynnistää palvelimen kontissa
CMD [ "node", "index.js" ]
