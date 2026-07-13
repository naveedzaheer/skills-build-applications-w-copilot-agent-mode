import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [trailBlazers, coreCrew] = await Team.create([
      {
        name: 'Trail Blazers',
        mascot: 'Comet',
        motto: 'Every mile counts',
        weeklyGoalMinutes: 900,
      },
      {
        name: 'Core Crew',
        mascot: 'Atlas',
        motto: 'Stronger together',
        weeklyGoalMinutes: 750,
      },
    ]);

    const [maya, jordan, priya] = await User.create([
      {
        username: 'maya_runner',
        email: 'maya@example.com',
        displayName: 'Maya Chen',
        profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
        fitnessGoal: 'Train for a half marathon',
        team: trailBlazers._id,
      },
      {
        username: 'jordan_lifts',
        email: 'jordan@example.com',
        displayName: 'Jordan Smith',
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        fitnessGoal: 'Build functional strength',
        team: coreCrew._id,
      },
      {
        username: 'priya_flow',
        email: 'priya@example.com',
        displayName: 'Priya Patel',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
        fitnessGoal: 'Improve mobility and consistency',
        team: trailBlazers._id,
      },
    ]);

    await Activity.create([
      {
        user: maya._id,
        activityType: 'Outdoor run',
        durationMinutes: 42,
        caloriesBurned: 430,
        loggedAt: new Date('2026-07-10T07:30:00.000Z'),
      },
      {
        user: jordan._id,
        activityType: 'Strength training',
        durationMinutes: 55,
        caloriesBurned: 380,
        loggedAt: new Date('2026-07-11T18:15:00.000Z'),
      },
      {
        user: priya._id,
        activityType: 'Yoga flow',
        durationMinutes: 35,
        caloriesBurned: 160,
        loggedAt: new Date('2026-07-12T12:00:00.000Z'),
      },
      {
        user: maya._id,
        activityType: 'Cycling intervals',
        durationMinutes: 48,
        caloriesBurned: 520,
        loggedAt: new Date('2026-07-13T06:45:00.000Z'),
      },
    ]);

    await Leaderboard.create([
      {
        user: maya._id,
        team: trailBlazers._id,
        points: 1420,
        rank: 1,
        streakDays: 12,
      },
      {
        user: jordan._id,
        team: coreCrew._id,
        points: 1185,
        rank: 2,
        streakDays: 8,
      },
      {
        user: priya._id,
        team: trailBlazers._id,
        points: 990,
        rank: 3,
        streakDays: 6,
      },
    ]);

    await Workout.create([
      {
        title: '5K Pace Builder',
        focusArea: 'Cardio endurance',
        difficulty: 'Intermediate',
        durationMinutes: 40,
        suggestedForGoal: 'Train for a half marathon',
        exercises: ['10-minute warmup jog', '6 x 2-minute tempo intervals', '8-minute cooldown'],
      },
      {
        title: 'Foundational Strength Circuit',
        focusArea: 'Full body strength',
        difficulty: 'Beginner',
        durationMinutes: 35,
        suggestedForGoal: 'Build functional strength',
        exercises: ['Goblet squats', 'Push-ups', 'Dumbbell rows', 'Farmer carries'],
      },
      {
        title: 'Mobility Reset Flow',
        focusArea: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 25,
        suggestedForGoal: 'Improve mobility and consistency',
        exercises: ['Cat-cow', 'Worlds greatest stretch', 'Hip airplanes', 'Box breathing'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
