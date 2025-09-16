const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      serviceInterest,
      subject,
      message,
      newsletter
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Create new contact submission
    const contact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      company,
      serviceInterest,
      subject,
      message,
      newsletter: newsletter || false,
      submittedAt: new Date(),
      status: 'new'
    });

    await contact.save();

    // In a real application, you might:
    // 1. Send an email notification to the admin
    // 2. Send a confirmation email to the user
    // 3. Add to a CRM system
    // 4. Trigger other business processes

    res.status(201).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      data: {
        id: contact._id,
        submittedAt: contact.submittedAt
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// @desc    Get all contact submissions (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || 'all';
    const sortBy = req.query.sortBy || 'submittedAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    // Build query
    let query = {};
    if (status !== 'all') {
      query.status = status;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder;

    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          limit
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single contact submission
// @route   GET /api/contact/:id
// @access  Private/Admin
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).select('-__v');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update contact status
// @route   PUT /api/contact/:id/status
// @access  Private/Admin
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'in-progress', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        updatedAt: new Date()
      },
      { new: true }
    ).select('-__v');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Delete contact submission
// @route   DELETE /api/contact/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Contact submission deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private/Admin
router.get('/admin/stats', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const inProgressContacts = await Contact.countDocuments({ status: 'in-progress' });
    const resolvedContacts = await Contact.countDocuments({ status: 'resolved' });

    // Get contacts from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentContacts = await Contact.countDocuments({
      submittedAt: { $gte: thirtyDaysAgo }
    });

    // Get most common service interests
    const serviceInterests = await Contact.aggregate([
      { $match: { serviceInterest: { $exists: true, $ne: null, $ne: '' } } },
      { $group: { _id: '$serviceInterest', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        total: totalContacts,
        byStatus: {
          new: newContacts,
          'in-progress': inProgressContacts,
          resolved: resolvedContacts,
          closed: totalContacts - newContacts - inProgressContacts - resolvedContacts
        },
        recent: recentContacts,
        topServiceInterests: serviceInterests
      }
    });

  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;