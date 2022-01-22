import { Context } from "./context";

//use Prisma Client in your resolvers to read and write data in the database based on incoming queries and mutations.
const resolvers = {
  // Resolvers look like:
  // fieldName: (parent, args, context, info) => data;

  Query: {
    // Get a single profile by ID for the profile page
    profile: (_ : {}, { id } : { id : number }, { prisma } : Context) => {
      return prisma.avatars.findUnique({ where: { id } });
    }

  },

  Profile: {
    hero: ({id} : any, _ : any, { prisma } : Context) => {
      return prisma.avatars.findUnique({
        where: { id }
      });
    }
  }

};

export default resolvers;