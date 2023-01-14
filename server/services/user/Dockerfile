FROM node:16.16
WORKDIR /server/services/users
COPY package*.json ./
RUN npm install && npm cache clean –force
ENV NODE_ENV=production
ENV PORT=4001
ENV ATLAS_URI=mongodb+srv://admin:QSXKuoGVMiCsnLpl@cluster0.azeymhn.mongodb.net/?retryWrites=true&w=majority&keepAlive=true&socketTimeoutMS=360000&connectTimeoutMS=360000
ENV SECRET="ini rahasia"
ENV SALT=10
RUN npm install -g nodemon
COPY ./ ./
CMD ["node","app.js"]