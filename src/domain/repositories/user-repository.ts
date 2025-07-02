import { Pool } from 'pg';
import { CreateUserDTO, UpdateUserDTO } from '../../application/dtos/user-dtos';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export class UserRepository {
  async createUser(data: CreateUserDTO) {
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [data.name, data.email, data.password]
    );
    return result.rows[0];
  }

  async getUserById(id: string) {
    const result = await pool.query(
      `SELECT id, name, email FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async getAllUsers(limit: number, offset: number) {
    const result = await pool.query(
      `SELECT id, name, email FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return result.rows;
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    const fields = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        fields.push(`${key} = $${index}`);
        values.push(value);
        index++;
      }
    }

    if (fields.length === 0) return null;

    values.push(id); // last parameter is ID
    const result = await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING id, name, email`,
      values
    );

    return result.rows[0] || null;
  }

  async deleteUser(id: string) {
    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING id`,
      [id]
    );
    return (result?.rowCount ?? 0) > 0;
  }
}
