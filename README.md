# notion-oauth
Notion OAuth for vercel


## Deploy Vercel
You can also deploy it to [Vercel](https://vercel.com):
```sh
vercel --prod
```

or just by connecting your Vercel app to git repository


## Deploy to VPC
You can run the server with node.js simply by running
```sh
node server.js
```

Also you can do it with [pm2](https://pm2.keymetrics.io/)
```sh
pm2 start --name notion-oauth server.js
```
