import { Request, Response } from 'express';
import { UserService } from '../../application/services/user-service';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  // 🔹 Create new user
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const {
        email,
        password,
        full_name,
        phone_number,
        username,
        fingerprints
      } = req.body;

      const newUser = await this.userService.createUser({
        email,
        password,
        full_name,
        phone_number,
        username,
        fingerprints,
      });

      res.status(201).json(newUser);
    } catch (error: any) {
      console.error('Create user failed:', error);
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }

  // 🔹 Get user by ID
  public async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);
      res.status(200).json(user);
    } catch (error: any) {
      console.error('Get user failed:', error);
      res.status(404).json({ message: error.message || 'User not found' });
    }
  }

  // 🔹 Get all users (pagination supported)
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const users = await this.userService.getAllUsers(page, limit);
      res.status(200).json(users);
    } catch (error: any) {
      console.error('List users failed:', error);
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }

  // 🔹 Update user
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const updatedData = req.body;
      const updatedUser = await this.userService.updateUser(userId, updatedData);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      console.error('Update user failed:', error);
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }

  // 🔹 Delete user
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      await this.userService.deleteUser(userId);
      res.status(204).send();
    } catch (error: any) {
      console.error('Delete user failed:', error);
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }
}
