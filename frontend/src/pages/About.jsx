import { UserIcon, AcademicCapIcon, TrophyIcon, HeartIcon } from '@heroicons/react/24/outline';

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
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              About Elite Audit Solutions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              For over 15 years, we've been providing exceptional audit, tax, and consulting services 
              to businesses across all industries. Our commitment to excellence and client success 
              drives everything we do.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                To provide exceptional audit, tax, and consulting services that help businesses 
                achieve their financial goals while maintaining the highest standards of 
                compliance and ethical practice. We are committed to building lasting 
                relationships with our clients through personalized service and expert guidance.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                We believe that every business deserves access to top-tier financial expertise, 
                regardless of size or industry. Our mission is to democratize professional 
                financial services while never compromising on quality or attention to detail.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Vision
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                To be the most trusted and respected audit and consulting firm in our region, 
                known for our unwavering commitment to client success, professional excellence, 
                and innovative solutions to complex financial challenges.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                We envision a future where every business has the financial clarity and 
                strategic guidance needed to thrive in an increasingly complex business 
                environment. We aim to be the partner that helps make that vision a reality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              These values guide every decision we make and every relationship we build.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {values.map((value) => (
              <div key={value.name} className="bg-white rounded-lg p-8 shadow-sm">
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
                    <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">{value.name}</h3>
                </div>
                <p className="mt-4 text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet Our Expert Team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our team of certified professionals brings decades of combined experience 
              in audit, tax, and consulting services.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
                        <UserIcon className="h-12 w-12 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-primary-600 font-medium">{member.position}</p>
                      <p className="mt-2 text-sm text-gray-500">{member.education}</p>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-gray-600">{member.bio}</p>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Specializations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specializations.map((spec) => (
                        <span
                          key={spec}
                          className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800"
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
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Journey
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Over 15 years of growth, innovation, and client success.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600">
                      <span className="text-sm font-medium text-white">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg text-gray-900">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600">500+</div>
              <div className="mt-2 text-lg text-gray-600">Clients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">15+</div>
              <div className="mt-2 text-lg text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">1000+</div>
              <div className="mt-2 text-lg text-gray-600">Successful Audits</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">25+</div>
              <div className="mt-2 text-lg text-gray-600">Expert Professionals</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Partner with Elite Audit Solutions
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
              Join hundreds of businesses who trust us with their most important financial needs. 
              Let's discuss how we can help your business thrive.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Start a Conversation
              </a>
              <a href="/services" className="text-sm font-semibold leading-6 text-white">
                View our services <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}