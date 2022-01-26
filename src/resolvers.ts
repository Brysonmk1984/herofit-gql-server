import { Context } from "./context";
import { stackItemInstances, mergeItemDefaultsWithInstances } from "./lib/helperFunctions";

//use Prisma Client in your resolvers to read and write data in the database based on incoming queries and mutations.
const resolvers = {
  Query: {
    // Get a single hero by ID for the profile page
    hero : async (_ : any, { email : owner } : { email : string }, { prisma } : Context ) => {
      const hero = await prisma.avatars.findUnique({
        where: { owner },
        include : { 
          avatarItems : {
            include : {
              items : true
            }
          }
        }
      });

      // for item instances, stack consumables
      // Then merge item default into item instance
      if(hero){
        const stackedItems = stackItemInstances(hero.avatarItems);
        const mergedItems = mergeItemDefaultsWithInstances(stackedItems);
        hero.avatarItems = mergedItems;
        
      }
      return hero;
    },
    // Get Single user by email for profile page
    user: (_: any, { email } : any, { prisma } : Context  ) => {
      return prisma.users.findUnique({
        where: { email },
        // These can't only be done on dev, since prod DB wont have the same changes to DB
        //include : {
          //userTotals : true,
          // userActivities : true,
          // userBattles : true
        //},
      });
    },
    // Get UserTotals of matching user
    userTotals: (_ : any, { email : user } : any, { prisma } : Context  ) => {
      // Can't use findUnique since I never set this field as unique in DB
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
    },
  },
};

export default resolvers;