FROM node:alpine
WORKDIR /usr/app/library-frontend
EXPOSE 3000
COPY ./ ./
RUN npm install
CMD ["npm", "start"]
