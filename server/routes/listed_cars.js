import express from 'express';
import db from '../db/connection.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const carData = req.body;
  try {
    const collection = db.collection('listed_cars');
    const result = await collection.insertOne(carData);
    res.status(201).send({ message: 'Car listed successfully', id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to list car' });
  }
});

export default router;
