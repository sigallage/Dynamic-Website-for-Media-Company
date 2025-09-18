require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleContacts = [
  {
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1-555-0123',
    company: 'TechCorp Solutions',
    subject: 'Compliance Audit Services',
    message: 'We need a comprehensive compliance audit for our financial services division. Our company handles sensitive customer data and we want to ensure we meet all regulatory requirements.',
    serviceInterest: 'compliance',
    status: 'new',
    newsletter: true
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@healthsystems.org',
    phone: '+1-555-0156',
    company: 'HealthSystems Inc',
    subject: 'Financial Audit Required',
    message: 'Our organization requires an annual financial audit. We are a mid-size healthcare provider with multiple locations and need experienced auditors.',
    serviceInterest: 'financial-audit',
    status: 'in-progress',
    newsletter: false
  },
  {
    name: 'Michael Brown',
    email: 'michael.brown@globalretail.com',
    phone: '+1-555-0198',
    company: 'Global Retail Chain',
    subject: 'Internal Audit Consulting',
    message: 'Looking for consulting services to establish internal audit processes across our retail operations. We have 150+ locations nationwide.',
    serviceInterest: 'consulting',
    status: 'resolved',
    newsletter: true
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@startup.io',
    phone: '+1-555-0187',
    company: 'InnovateStartup',
    subject: 'Risk Assessment Services',
    message: 'As a growing fintech startup, we need professional risk assessment to identify potential vulnerabilities in our operations and technology infrastructure.',
    serviceInterest: 'consulting',
    status: 'new',
    newsletter: true
  },
  {
    name: 'Robert Wilson',
    email: 'robert.wilson@manufacturing.com',
    phone: '+1-555-0165',
    company: 'Wilson Manufacturing',
    subject: 'Tax Services Request',
    message: 'We require comprehensive tax planning and preparation services for our manufacturing business with multiple state operations.',
    serviceInterest: 'tax-services',
    status: 'in-progress',
    newsletter: false
  },
  {
    name: 'Lisa Anderson',
    email: 'lisa.anderson@nonprofit.org',
    company: 'Community Foundation',
    subject: 'Grant Compliance Review',
    message: 'Our nonprofit needs assistance with grant compliance reviews and ensuring proper use of allocated funds according to donor requirements.',
    serviceInterest: 'compliance',
    status: 'closed',
    newsletter: true
  },
  {
    name: 'David Martinez',
    email: 'david.martinez@realestate.com',
    phone: '+1-555-0143',
    company: 'Premier Real Estate',
    subject: 'Financial Due Diligence',
    message: 'We have several large property acquisitions pending and need thorough financial due diligence audits before proceeding with the transactions.',
    serviceInterest: 'financial-audit',
    status: 'resolved',
    newsletter: false
  },
  {
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@consulting.com',
    phone: '+1-555-0192',
    company: 'Strategic Consulting Group',
    subject: 'Partnership Opportunity',
    message: 'We are interested in exploring potential partnership opportunities between our consulting firms to better serve mutual clients.',
    serviceInterest: 'other',
    status: 'new',
    newsletter: true
  }
];

async function seedContacts() {
  try {
    // Clear existing contacts
    await Contact.deleteMany({});
    console.log('Cleared existing contacts');

    // Add sample contacts
    for (const contactData of sampleContacts) {
      const contact = new Contact(contactData);
      await contact.save();
      console.log(`Added contact: ${contact.firstName} ${contact.lastName}`);
    }

    console.log('Successfully seeded contact data');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding contacts:', error);
    process.exit(1);
  }
}

seedContacts();