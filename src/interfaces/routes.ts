import { Router } from 'express';
import { UserController } from './controllers/user-controller';
import { UserService } from '../application/services/user-service';
import { UserRepository } from '../domain/repositories/user-repository';
import { knexInstance } from '../infrastructure/db/knex';

const router = Router();

// Instantiate layers manually (until you use a DI container)
const userRepository = new UserRepository(knexInstance); // Assume knexInstance is defined and configured
// If you have a Knex instance, pass it to the UserRepository constructor
// For example, you might have it imported from a database configuration file
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get('/healthcheck', (_, res) => {
  res.status(200).json({ ok: true });
});

// Route bindings
router.post('/users', (req, res) => userController.createUser(req, res));
router.get('/users/:id', (req, res) => userController.getUser(req, res));
router.get('/users', (req, res) => userController.getAllUsers(req, res));
router.put('/users/:id', (req, res) => userController.updateUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));


export default router;
