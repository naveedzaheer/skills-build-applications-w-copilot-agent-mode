import { Router } from 'express';
import { User } from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await User.find().populate('team').sort({ displayName: 1 });

    res.json({
      data: users,
      message: 'Users retrieved successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve users', error });
  }
});

export default router;