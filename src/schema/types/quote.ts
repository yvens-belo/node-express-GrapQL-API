import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import Context from '../../context/Context';
import author from './author';
import { formatDate } from '../../utils/functions';
import { Quote, Author } from '../../types';

const quote = new GraphQLObjectType({
  name: 'Quote',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'Globally unique ID of the quote',
      resolve: (obj: Quote): string => {
        return Buffer.from(`quote-${obj.id}`).toString('base64');
      },
    },
    _id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'Database ID of the quote',
      resolve: (obj: Quote): number => {
        return obj.id;
      },
    },
    text: {
      type: GraphQLNonNull(GraphQLString),
      description: '',
      resolve: (obj: Quote): string => {
        return obj.text;
      },
    },
    author: {
      type: author,
      description: 'Author of the quote',
      resolve: (obj: Quote, args, context: Context): Promise<Author> => {
        return context.loaders.author.load(obj.authorId);
      },
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      description: '',
      resolve: (obj: Quote): string => {
        return formatDate(new Date(obj.createdAt));
      },
    },
  }),
});

export default quote;
