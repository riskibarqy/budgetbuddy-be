import { Request, Response } from 'express';
import { UserService } from '../../application/services/user-service';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.createUser(req.body); // Use req.body directly
            res.status(201).json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }
}
