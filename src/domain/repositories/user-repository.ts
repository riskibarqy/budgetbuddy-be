import { Knex } from 'knex';
import { User } from '../entities/user';

export class UserRepository {
  private knex: Knex;

  constructor(knexInstance: Knex) {
    this.knex = knexInstance;
  }

  private mapDbUserToUser(user: User): User {
    return {
      ...user,
    };
  }

  async create(user: Omit<User,'created_at' | 'updated_at'>): Promise<User> {
    const [createdUser] = await this.knex('users')
      .insert({
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        password: user.password,
        phone_number: user.phone_number ?? null,
        username: user.username ?? null,
        fingerprints: user.fingerprints ? JSON.stringify(user.fingerprints) : null,
      })
      .returning('*');

    return this.mapDbUserToUser(createdUser);
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.knex('users').where('id', id).first();
    if (!user) return null;
    return this.mapDbUserToUser(user);
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.knex('users').where('email', email).first();
    if (!user) return null;
    return this.mapDbUserToUser(user);
  }

  async getByUsername(username: string): Promise<User | null> {
    const user = await this.knex('users').where('username', username).first();
    if (!user) return null;
    return this.mapDbUserToUser(user);
  }

  async update(
    id: string,
    updates: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<User | null> {
    if (updates.fingerprints) {
      updates.fingerprints = JSON.stringify(updates.fingerprints);
    }

    const [updatedUser] = await this.knex('users')
      .where('id', id)
      .update({
        ...updates,
        updated_at: this.knex.fn.now(),
      })
      .returning('*');

    if (!updatedUser) return null;
    return this.mapDbUserToUser(updatedUser);
  }

  async delete(id: string): Promise<boolean> {
    const deletedCount = await this.knex('users').where('id', id).del();
    return deletedCount > 0;
  }

  async listAll(limit: number, offset : number): Promise<User[]> {
    const users = await this.knex('users').select('*').limit(limit).offset(offset);
    console.log('Fetched users:', users);
    return users.map(this.mapDbUserToUser);
  }
}
