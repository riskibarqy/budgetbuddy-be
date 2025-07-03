// src/application/services/UserService.ts
import { UserRepository } from "../../domain/repositories/user-repository";
import { createUserSchema, updateUserSchema } from "../validators/user-validator";
import { ValidationError, NotFoundError } from "../errors/custom-error";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { User } from "@/domain/entities/user";
import { users } from "@clerk/clerk-sdk-node";

export class UserService {
  private userRepository: UserRepository;
  private SALT_ROUNDS = 10;


  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  /**
   * Creates a new user with the provided user data.
   * @param userData - The data for the new user.
   * @returns The created user object.
   * @throws ValidationError if the input data is invalid.
   */ 
public async createUser(userData: User) {
  try {
    createUserSchema.parse(userData);
  } catch (e) {
    if (e instanceof ZodError) {
      console.log("Validation errors:", e.errors);
      throw new ValidationError(e.errors.map(err => err.message).join(", "));
    }
    throw e;
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(userData.password, this.SALT_ROUNDS);

  // Destructure with correct syntax
  const {
    email,
    full_name,
    phone_number,
    username,
    fingerprints,
  } = userData;

  // Create user in Clerk
  const clerkUser = await users.createUser({
    emailAddress: [email],              // Clerk expects array of strings
    password: userData.password,        // Use plain password here (Clerk hashes it)
    firstName: full_name,               // If you want to split full_name, do it here
    lastName: full_name,                // Otherwise you might just duplicate
    username: username || undefined,
  });

  // Prepare user for local DB (omit id, created_at, updated_at)
  const localUser = {
    id: clerkUser.id,                   // Use Clerk's user ID
    full_name: clerkUser.firstName + ' ' + clerkUser.lastName,
    email: clerkUser.emailAddresses[0].emailAddress,
    password: hashedPassword,               // Store hashed password separately in your DB
    phone_number: phone_number || undefined,
    username: username || undefined,
    fingerprints: Array.isArray(fingerprints) ? fingerprints : [],
  };

  return await this.userRepository.create(localUser);
}


  public async getUserById(id: string) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundError(`User with ID ${id} not found.`);
    return user;
  }

  public async getAllUsers(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return await this.userRepository.listAll(limit, offset);
  }

  public async updateUser(id: string, userData: User) {
    try {
      updateUserSchema.parse(userData);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new ValidationError(e.errors.map(err => err.message).join(", "));
      }
      throw e;
    }

    // If password present in update, hash it
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, this.SALT_ROUNDS);
    }

    // Normalize fingerprints
    if (userData.fingerprints && !Array.isArray(userData.fingerprints)) {
      userData.fingerprints = [];
    }

    const updatedUser = await this.userRepository.update(id, userData);
    if (!updatedUser) throw new NotFoundError(`User with ID ${id} not found.`);
    return updatedUser;
  }

  public async deleteUser(id: string) {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) throw new NotFoundError(`User with ID ${id} not found.`);
    return deleted;
  }
}
