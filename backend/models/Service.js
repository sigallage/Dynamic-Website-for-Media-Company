const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200
  },
  icon: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  features: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['financial-audit', 'tax-services', 'consulting', 'compliance', 'specialized-services']
  },
  pricing: {
    startingPrice: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    priceType: {
      type: String,
      enum: ['fixed', 'hourly', 'project-based', 'custom'],
      default: 'custom'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);