/**
 * Seed the 4 TrishulHub founders with full profile data + admin credentials.
 * Run with: bun run /home/z/my-project/scripts/seed-founders.ts
 */
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const founders = [
  {
    slug: 'kiran',
    name: 'Kiran',
    initial: 'K',
    role: 'Fullstack Developer',
    bio: 'Fullstack developer with deep expertise in React, Node.js, and modern web technologies. Passionate about building scalable solutions that drive business growth. From clean architecture to pixel-perfect UI, Kiran ships production-grade products end-to-end.',
    projects: '50+',
    image: null,
    dateOfBirth: 'January 15, 1998',
    address: 'Rajkot, Gujarat, India',
    zipCode: '360001',
    email: 'kiran@trishulhub.com',
    phone: '+91 98765 43210',
    origin: 'Rajkot, Gujarat, India',
    github: 'https://github.com/kiran',
    linkedin: 'https://linkedin.com/in/kiran',
    twitter: 'https://twitter.com/kiran',
    website: 'https://trishulhub.com',
    skills: JSON.stringify([
      { name: 'React / Next.js', level: 95 },
      { name: 'Node.js / Bun', level: 92 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'PostgreSQL / Prisma', level: 88 },
      { name: 'DevOps / Docker', level: 80 },
    ]),
    education: JSON.stringify([
      {
        degree: 'B.E. Computer Engineering',
        school: 'Atmiya University, Rajkot',
        year: '2016 - 2020',
        description: 'Graduated with distinction. Specialised in web technologies and distributed systems. Final-year project on real-time collaboration platforms won the state-level innovation award.',
      },
      {
        degree: 'Full Stack Web Development Bootcamp',
        school: 'Coding Ninjas',
        year: '2020',
        description: 'Intensive 6-month program covering MERN stack, system design, and production deployment.',
      },
    ]),
    experience: JSON.stringify([
      {
        role: 'Fullstack Developer',
        company: 'TrishulHub',
        period: '2022 - Present',
        description: 'Lead developer on 50+ client projects spanning e-commerce, SaaS dashboards, and marketing sites. Architected the company\'s internal CRM used across 4 teams.',
      },
      {
        role: 'Junior Developer',
        company: 'Freelance',
        period: '2020 - 2022',
        description: 'Built MVPs for early-stage startups. Specialised in converting Figma designs into performant React apps within tight deadlines.',
      },
    ]),
    projectsList: JSON.stringify([
      {
        name: 'TrishulHub CRM',
        description: 'Internal CRM managing 50+ client projects, billing, and team allocation.',
        link: 'https://trishulhub.com',
        year: '2024',
      },
      {
        name: 'Kadam Production',
        description: 'E-commerce platform for a media production house with 4K video delivery.',
        link: '#',
        year: '2024',
      },
      {
        name: 'Nipstudy',
        description: 'EdTech platform with live classes, recordings, and progress tracking.',
        link: '#',
        year: '2023',
      },
    ]),
    username: 'kiran',
    password: 'kiran123',
  },
  {
    slug: 'taroon',
    name: 'Taroon',
    initial: 'T',
    role: 'CEO & Co-Founder',
    bio: 'Visionary leader driving TrishulHub\'s strategic growth. Specialises in business strategy, team building, and client relations with a relentless focus on delivering excellence. Taroon sets the company direction and ensures every project exceeds client expectations.',
    projects: '40+',
    image: null,
    dateOfBirth: 'March 22, 1996',
    address: 'Rajkot, Gujarat, India',
    zipCode: '360001',
    email: 'taroon@trishulhub.com',
    phone: '+91 98765 11111',
    origin: 'Rajkot, Gujarat, India',
    github: 'https://github.com/taroon',
    linkedin: 'https://linkedin.com/in/taroon',
    twitter: 'https://twitter.com/taroon',
    website: 'https://trishulhub.com',
    skills: JSON.stringify([
      { name: 'Business Strategy', level: 95 },
      { name: 'Team Leadership', level: 93 },
      { name: 'Client Relations', level: 96 },
      { name: 'Project Management', level: 90 },
      { name: 'Product Vision', level: 88 },
      { name: 'Public Speaking', level: 85 },
    ]),
    education: JSON.stringify([
      {
        degree: 'B.B.A. Business Administration',
        school: 'Saurashtra University',
        year: '2014 - 2017',
        description: 'Graduated top of class. President of the entrepreneurship cell. Led two state-level business plan competitions.',
      },
      {
        degree: 'M.B.A. Marketing & Strategy',
        school: 'IIM Bangalore',
        year: '2017 - 2019',
        description: 'Specialised in digital business models. Thesis on "Scaling Services Agencies in Tier-2 Indian Cities".',
      },
    ]),
    experience: JSON.stringify([
      {
        role: 'CEO & Co-Founder',
        company: 'TrishulHub',
        period: '2022 - Present',
        description: 'Founded TrishulHub with 3 co-founders. Grew revenue 4x in 2 years. Built a 12-person team across dev, design, and ops.',
      },
      {
        role: 'Business Consultant',
        company: 'Self-employed',
        period: '2019 - 2022',
        description: 'Advised 20+ SMEs on digital transformation, marketing automation, and online brand strategy.',
      },
    ]),
    projectsList: JSON.stringify([
      {
        name: 'TrishulHub Launch',
        description: 'Led the company launch — branding, positioning, and first 10 enterprise clients.',
        link: 'https://trishulhub.com',
        year: '2022',
      },
      {
        name: 'UK Store Demo',
        description: 'Strategic partnership with UK retailer to build a Shopify-style e-commerce demo.',
        link: '#',
        year: '2025',
      },
      {
        name: 'The Creative Master',
        description: 'Brand identity + website for a creative agency client.',
        link: '#',
        year: '2024',
      },
    ]),
    username: 'taroon',
    password: 'taroon123',
  },
  {
    slug: 'akshat',
    name: 'Akshat',
    initial: 'A',
    role: 'Fullstack Developer & SMM Lead',
    bio: 'Bridging development and marketing with expertise in React, SEO, and social media strategy. Akshat creates integrated solutions that maximise digital impact — from rank-1 SEO content to viral social campaigns, all backed by clean, maintainable code.',
    projects: '45+',
    image: null,
    dateOfBirth: 'July 09, 1999',
    address: 'Rajkot, Gujarat, India',
    zipCode: '360001',
    email: 'akshat@trishulhub.com',
    phone: '+91 98765 22222',
    origin: 'Rajkot, Gujarat, India',
    github: 'https://github.com/akshat',
    linkedin: 'https://linkedin.com/in/akshat',
    twitter: 'https://twitter.com/akshat',
    website: 'https://trishulhub.com',
    skills: JSON.stringify([
      { name: 'React / Next.js', level: 93 },
      { name: 'Social Media Marketing', level: 95 },
      { name: 'SEO / Analytics', level: 90 },
      { name: 'Content Strategy', level: 88 },
      { name: 'TypeScript', level: 87 },
      { name: 'Meta / Google Ads', level: 85 },
    ]),
    education: JSON.stringify([
      {
        degree: 'B.C.A. Computer Applications',
        school: 'Marwadi University, Rajkot',
        year: '2017 - 2020',
        description: 'Graduated with honours. Built the college\'s first student-led tech community with 500+ members.',
      },
      {
        degree: 'Digital Marketing Specialist Certification',
        school: 'Google Digital Garage',
        year: '2021',
        description: 'Certified in SEO, SEM, social media strategy, and Google Analytics.',
      },
    ]),
    experience: JSON.stringify([
      {
        role: 'Fullstack Dev & SMM Lead',
        company: 'TrishulHub',
        period: '2022 - Present',
        description: 'Leads both dev and marketing initiatives. Shipped 45+ client projects and ran social campaigns that grew combined client followers by 2M+.',
      },
      {
        role: 'Social Media Manager',
        company: 'Freelance',
        period: '2020 - 2022',
        description: 'Managed social accounts for 15+ brands across tech, fashion, and food verticals. Average engagement rate of 6.4%.',
      },
    ]),
    projectsList: JSON.stringify([
      {
        name: 'TrishulHub Social Strategy',
        description: 'Grew TrishulHub\'s Instagram from 0 to 25K followers in 8 months with zero paid spend.',
        link: 'https://trishulhub.com',
        year: '2024',
      },
      {
        name: 'The Creative Master Site',
        description: 'Built a high-converting portfolio site + Instagram funnel for a creative agency.',
        link: '#',
        year: '2024',
      },
      {
        name: 'Kadam Production Marketing',
        description: 'SEO + content strategy that brought 40% organic traffic growth in 3 months.',
        link: '#',
        year: '2024',
      },
    ]),
    username: 'akshat',
    password: 'akshat123',
  },
  {
    slug: 'pruthvi',
    name: 'Pruthvi',
    initial: 'P',
    role: 'Management & Operations Head',
    bio: 'Operations expert ensuring smooth project delivery through agile methodologies, effective communication, and strong client relationships. Pruthvi keeps every TrishulHub project on time, on budget, and on spec.',
    projects: '35+',
    image: null,
    dateOfBirth: 'November 30, 1997',
    address: 'Rajkot, Gujarat, India',
    zipCode: '360001',
    email: 'pruthvi@trishulhub.com',
    phone: '+91 98765 33333',
    origin: 'Rajkot, Gujarat, India',
    github: 'https://github.com/pruthvi',
    linkedin: 'https://linkedin.com/in/pruthvi',
    twitter: 'https://twitter.com/pruthvi',
    website: 'https://trishulhub.com',
    skills: JSON.stringify([
      { name: 'Agile / Scrum', level: 95 },
      { name: 'Operations Management', level: 93 },
      { name: 'Client Communication', level: 92 },
      { name: 'Resource Planning', level: 90 },
      { name: 'Jira / Notion / Asana', level: 94 },
      { name: 'Financial Planning', level: 85 },
    ]),
    education: JSON.stringify([
      {
        degree: 'B.Com Commerce',
        school: 'Saurashtra University',
        year: '2015 - 2018',
        description: 'Graduated with distinction. Specialised in business finance and operations management.',
      },
      {
        degree: 'PMP Certification',
        school: 'Project Management Institute',
        year: '2021',
        description: 'Certified Project Management Professional. Trained in agile, waterfall, and hybrid methodologies.',
      },
    ]),
    experience: JSON.stringify([
      {
        role: 'Operations Head',
        company: 'TrishulHub',
        period: '2022 - Present',
        description: 'Manages day-to-day operations across 4 teams. Reduced average project delivery time by 28% through process optimisation.',
      },
      {
        role: 'Project Coordinator',
        company: 'Tech Mahindra',
        period: '2018 - 2022',
        description: 'Coordinated 20+ enterprise projects with teams of 8-15 developers. Received "Best Coordinator" award 3 years running.',
      },
    ]),
    projectsList: JSON.stringify([
      {
        name: 'TrishulHub Process Overhaul',
        description: 'Redesigned internal delivery process — cut average project timeline by 28%.',
        link: 'https://trishulhub.com',
        year: '2024',
      },
      {
        name: 'Nipstudy Operations',
        description: 'Set up the entire ops workflow for the EdTech platform launch.',
        link: '#',
        year: '2023',
      },
      {
        name: 'UK Store Demo Coordination',
        description: 'Coordinating cross-team delivery for the UK retail demo launch.',
        link: '#',
        year: '2025',
      },
    ]),
    username: 'pruthvi',
    password: 'pruthvi123',
  },
]

async function main() {
  console.log('Seeding 4 founders...')
  for (const f of founders) {
    await db.founder.upsert({
      where: { slug: f.slug },
      update: f,
      create: f,
    })
    console.log(`  ✓ ${f.name} (${f.slug}) — username: ${f.username} / password: ${f.password}`)
  }
  console.log('\nDone. All 4 founders seeded.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
