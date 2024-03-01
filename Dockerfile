FROM node
WORKDIR /app
COPY Frontend /app/Frontend
WORKDIR /app/Frontend/src
RUN npm i
EXPOSE 3000
WORKDIR /app/Frontend/src
CMD ["npm","run","start"]