import { Router } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('user').sort({ loggedAt: -1 });

    res.json({
      data: activities,
      message: 'Activities retrieved successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve activities', error });
  }
});

export default router;