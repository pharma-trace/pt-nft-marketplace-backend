FROM public.ecr.aws/lambda/nodejs:12.2022.10.24.14
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
COPY . .
RUN rm ./node_modules
RUN rm ./mongo-compose
RUN npm install --production

COPY .env.server .env
EXPOSE 8000
CMD [ "node", "index.js" ]


