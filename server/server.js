const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer, graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require ('graphql-tools');
const http = require('http');
// require('dotenv').config({ path: 'variables.env' });

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// スキーマを作成
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// DB接続
// mongoose.connect(process.env.MONGO_URI, { autoIndex: false })
// .then(() => console.log('DB connected'))
// .catch(err => console.log(err));

// 初期化
const app = express();

// オリジン間リソース共有の設定
const corsOptions = {
  origin: true,
  credentials: true
};
app.use(cors(corsOptions));

// ApolloServerのインスタンスを作成
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app, path: '/graphql' });

const port = 9000;

const httpServer = http.createServer(app);
// apolloServer.installSubscriptionHandlers(httpServer);
httpServer.listen(port, () => console.log(`Server started on port ${port}`));