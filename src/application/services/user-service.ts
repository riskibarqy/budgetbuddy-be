// src/application/services/UserService.ts
import { UserRepository } from "../../domain/repositories/user-repository";
import { createUserSchema, updateUserSchema } from "../validators/user-validator";
import { ValidationError, NotFoundError } from "../errors/custom-error";
import { ZodError } from "zod";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(userData: any) {
    try {
      createUserSchema.parse(userData);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new ValidationError(e.errors.map(err => err.message).join(", "));
      }
      throw e;
    }
    return await this.userRepository.createUser(userData);
  }

  public async getUserById(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new NotFoundError(`User with ID ${id} not found.`);
    return user;
  }

  public async getAllUsers(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return await this.userRepository.getAllUsers(limit, offset);
  }

  public async updateUser(id: string, userData: any) {
    try {
      updateUserSchema.parse(userData);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new ValidationError(e.errors.map(err => err.message).join(", "));
      }
      throw e;
    }
    const updatedUser = await this.userRepository.updateUser(id, userData);
    if (!updatedUser) throw new NotFoundError(`User with ID ${id} not found.`);
    return updatedUser;
  }

  public async deleteUser(id: string) {
    const deleted = await this.userRepository.deleteUser(id);
    if (!deleted) throw new NotFoundError(`User with ID ${id} not found.`);
    return deleted;
  }
}
