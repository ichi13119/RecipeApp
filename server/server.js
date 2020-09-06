const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require ('graphql-tools');
const http = require('http');
const fs = require('fs');
require('dotenv').config({ path: 'variables.env' });

const Recipe = require('./models/Recipe');

// const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const typeDefs = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf-8'}));

// スキーマを作成
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// DB接続
mongoose.connect(process.env.MONGO_URI, { autoIndex: false })
.then(() => console.log('DB connected'))
.catch(err => console.log(err));

// 初期化
const app = express();

// オリジン間リソース共有の設定
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

// ApolloServerのインスタンスを作成
const apolloServer = new ApolloServer({ schema, context: { Recipe } });
apolloServer.applyMiddleware({ app, path: '/graphql' });

const port = 9000;

const httpServer = http.createServer(app);
// apolloServer.installSubscriptionHandlers(httpServer);
httpServer.listen(port, () => console.log(`Server started on port ${port}`));