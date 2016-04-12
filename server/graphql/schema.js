import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString
} from 'graphql';

import { DB } from './db';

const Posts = new GraphQLObjectType({
  name: 'Posts',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Post name'
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    viewPost: {
      type: Posts,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, args) => {
        return DB.Posts.get(args);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'RootMutations',
  fields: {
    newPost: {
      type: Posts,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, args) => {
        const result = DB.Posts.create(args);
        return result;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default schema;
