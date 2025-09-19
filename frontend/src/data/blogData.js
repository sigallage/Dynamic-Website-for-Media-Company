// Shared blog data to ensure consistency between components
export const mockBlogPosts = [
  {
    id: 1,
    title: 'New SOX Compliance Requirements for 2024',
    slug: 'new-sox-compliance-requirements-2024',
    excerpt: 'Understanding the latest Sarbanes-Oxley compliance requirements and how they impact your business operations and financial reporting.',
    content: `
      <h2>Introduction to SOX Compliance Changes</h2>
      <p>The Sarbanes-Oxley Act continues to evolve, and 2024 brings significant updates that public companies must understand and implement. These changes reflect the ongoing commitment to corporate transparency and financial accountability.</p>
      
      <h2>Key Changes for 2024</h2>
      <p>The most significant updates include enhanced internal control documentation requirements, expanded cybersecurity disclosure mandates, and stricter certification processes for financial statements.</p>
      
      <h3>Enhanced Internal Control Documentation</h3>
      <p>Companies must now provide more detailed documentation of their internal control processes, including:</p>
      <ul>
        <li>Comprehensive risk assessment procedures</li>
        <li>Detailed control activity documentation</li>
        <li>Enhanced monitoring and reporting mechanisms</li>
        <li>Clear segregation of duties matrices</li>
      </ul>
      
      <h3>Cybersecurity Disclosure Requirements</h3>
      <p>New provisions require companies to disclose material cybersecurity incidents and their potential impact on financial reporting within specified timeframes.</p>
      
      <h2>Implementation Timeline</h2>
      <p>Public companies have until December 31, 2024, to fully implement these new requirements. However, we recommend beginning preparation immediately to ensure compliance.</p>
      
      <h2>Best Practices for Compliance</h2>
      <p>To ensure smooth compliance with the new requirements, consider the following best practices:</p>
      
      <ol>
        <li><strong>Conduct a Gap Analysis:</strong> Review current processes against new requirements</li>
        <li><strong>Update Policies and Procedures:</strong> Revise existing documentation to meet new standards</li>
        <li><strong>Enhance Training Programs:</strong> Ensure all relevant personnel understand the changes</li>
        <li><strong>Implement Regular Testing:</strong> Establish ongoing testing procedures for internal controls</li>
      </ol>
      
      <h2>How We Can Help</h2>
      <p>At Elite Audit Solutions, we specialize in helping companies navigate complex compliance requirements. Our team of experienced professionals can assist with:</p>
      
      <ul>
        <li>SOX compliance assessment and gap analysis</li>
        <li>Internal control design and implementation</li>
        <li>Ongoing compliance monitoring and testing</li>
        <li>Remediation of control deficiencies</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The new SOX compliance requirements for 2024 represent a significant step forward in corporate accountability. While challenging, proper preparation and expert guidance can ensure your organization remains compliant while maintaining operational efficiency.</p>
      
      <p>For more information about how these changes might affect your organization, or to schedule a compliance assessment, please contact our team.</p>
    `,
    category: 'compliance',
    tags: ['SOX', 'Compliance', 'Financial Reporting', 'Internal Controls'],
    author: { 
      name: 'Sarah Johnson',
      title: 'Managing Partner & CPA',
      bio: 'Sarah has over 20 years of experience in auditing and financial consulting, with particular expertise in SOX compliance and regulatory requirements.'
    },
    publishedDate: '2024-03-15',
    views: 1245,
    featuredImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    status: 'published'
  },
  {
    id: 2,
    title: 'Tax Planning Strategies for Small Businesses',
    slug: 'tax-planning-strategies-small-businesses',
    excerpt: 'Discover effective tax planning strategies that can help small businesses reduce their tax burden while maintaining compliance.',
    content: `
      <h2>Introduction to Tax Planning</h2>
      <p>Effective tax planning is crucial for small businesses looking to optimize their financial performance and ensure compliance with tax regulations. This comprehensive guide outlines key strategies that can help reduce your tax burden legally and efficiently.</p>
      
      <h2>Business Structure Optimization</h2>
      <p>Choosing the right business structure can significantly impact your tax liability. Consider these options:</p>
      <ul>
        <li><strong>S Corporation:</strong> Pass-through taxation with potential payroll tax savings</li>
        <li><strong>LLC:</strong> Flexibility in tax treatment and business operations</li>
        <li><strong>Partnership:</strong> Pass-through taxation for multi-owner businesses</li>
      </ul>
      
      <h2>Deduction Strategies</h2>
      <p>Maximize your deductions by tracking and claiming all eligible business expenses:</p>
      <ul>
        <li>Home office expenses</li>
        <li>Business travel and meals</li>
        <li>Professional development and training</li>
        <li>Equipment and technology purchases</li>
      </ul>
      
      <h2>Timing Strategies</h2>
      <p>Strategic timing of income and expenses can help manage your tax liability across multiple years.</p>
      
      <h2>Conclusion</h2>
      <p>Implementing these tax planning strategies requires careful consideration of your specific business circumstances. Consult with a tax professional to ensure optimal results.</p>
    `,
    category: 'tax-updates',
    tags: ['Tax Planning', 'Small Business', 'Strategy'],
    author: { 
      name: 'Michael Chen',
      title: 'Senior Tax Advisor',
      bio: 'Michael specializes in small business tax planning and has helped hundreds of entrepreneurs optimize their tax strategies.'
    },
    publishedDate: '2024-03-10',
    views: 892,
    featuredImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
    status: 'published'
  },
  {
    id: 3,
    title: 'The Future of Financial Auditing: Technology Trends',
    slug: 'future-financial-auditing-technology-trends',
    excerpt: 'Exploring how artificial intelligence, automation, and data analytics are transforming the audit industry.',
    content: `
      <h2>The Digital Transformation of Auditing</h2>
      <p>The auditing profession is experiencing a technological revolution that promises to enhance accuracy, efficiency, and insight generation. This transformation is reshaping how auditors approach their work and deliver value to clients.</p>
      
      <h2>Artificial Intelligence in Auditing</h2>
      <p>AI technologies are revolutionizing audit processes through:</p>
      <ul>
        <li>Automated risk assessment and anomaly detection</li>
        <li>Intelligent document review and analysis</li>
        <li>Predictive analytics for fraud detection</li>
        <li>Natural language processing for contract analysis</li>
      </ul>
      
      <h2>Data Analytics and Continuous Monitoring</h2>
      <p>Advanced analytics enable auditors to:</p>
      <ul>
        <li>Test entire populations rather than samples</li>
        <li>Identify patterns and trends in real-time</li>
        <li>Provide continuous assurance throughout the year</li>
      </ul>
      
      <h2>Future Implications</h2>
      <p>These technological advances will lead to more efficient audits, better risk identification, and enhanced audit quality while allowing auditors to focus on higher-value advisory services.</p>
    `,
    category: 'audit-insights',
    tags: ['Technology', 'AI', 'Audit Innovation'],
    author: { 
      name: 'Emily Rodriguez',
      title: 'Director of Audit Technology',
      bio: 'Emily leads our technology initiatives and has extensive experience in implementing innovative audit solutions.'
    },
    publishedDate: '2024-03-08',
    views: 1567,
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    status: 'published'
  },
  {
    id: 4,
    title: 'Understanding Internal Controls: A Complete Guide',
    slug: 'understanding-internal-controls-complete-guide',
    excerpt: 'A comprehensive guide to implementing and maintaining effective internal controls in your organization.',
    content: `
      <h2>What Are Internal Controls?</h2>
      <p>Internal controls are processes, policies, and procedures designed to provide reasonable assurance regarding the achievement of objectives in operational effectiveness, reliable financial reporting, and compliance with laws and regulations.</p>
      
      <h2>Types of Internal Controls</h2>
      <h3>Preventive Controls</h3>
      <p>These controls are designed to prevent errors or irregularities from occurring. Examples include:</p>
      <ul>
        <li>Authorization requirements for transactions</li>
        <li>Segregation of duties</li>
        <li>Physical safeguards over assets</li>
      </ul>
      
      <h3>Detective Controls</h3>
      <p>These controls are designed to identify errors or irregularities after they have occurred:</p>
      <ul>
        <li>Reconciliations</li>
        <li>Review and approval processes</li>
        <li>Exception reporting</li>
      </ul>
      
      <h2>Implementation Best Practices</h2>
      <p>Successful implementation requires careful planning, stakeholder buy-in, and ongoing monitoring to ensure effectiveness.</p>
      
      <h2>Conclusion</h2>
      <p>Effective internal controls are essential for protecting your organization's assets and ensuring reliable financial reporting.</p>
    `,
    category: 'business-tips',
    tags: ['Internal Controls', 'Risk Management', 'Best Practices'],
    author: { 
      name: 'David Thompson',
      title: 'Risk Management Consultant',
      bio: 'David specializes in helping organizations design and implement effective internal control systems.'
    },
    publishedDate: '2024-03-05',
    views: 734,
    featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    status: 'published'
  },
  {
    id: 5,
    title: 'Industry Update: New Accounting Standards',
    slug: 'industry-update-new-accounting-standards',
    excerpt: 'Latest updates on new accounting standards and their implications for businesses across different industries.',
    content: `
      <h2>Overview of New Standards</h2>
      <p>The Financial Accounting Standards Board (FASB) has issued several new accounting standards that will impact how businesses record and report financial transactions.</p>
      
      <h2>Key Changes</h2>
      <h3>Revenue Recognition</h3>
      <p>The new revenue recognition standard provides a comprehensive framework for recognizing revenue from contracts with customers.</p>
      
      <h3>Lease Accounting</h3>
      <p>Significant changes to how organizations account for leases, particularly operating leases that were previously off-balance-sheet.</p>
      
      <h2>Implementation Timeline</h2>
      <p>Different standards have different effective dates. It's crucial to plan ahead for compliance.</p>
      
      <h2>Impact on Your Business</h2>
      <p>These changes may affect financial ratios, debt covenants, and internal processes. Early preparation is key to successful implementation.</p>
    `,
    category: 'industry-news',
    tags: ['GAAP', 'Standards', 'Industry Update'],
    author: { 
      name: 'Sarah Johnson',
      title: 'Managing Partner & CPA',
      bio: 'Sarah has extensive experience helping companies navigate accounting standard changes and their implementation.'
    },
    publishedDate: '2024-03-01',
    views: 456,
    featuredImage: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=800&h=400&fit=crop',
    status: 'published'
  },
  {
    id: 6,
    title: 'Preparing for Year-End Audit: Essential Checklist',
    slug: 'preparing-year-end-audit-essential-checklist',
    excerpt: 'A comprehensive checklist to help organizations prepare for their year-end audit and ensure a smooth process.',
    content: `
      <h2>Pre-Audit Preparation</h2>
      <p>Proper preparation is essential for a successful audit. Starting early can help identify and resolve issues before the auditors arrive.</p>
      
      <h2>Essential Checklist Items</h2>
      <h3>Financial Records</h3>
      <ul>
        <li>Ensure all transactions are properly recorded</li>
        <li>Complete month-end and year-end closing procedures</li>
        <li>Reconcile all balance sheet accounts</li>
        <li>Prepare detailed account analyses</li>
      </ul>
      
      <h3>Supporting Documentation</h3>
      <ul>
        <li>Gather contracts and agreements</li>
        <li>Organize invoices and receipts</li>
        <li>Prepare loan agreements and debt schedules</li>
        <li>Compile legal correspondence</li>
      </ul>
      
      <h3>Internal Controls</h3>
      <ul>
        <li>Document key processes and controls</li>
        <li>Test control effectiveness</li>
        <li>Address any control deficiencies</li>
      </ul>
      
      <h2>Working with Your Auditors</h2>
      <p>Clear communication and prompt responses to auditor requests help ensure an efficient audit process.</p>
      
      <h2>Common Challenges</h2>
      <p>Being aware of common audit challenges can help you prepare more effectively and avoid delays.</p>
    `,
    category: 'audit-insights',
    tags: ['Year-End Audit', 'Checklist', 'Preparation'],
    author: { 
      name: 'Emily Rodriguez',
      title: 'Senior Audit Manager',
      bio: 'Emily has led numerous year-end audits and specializes in helping clients prepare for efficient audit processes.'
    },
    publishedDate: '2024-02-28',
    views: 1123,
    featuredImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    status: 'published'
  }
];

// Convert array to object for easy lookup by slug
export const mockBlogPostsMap = mockBlogPosts.reduce((acc, post) => {
  acc[post.slug] = post;
  return acc;
}, {});

// Related posts data
export const relatedPosts = [
  {
    id: 2,
    title: 'Understanding Internal Controls: A Complete Guide',
    slug: 'understanding-internal-controls-complete-guide',
    excerpt: 'A comprehensive guide to implementing and maintaining effective internal controls in your organization.',
    publishedDate: '2024-03-05'
  },
  {
    id: 3,
    title: 'Preparing for Year-End Audit: Essential Checklist',
    slug: 'preparing-year-end-audit-essential-checklist',
    excerpt: 'A comprehensive checklist to help organizations prepare for their year-end audit and ensure a smooth process.',
    publishedDate: '2024-02-28'
  },
  {
    id: 4,
    title: 'The Future of Financial Auditing: Technology Trends',
    slug: 'future-financial-auditing-technology-trends',
    excerpt: 'Exploring how artificial intelligence, automation, and data analytics are transforming the audit industry.',
    publishedDate: '2024-03-08'
  }
];