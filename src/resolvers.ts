import { Context } from "./context";
import { stackItemInstances, mergeItemDefaultsWithInstances } from "./lib/helperFunctions";

//use Prisma Client in your resolvers to read and write data in the database based on incoming queries and mutations.
const resolvers = {
  // Resolvers look like:
  // fieldName: (parent, args, context, info) => data;

  Query: {
    // Get a single profile by ID for the profile page
    userProfile: async (_ : {}, { email : owner } : { email : string }, { prisma } : Context) => {
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
        console.log(hero);
      }
      return hero;
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
    // Get default game items
    // Parent in the userProfile query is pointing to the avatarItems included on the hero
    items: (parent:any, args : any, { prisma } : Context) => {
      const avatarItems = parent.avatarItems.map((i : any) => i.itemID);

      return prisma.items.findMany({
        where : { id : { in : avatarItems } }
      });
    }
  },


};

export default resolvers;