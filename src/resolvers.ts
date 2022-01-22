import { Context } from "./context";

//use Prisma Client in your resolvers to read and write data in the database based on incoming queries and mutations.
const resolvers = {
  // Resolvers look like:
  // fieldName: (parent, args, context, info) => data;

  Query: {
    // Get a single profile by ID for the profile page
    userProfile: (_ : {}, { email : owner } : { email : string }, { prisma } : Context) => {
      return prisma.avatars.findUnique({ where: { owner } });
    }

  },

  // Only fetch userprofile for current user, need separate resolver to handle fetching others profile
  UserProfile: {
    hero: (_ : any, { email : owner } : any, { prisma } : Context) => {
      return prisma.avatars.findUnique({
        where: { owner }
      });
    },
    user: (_: any, { email } : any, { prisma } : Context  ) => {
      return prisma.users.findUnique({
        where: { email }
      });
    },
    userTotals: (_ : any, { email : user } : any, { prisma } : Context  ) => {
      return prisma.userTotals.findFirst({
        where: { user }
      });
    },
    latestActivities: (_ : any, { email : user } : any, { prisma } : Context  ) => {
      return prisma.userActivities.findMany({
        where: { user },
        take: 10,
        orderBy: {
          activityDate: 'desc'
        }
      });
    },
    latestBattles: (_: any, { email : owner } : any, { prisma } : Context  ) => {
      return prisma.battles.findMany({
        where: { owner },
        take: 50,
        orderBy: {
          createdAt: 'desc'
        }
      });
    }
  },


};

export default resolvers;