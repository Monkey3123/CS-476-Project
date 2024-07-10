// import express from 'express';
// import db from '../db/connection.js';
// import upload from '../upload.js'; // Import the Multer configuration

// const router = express.Router();

// // Route to handle car listing with photo upload
// router.post('/', upload.single('carPhoto'), async (req, res) => {
//   const carData = req.body;
//   try {
//     const collection = db.collection('listed_cars');
//     const carDetails = {
//       ...carData,
//       photo: req.file.path, // Save the file path in the database
//     };
//     const result = await collection.insertOne(carDetails);
//     res.status(201).send({ message: 'Car listed successfully', id: result.insertedId });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: 'Failed to list car' });
//   }
// });

// export default router;

//
