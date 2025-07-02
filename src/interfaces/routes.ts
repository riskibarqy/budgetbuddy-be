import { Router } from 'express';
import { UserController } from './controllers/user-controller';
import { UserService } from '../application/services/user-service';
import { UserRepository } from '../domain/repositories/user-repository';

const router = Router();

// Instantiate layers manually (until you use a DI container)
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Route bindings
router.post('/users', (req, res) => userController.createUser(req, res));
// You can do the same for others:
// router.get('/users/:id', (req, res) => userController.getUser(req, res));

export default router;
