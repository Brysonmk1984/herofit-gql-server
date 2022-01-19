
const resolvers = {
  // Resolvers look like:
  // fieldName: (parent, args, context, info) => data;

  Query: {
    // Get a single profile by ID for the profile page
    profile: (_, { id }, { dataSources }) => dataSources.profileAPI.getHero(id)
  },
  Profile: {
    hero: ({ id }, _, { dataSources }) => dataSources.profileAPI.getHero(id)
  }
};

export default resolvers;