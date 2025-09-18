const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

// Get all users (Admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, role, status } = req.query;
    
    // Build query
    let query = {};
    
    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by role
    if (role && role !== 'all') {
      query.role = role;
    }
    
    // Filter by status
    if (status && status !== 'all') {
      query.isActive = status === 'active';
    }
    
    // Execute query with pagination
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await User.countDocuments(query);
    
    // Get statistics
    const stats = {
      total: await User.countDocuments(),
      active: await User.countDocuments({ isActive: true }),
      inactive: await User.countDocuments({ isActive: false }),
      admins: await User.countDocuments({ role: 'admin' }),
      users: await User.countDocuments({ role: 'user' })
    };
    
    res.json({
      success: true,
      data: {
        users,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        },
        stats
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get user by ID (Admin only)
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Create new user (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    // Create user
    const user = new User({
      name,
      email,
      password,
      role
    });
    
    await user.save();
    
    // Return user without password
    const userResponse = await User.findById(user._id).select('-password');
    
    res.status(201).json({
      success: true,
      data: userResponse,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update user (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, email, role, isActive } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Don't allow changing the main admin user's role or status
    if (user.email === 'admin@eliteaudit.com' && (role !== 'admin' || isActive === false)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot modify main admin user'
      });
    }
    
    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (typeof isActive === 'boolean') user.isActive = isActive;
    
    await user.save();
    
    // Return updated user without password
    const updatedUser = await User.findById(user._id).select('-password');
    
    res.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update user role (Admin only)
router.put('/:id/role', adminAuth, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Don't allow changing the main admin user's role
    if (user.email === 'admin@eliteaudit.com' && role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Cannot change main admin user role'
      });
    }
    
    user.role = role;
    await user.save();
    
    res.json({
      success: true,
      data: { role: user.role },
      message: 'User role updated successfully'
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update user status (Admin only)
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { isActive } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Don't allow deactivating the main admin user
    if (user.email === 'admin@eliteaudit.com' && !isActive) {
      return res.status(400).json({
        success: false,
        message: 'Cannot deactivate main admin user'
      });
    }
    
    user.isActive = isActive;
    await user.save();
    
    res.json({
      success: true,
      data: { isActive: user.isActive },
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Delete user (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Don't allow deleting the main admin user
    if (user.email === 'admin@eliteaudit.com') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete main admin user'
      });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get user statistics (Admin only)
router.get('/admin/stats', adminAuth, async (req, res) => {
  try {
    const stats = {
      total: await User.countDocuments(),
      active: await User.countDocuments({ isActive: true }),
      inactive: await User.countDocuments({ isActive: false }),
      admins: await User.countDocuments({ role: 'admin' }),
      users: await User.countDocuments({ role: 'user' }),
      recentUsers: await User.find()
        .select('-password')
        .sort({ createdAt: -1 })
        .limit(5)
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;