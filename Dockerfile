FROM node
WORKDIR /app
COPY BLChain_Pay /app
RUN npm i
EXPOSE 3000
WORKDIR /app/src
CMD ["npm","run","start"]