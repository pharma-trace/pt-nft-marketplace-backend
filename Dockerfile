FROM public.ecr.aws/lambda/nodejs:12.2022.10.24.14
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
COPY . .
RUN rm  -rf ./node_modules
RUN rm  -rf  ./mongo-compose
RUN rm package-lock.json
RUN npm install --save
RUN npm install --no-audit
RUN npm audit fix
RUN npx npm-force-resolutions 
COPY .env.server .env
EXPOSE 8000
CMD ["npm", "run". "deploy"]


