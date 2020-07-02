import QuoteRepository, { FindParameters, CountParameters } from './QuoteRepository';
import database from '../database';
import { Quote } from '../types';

export default class QuoteKnexRepository implements QuoteRepository {

  async get(id: number): Promise<Quote> {
    return database.select()
      .from('quote')
      .where('id', id)
      .first();
  }

  async find(params: FindParameters): Promise<Quote[]> {
    const { first, after, authorId, query } = params;

    return database.select()
      .from('quote')
      .modify((queryBuilder) => {
        if (typeof after !== 'undefined' && after !== null) {
          queryBuilder.offset(after);
        }

        if (typeof authorId !== 'undefined' && authorId !== null) {
          queryBuilder.where('authorId', authorId);
        }

        if (typeof query !== 'undefined' && query !== null) {
          queryBuilder.where('text', 'like', `%${query}%`);
        }
      })
      .limit(first);
  }

  async count(params: CountParameters): Promise<number> {
    const { authorId, query } = params;

    return database.count({ count: '*' })
      .from('quote')
      .modify((queryBuilder) => {
        if (typeof authorId !== 'undefined' && authorId !== null) {
          queryBuilder.where('authorId', authorId);
        }

        if (typeof query !== 'undefined' && query !== null) {
          queryBuilder.where('text', 'like', `%${query}%`);
        }
      })
      .first()
      .then(result => result.count);
  }
}
