const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const multer = require('multer');
const path = require('path');
const axios = require('axios');

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/complaints/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Create complaint
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const complaintData = {
      ...req.body,
      location: JSON.parse(req.body.location),
      images: req.files ? req.files.map(file => file.filename) : []
    };
    
    const complaint = new Complaint(complaintData);
    await complaint.save();
    
    // Send WhatsApp notification
    if (req.body.userPhone) {
      await sendWhatsAppNotification(complaint, req.body.userPhone);
    }
    
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const { status, category, userId } = req.query;
    let query = {};
    
    if (status) query.status = status;
    if (category) query.category = category;
    if (userId) query.userId = userId;
    
    const complaints = await Complaint.find(query)
      .populate('userId', 'name email')
      .sort('-createdAt');
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get complaint by ID
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('userId', 'name email phone');
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update complaint status
router.patch('/:id/status', async (req, res) => {
  try {
    const updateData = {
      status: req.body.status,
      updatedAt: new Date()
    };
    
    if (req.body.status === 'resolved') {
      updateData.resolvedAt = new Date();
    }
    
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    // Send WhatsApp notification
    if (complaint.userPhone) {
      await sendStatusUpdateNotification(complaint, complaint.userPhone);
    }
    
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add comment to complaint
router.post('/:id/comments', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            text: req.body.text,
            userId: req.body.userId,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete complaint
router.delete('/:id', async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function sendWhatsAppNotification(complaint, phoneNumber) {
  try {
    const message = `New complaint registered:\n\nTitle: ${complaint.title}\nCategory: ${complaint.category}\nStatus: ${complaint.status}\nLocation: ${complaint.location.address}\n\nThank you for reporting!`;
    
    await axios.post('http://localhost:5000/api/whatsapp/send', {
      phoneNumber,
      message
    });
  } catch (error) {
    console.error('WhatsApp notification error:', error.message);
  }
}

async function sendStatusUpdateNotification(complaint, phoneNumber) {
  try {
    const message = `Complaint Update:\n\nTitle: ${complaint.title}\nNew Status: ${complaint.status}\n\nThank you for your patience!`;
    
    await axios.post('http://localhost:5000/api/whatsapp/send', {
      phoneNumber,
      message
    });
  } catch (error) {
    console.error('WhatsApp notification error:', error.message);
  }
}

module.exports = router;