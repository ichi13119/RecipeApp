const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require ('graphql-tools');
const http = require('http');
const fs = require('fs');
require('dotenv').config({ path: 'variables.env' });

const Recipe = require('./models/Recipe');
const User = require('./models/User');

// const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const typeDefs = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf-8'}));

const jwtSecret = Buffer.from(process.env.SECRET, 'base64');

// スキーマを作成
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

mongoose.set('useCreateIndex', true);

// DB接続
mongoose.connect(process.env.MONGO_URI, { autoIndex: false })
.then(() => console.log('DB connected'))
.catch(err => console.log(err));

// 初期化
const app = express();

// オリジン間リソース共有の設定
const corsOptions = {
  origin: 'http://localhost:3000'
};
// app.use(cors(corsOptions));
app.use(cors(corsOptions), bodyParser.json(), expressJwt({
  credentialsRequired: false,
  secret: process.env.SECRET,
  algorithms: ['HS256']
}));

// const currentUser = (req, connection) => {
//   if (req && req.user) {
//     return { usesrId: req.user.sub};
//   }
//   if (connection && connection.context && connection.context.accessToken) {
//     const decodedToken = jwt.verify(connection.context.accessToken, jwtSecret);
//     console.log(connection);
//     console.log(decodedToken);
//     return { userId: decodedToken.sub };
//   }
//   return {};
// }

app.use(async (req, res, next) => {
  // const token = req.headers['authorization'];
  const bearToken = req.headers['authorization'];
  if (bearToken) {
    const bearer = bearToken.split(' ');
    const token = bearer[1];
    // console.log(token);
    if (token !== "null") {
      try {
        const currentUser = await jwt.verify(token, process.env.SECRET);
        req.currentUser = currentUser;
      } catch (err) {
        console.log(err);
      }
    }
  }
  next();
});

// ApolloServerのインスタンスを作成
const apolloServer = new ApolloServer({ schema, context: ({ req }) => ({ Recipe, User, currentUser: req.currentUser }) });
// const apolloServer = new ApolloServer({ schema, context: ({ req }) => ({ Recipe, User, currentUser }) });
apolloServer.applyMiddleware({ app, path: '/graphql' });

// 二重認証？
// app.post('/signin', (req, res) => {
//   const { username, password } = req.body;
//   console.log(req);
//   const user = User.find(username);
//   if (!(user && user.password === password)) {
//     res.sendStatus(400);
//     return;
//   }
//   const token = jwt.sign({ username, password }, process.env.SECRET);
//   console.log('signin:',token);
//   res.json({ token });
// });

const port = 9000;

const httpServer = http.createServer(app);
// apolloServer.installSubscriptionHandlers(httpServer);
httpServer.listen(port, () => console.log(`Server started on port ${port}`));