const express = require('express');
const router = express.Router();
const Amenity = require('../models/Amenity');

// Create amenity
router.post('/', async (req, res) => {
  try {
    const amenity = new Amenity(req.body);
    await amenity.save();
    res.status(201).json(amenity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all amenities
router.get('/', async (req, res) => {
  try {
    const { type, isActive } = req.query;
    let query = {};
    
    if (type) query.type = type;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    
    const amenities = await Amenity.find(query);
    res.json(amenities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get amenity by ID
router.get('/:id', async (req, res) => {
  try {
    const amenity = await Amenity.findById(req.params.id);
    res.json(amenity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add review
router.post('/:id/reviews', async (req, res) => {
  try {
    const amenity = await Amenity.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reviews: {
            userId: req.body.userId,
            rating: req.body.rating,
            comment: req.body.comment
          }
        }
      },
      { new: true }
    );
    
    // Update average rating
    const avgRating = amenity.reviews.reduce((acc, r) => acc + r.rating, 0) / amenity.reviews.length;
    amenity.rating = avgRating;
    await amenity.save();
    
    res.json(amenity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update amenity
router.put('/:id', async (req, res) => {
  try {
    const amenity = await Amenity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(amenity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete amenity
router.delete('/:id', async (req, res) => {
  try {
    await Amenity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Amenity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;