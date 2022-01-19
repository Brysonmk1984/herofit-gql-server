import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './schema';

// INDEX.ts should house the apollo server and listen on a port for requests

async function startApolloServer(typeDefs, resolvers){

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url, port } = await server.listen({ port : process.env.PORT || 4000 });
  console.log(`🚀  Server is running 🔉  Listening on port ${port} 📭  Query at ${url}`);
}

startApolloServer(typeDefs, resolvers);