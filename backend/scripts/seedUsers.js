require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@eliteaudit.com',
    password: 'admin123',
    role: 'admin',
    isActive: true
  },
  {
    name: 'John Smith',
    email: 'john.smith@eliteaudit.com',
    password: 'password123',
    role: 'admin',
    isActive: true
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@eliteaudit.com',
    password: 'password123',
    role: 'user',
    isActive: true
  },
  {
    name: 'Michael Brown',
    email: 'michael.brown@eliteaudit.com',
    password: 'password123',
    role: 'user',
    isActive: false
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@eliteaudit.com',
    password: 'password123',
    role: 'user',
    isActive: true
  },
  {
    name: 'Robert Wilson',
    email: 'robert.wilson@eliteaudit.com',
    password: 'password123',
    role: 'admin',
    isActive: true
  },
  {
    name: 'Lisa Anderson',
    email: 'lisa.anderson@eliteaudit.com',
    password: 'password123',
    role: 'user',
    isActive: true
  },
  {
    name: 'David Martinez',
    email: 'david.martinez@eliteaudit.com',
    password: 'password123',
    role: 'user',
    isActive: true
  },
  {
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@eliteaudit.com',
    password: 'password123',
    role: 'user',
    isActive: false
  },
  {
    name: 'Mark Johnson',
    email: 'mark.johnson@eliteaudit.com',
    password: 'password123',
    role: 'user',
    isActive: true
  }
];

async function seedUsers() {
  try {
    // Clear existing users except the main admin
    await User.deleteMany({ email: { $ne: 'admin@eliteaudit.com' } });
    console.log('Cleared existing users (except main admin)');

    // Add sample users
    for (const userData of sampleUsers) {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: userData.email });
        if (!existingUser) {
          const user = new User(userData);
          await user.save();
          console.log(`Added user: ${user.name} (${user.email})`);
        } else {
          console.log(`User already exists: ${userData.email}`);
        }
      } catch (error) {
        if (error.code === 11000) {
          console.log(`User already exists: ${userData.email}`);
        } else {
          console.error(`Error adding user ${userData.email}:`, error.message);
        }
      }
    }

    console.log('Successfully seeded user data');
    
    // Display summary
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    
    console.log(`\nSummary:`);
    console.log(`Total users: ${totalUsers}`);
    console.log(`Active users: ${activeUsers}`);
    console.log(`Admin users: ${adminUsers}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers();