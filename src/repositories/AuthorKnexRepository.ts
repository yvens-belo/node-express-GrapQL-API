import AuthorRepository, { CreateParameters, FindParameters, CountParameters } from './AuthorRepository';
import database from '../database';
import { Author } from '../types';

export default class AuthorKnexRepository implements AuthorRepository {

  async get(id: number): Promise<Author> {
    return database.select()
      .from('author')
      .where('id', id)
      .first();
  }

  getMany(ids: number[]): Promise<Author[]> {
    return database.select()
      .from('author')
      .whereIn('id', ids);
  }

  async find(params: FindParameters): Promise<Author[]> {
    const { first, after, firstName, lastName, orderBy } = params;

    return database.select()
      .from('author')
      .modify((queryBuilder) => {
        if (typeof after !== 'undefined' && after !== null) {
          queryBuilder.offset(after);
        }

        if (typeof firstName !== 'undefined' && firstName !== null) {
          queryBuilder.where('firstName', 'like', `%${firstName}%`);
        }

        if (typeof lastName !== 'undefined' && lastName !== null) {
          queryBuilder.where('lastName', 'like', `%${lastName}%`);
        }

        if (Array.isArray(orderBy)) {
          orderBy.forEach(ob => queryBuilder.orderBy(ob.field, ob.direction));
        }
      })
      .limit(first);
  }

  async count(params: CountParameters): Promise<number> {
    const { firstName, lastName } = params;

    return database.count({ count: '*' })
      .from('author')
      .modify((queryBuilder) => {
        if (typeof firstName !== 'undefined' && firstName !== null) {
          queryBuilder.where('firstName', 'like', `%${firstName}%`);
        }

        if (typeof lastName !== 'undefined' && lastName !== null) {
          queryBuilder.where('lastName', 'like', `%${lastName}%`);
        }
      })
      .first()
      .then(result => result.count);
  }

  async create(params: CreateParameters): Promise<Author> {
    return database.insert({
      firstName: params.firstName,
      lastName: params.lastName,
    })
    .returning('id')
    .into('author')
    .then(ids => {
      return this.get(ids[0]);
    });
  }

  async update(id: number, firstName: string, lastName: string): Promise<Author> {
    return database.table('author')
      .where('id', id)
      .modify((queryBuilder) => {
        if (typeof firstName !== 'undefined' && firstName !== null) {
          queryBuilder.update('firstName', firstName);
        }

        if (typeof lastName !== 'undefined' && lastName !== null) {
          queryBuilder.update('lastName', lastName);
        }
      })
      .then(updatedRows => {
        if (updatedRows.length === 0) {
          throw new Error('Author not found!');
        }
        return updatedRows;
      }).then(() => {
        return this.get(id);
      });
  }
}
