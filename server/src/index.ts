import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server';

const prisma = new PrismaClient();

const typeDefs = gql`
  type User {
    id: String!
    email: String!
    name: String
  }
  type Query {
    allUsers: [User!]!
  }
`;

const resolvers = {
    Query: {
        allUsers: () => {
          return prisma.user.findMany();
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
