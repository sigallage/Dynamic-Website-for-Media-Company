import { UserIcon, AcademicCapIcon, TrophyIcon, HeartIcon } from '@heroicons/react/24/outline';
import '../styles/about.css';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    position: 'Managing Partner & CPA',
    bio: 'With over 20 years of experience in auditing and financial consulting, Sarah leads our team with expertise in complex financial audits and regulatory compliance.',
    image: '/api/placeholder/300/300',
    education: 'MBA Finance, CPA',
    specializations: ['Financial Audits', 'SOX Compliance', 'Risk Management']
  },
  {
    name: 'Michael Chen',
    position: 'Senior Tax Partner',
    bio: 'Michael specializes in corporate tax planning and international tax compliance, helping businesses navigate complex tax regulations while optimizing their tax positions.',
    image: '/api/placeholder/300/300',
    education: 'MS Taxation, CPA',
    specializations: ['Corporate Tax', 'International Tax', 'Tax Planning']
  },
  {
    name: 'Emily Rodriguez',
    position: 'Audit Manager',
    bio: 'Emily brings 12 years of audit experience across various industries, with particular expertise in technology companies and startup financial audits.',
    image: '/api/placeholder/300/300',
    education: 'BS Accounting, CPA',
    specializations: ['Technology Audits', 'Startup Advisory', 'Internal Controls']
  },
  {
    name: 'David Thompson',
    position: 'Senior Consultant',
    bio: 'David provides strategic business consulting services, helping organizations improve operational efficiency and implement best practices in financial management.',
    image: '/api/placeholder/300/300',
    education: 'MBA Operations, CMA',
    specializations: ['Business Process', 'Financial Analysis', 'Performance Improvement']
  }
];

const values = [
  {
    name: 'Integrity',
    description: 'We maintain the highest ethical standards in all our professional relationships and business practices.',
    icon: HeartIcon
  },
  {
    name: 'Excellence',
    description: 'We strive for excellence in every engagement, delivering quality services that exceed client expectations.',
    icon: TrophyIcon
  },
  {
    name: 'Expertise',
    description: 'Our team continuously develops deep industry knowledge and technical expertise to serve clients better.',
    icon: AcademicCapIcon
  },
  {
    name: 'Client Focus',
    description: 'We prioritize our clients\' needs and work collaboratively to achieve their business objectives.',
    icon: UserIcon
  }
];

const milestones = [
  { year: '2009', event: 'Founded Elite Audit Solutions with a vision to provide personalized audit services' },
  { year: '2012', event: 'Expanded services to include comprehensive tax planning and preparation' },
  { year: '2015', event: 'Achieved recognition as a top-rated audit firm in the region' },
  { year: '2018', event: 'Added business consulting services and grew team to 15+ professionals' },
  { year: '2020', event: 'Successfully guided 200+ clients through pandemic-related compliance challenges' },
  { year: '2022', event: 'Expanded to serve Fortune 500 companies while maintaining boutique service quality' },
  { year: '2024', event: 'Celebrating 15 years of excellence with 500+ satisfied clients' }
];

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-container">
          <div className="about-hero-content">
            <h1 className="about-hero-title">
              About Elite Audit Solutions
            </h1>
            <p className="about-hero-description">
              For over 15 years, we've been providing exceptional audit, tax, and consulting services 
              to businesses across all industries. Our commitment to excellence and client success 
              drives everything we do.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="mission-vision-section">
        <div className="mission-vision-container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <h2 className="mission-title">
                Our Mission
              </h2>
              <p className="mission-description">
                To provide exceptional audit, tax, and consulting services that help businesses 
                achieve their financial goals while maintaining the highest standards of 
                compliance and ethical practice. We are committed to building lasting 
                relationships with our clients through personalized service and expert guidance.
              </p>
              <p className="mission-description">
                We believe that every business deserves access to top-tier financial expertise, 
                regardless of size or industry. Our mission is to democratize professional 
                financial services while never compromising on quality or attention to detail.
              </p>
            </div>
            
            <div className="vision-card">
              <h2 className="vision-title">
                Our Vision
              </h2>
              <p className="vision-description">
                To be the most trusted and respected audit and consulting firm in our region, 
                known for our unwavering commitment to client success, professional excellence, 
                and innovative solutions to complex financial challenges.
              </p>
              <p className="vision-description">
                We envision a future where every business has the financial clarity and 
                strategic guidance needed to thrive in an increasingly complex business 
                environment. We aim to be the partner that helps make that vision a reality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <div className="values-container">
          <div className="values-header">
            <h2 className="values-title">
              Our Core Values
            </h2>
            <p className="values-description">
              These values guide every decision we make and every relationship we build.
            </p>
          </div>
          
          <div className="values-grid">
            {values.map((value) => (
              <div key={value.name} className="value-card">
                <div className="value-header">
                  <div className="value-icon-container">
                    <value.icon className="value-icon" aria-hidden="true" />
                  </div>
                  <h3 className="value-name">{value.name}</h3>
                </div>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <div className="team-container">
          <div className="team-header">
            <h2 className="team-title">
              Meet Our Expert Team
            </h2>
            <p className="team-description">
              Our team of certified professionals brings decades of combined experience 
              in audit, tax, and consulting services.
            </p>
          </div>
          
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.name} className="team-member-card">
                <div className="team-member-content">
                  <div className="team-member-header">
                    <div className="team-member-avatar">
                      <UserIcon className="team-member-avatar-icon" />
                    </div>
                    <div className="team-member-info">
                      <h3 className="team-member-name">{member.name}</h3>
                      <p className="team-member-position">{member.position}</p>
                      <p className="team-member-education">{member.education}</p>
                    </div>
                  </div>
                  
                  <p className="team-member-bio">{member.bio}</p>
                  
                  <div className="team-member-specializations">
                    <h4 className="specializations-title">Specializations:</h4>
                    <div className="specializations-list">
                      {member.specializations.map((spec) => (
                        <span
                          key={spec}
                          className="specialization-tag"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company History Timeline */}
      <div className="timeline-section">
        <div className="timeline-container">
          <div className="timeline-header">
            <h2 className="timeline-title">
              Our Journey
            </h2>
            <p className="timeline-description">
              Over 15 years of growth, innovation, and client success.
            </p>
          </div>
          
          <div className="timeline-content">
            <div className="timeline-list">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="timeline-item">
                  <div className="timeline-year-container">
                    <span className="timeline-year">{milestone.year}</span>
                  </div>
                  <div className="timeline-event">
                    <p>{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Clients Served</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Successful Audits</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Expert Professionals</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="about-cta-section">
        <div className="about-cta-container">
          <div className="about-cta-content">
            <h2 className="about-cta-title">
              Partner with Elite Audit Solutions
            </h2>
            <p className="about-cta-description">
              Join hundreds of businesses who trust us with their most important financial needs. 
              Let's discuss how we can help your business thrive.
            </p>
            <div className="about-cta-buttons">
              <a
                href="/contact"
                className="about-cta-primary"
              >
                Start a Conversation
              </a>
              <a href="/services" className="about-cta-secondary">
                View our services <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}