FROM node:18-buster
COPY . . 
RUN npm i
CMD npm run dev
EXPOSE 3000