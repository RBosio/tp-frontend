import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'
import { buildSchema } from 'type-graphql'
import Container from 'typedi'
import { PingResolver } from './resolvers/ping'
import { CategoryResolver } from './resolvers/category'
import { ProductResolver } from './resolvers/product'
import productRoutes from './routes/product'
import path from 'path'

export async function startServer() {
  const app = express()

  //Settings
  app.set('port', process.env.PORT || 3000)
  
  //Start apollo-server
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PingResolver, CategoryResolver, ProductResolver],
      container: Container
    }),
    context: ({req, res}) => ({req, res})
  })

  await server.start()
  server.applyMiddleware({app, path: '/graphql'})

  //Middlewares
  app.use(cors())
  app.use(express.json())

  app.use('/upload', productRoutes)

  app.use(express.static(path.join(__dirname, 'public')))

  return app
}