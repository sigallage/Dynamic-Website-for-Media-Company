const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  clientCompany: {
    type: String,
    required: true,
    trim: true
  },
  clientPosition: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 500
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  clientImage: {
    type: String,
    default: ''
  },
  companyLogo: {
    type: String,
    default: ''
  },
  projectType: {
    type: String,
    required: true,
    enum: ['financial-audit', 'tax-consulting', 'compliance-review', 'business-advisory', 'other']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  dateOfService: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);