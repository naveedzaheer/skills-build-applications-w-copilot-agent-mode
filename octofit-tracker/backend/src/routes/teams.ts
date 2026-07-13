import { Router } from 'express';
import { Team } from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().sort({ name: 1 });

    res.json({
      data: teams,
      message: 'Teams retrieved successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve teams', error });
  }
});

export default router;