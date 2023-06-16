const { Tech, Matchup, Movies} = require('../models');

const resolvers = {
  Query: {
    tech: async () => {
      return Tech.find({});
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
    movies: async () => {
      return Movies.find({});
    }
    
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
    deleteMatchup: async (parent, args) => {
      const matchup = await Matchup.findOneAndDelete(args);
      return matchup;
    },
  },
};

module.exports = resolvers;
