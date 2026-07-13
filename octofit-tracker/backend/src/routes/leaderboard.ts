import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().populate('user').populate('team').sort({ rank: 1 });

    res.json({
      data: leaderboard,
      message: 'Leaderboard retrieved successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve leaderboard', error });
  }
});

export default router;