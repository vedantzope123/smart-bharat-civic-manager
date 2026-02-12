const express = require('express');
const router = express.Router();
const axios = require('axios');

// Send WhatsApp message
router.post('/send', async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;
    
    // Format phone number (remove +)
    const formattedPhone = phoneNumber.replace('+', '');
    
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: formattedPhone,
        type: 'text',
        text: {
          preview_url: false,
          body: message
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('WhatsApp API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      error: error.response?.data || error.message 
    });
  }
});

// Send bulk WhatsApp messages
router.post('/send-bulk', async (req, res) => {
  try {
    const { phoneNumbers, message } = req.body;
    
    const results = await Promise.allSettled(
      phoneNumbers.map(phone => 
        axios.post('http://localhost:5000/api/whatsapp/send', {
          phoneNumber: phone,
          message
        })
      )
    );
    
    res.json({ 
      success: true, 
      sent: results.filter(r => r.status === 'fulfilled').length,
      failed: results.filter(r => r.status === 'rejected').length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;