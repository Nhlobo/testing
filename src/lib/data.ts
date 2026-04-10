import type {
  NavLink,
  Service,
  CaseStudy,
  Testimonial,
  BlogPost,
  Stat,
  PricingTier,
  TeamMember,
} from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export const stats: Stat[] = [
  { value: "50+", numericValue: 50, suffix: "+", label: "Projects Delivered", icon: "Rocket" },
  { value: "R5M+", numericValue: 5, suffix: "M+", label: "Revenue Enabled", icon: "TrendingUp" },
  { value: "95+", numericValue: 95, suffix: "+", label: "Lighthouse Score", icon: "Zap" },
  { value: "6", numericValue: 6, suffix: "", label: "Industries Served", icon: "Globe" },
];

export const services: Service[] = [
  {
    id: "web-dev",
    icon: "Globe",
    title: "Web Development",
    description:
      "High-performance websites and web applications built with modern frameworks. From landing pages to complex SaaS platforms.",
    features: ["Next.js / React", "TypeScript", "SEO Optimised", "99.9% Uptime"],
    benefits: [
      "Lightning-fast page loads even on 3G connections",
      "Fully responsive across mobile, tablet and desktop",
      "Built-in SEO best practices for South African search visibility",
      "Scalable architecture ready to grow with your business",
    ],
    href: "/services#web-development",
  },
  {
    id: "mobile-apps",
    icon: "Smartphone",
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile apps for iOS and Android. Beautiful UX that keeps users engaged.",
    features: ["React Native", "Expo", "Push Notifications", "Offline Support"],
    benefits: [
      "Works offline — critical for load-shedding resilience",
      "Single codebase for iOS and Android reduces cost",
      "Smooth animations and native-feel interactions",
      "App Store and Google Play submission handled for you",
    ],
    href: "/services#mobile-apps",
  },
  {
    id: "business-systems",
    icon: "LayoutDashboard",
    title: "Business Systems",
    description:
      "Custom ERP, CRM and workflow automation systems that streamline operations and reduce manual effort.",
    features: ["Process Automation", "API Integrations", "Real-time Dashboards", "Role-based Access"],
    benefits: [
      "Eliminate repetitive manual tasks and human error",
      "Real-time visibility into business performance",
      "Seamless integration with tools you already use",
      "Role-based access keeps sensitive data secure",
    ],
    href: "/services#business-systems",
  },
  {
    id: "ui-ux",
    icon: "Palette",
    title: "UI/UX Design",
    description:
      "User-centred design that converts visitors into customers. We craft experiences that are both beautiful and functional.",
    features: ["Figma Prototypes", "Usability Testing", "Design Systems", "Brand Identity"],
    benefits: [
      "Higher conversion rates through intuitive user flows",
      "Consistent brand identity across all touchpoints",
      "Validated designs before a single line of code is written",
      "Design system that accelerates future development",
    ],
    href: "/services#ui-ux",
  },
  {
    id: "devops",
    icon: "Server",
    title: "DevOps & Cloud",
    description:
      "CI/CD pipelines, cloud infrastructure and monitoring that keep your digital products running smoothly.",
    features: ["AWS / Vercel", "Docker & Kubernetes", "CI/CD Pipelines", "24/7 Monitoring"],
    benefits: [
      "Zero-downtime deployments with automated rollbacks",
      "Auto-scaling infrastructure that handles traffic spikes",
      "Proactive monitoring with instant incident alerts",
      "Significant cost savings versus traditional hosting",
    ],
    href: "/services#devops",
  },
  {
    id: "digital-strategy",
    icon: "BarChart3",
    title: "Digital Strategy",
    description:
      "Data-driven digital transformation roadmaps tailored for South African markets and growth objectives.",
    features: ["Market Analysis", "Tech Roadmapping", "KPI Framework", "Quarterly Reviews"],
    benefits: [
      "Clear, prioritised roadmap aligned with business goals",
      "Avoid costly technology mistakes with expert guidance",
      "Data-driven decisions backed by market research",
      "Regular reviews keep your strategy current and effective",
    ],
    href: "/services#digital-strategy",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "shopza",
    client: "ShopZA",
    industry: "Retail & E-commerce",
    title: "Scalable E-commerce Platform",
    description:
      "Built a headless e-commerce platform for one of South Africa's fastest-growing online retailers, handling 10k+ daily transactions.",
    result: "340%",
    resultLabel: "Revenue Growth",
    gradient: "from-accent/20 to-orange-600/10",
    accentColor: "#FF6B35",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Vercel"],
    href: "/work#shopza",
    liveUrl: "https://nhlobo.github.io/testing/",
    githubUrl: "https://github.com/nhlobo",
  },
  {
    id: "medconnect",
    client: "MedConnect",
    industry: "Healthcare",
    title: "Patient Management System",
    description:
      "Developed a POPIA-compliant patient portal and scheduling system for a network of private healthcare facilities across Gauteng.",
    result: "60%",
    resultLabel: "Admin Time Saved",
    gradient: "from-teal/20 to-cyan-600/10",
    accentColor: "#00C9A7",
    tags: ["React", "Node.js", "PostgreSQL", "POPIA Compliant"],
    href: "/work#medconnect",
    liveUrl: "https://nhlobo.github.io/testing/",
    githubUrl: "https://github.com/nhlobo",
  },
  {
    id: "agritrack",
    client: "AgriTrack",
    industry: "Agriculture",
    title: "Farm Management Dashboard",
    description:
      "IoT-integrated farm management platform enabling South African farmers to monitor crops, irrigation and supply chains in real time.",
    result: "28%",
    resultLabel: "Yield Improvement",
    gradient: "from-green-500/20 to-emerald-600/10",
    accentColor: "#4ADE80",
    tags: ["React Native", "IoT", "AWS", "Data Analytics"],
    href: "/work#agritrack",
    liveUrl: "https://nhlobo.github.io/testing/",
    githubUrl: "https://github.com/nhlobo",
  },
  {
    id: "finvault",
    client: "FinVault",
    industry: "Fintech",
    title: "Digital Banking Dashboard",
    description:
      "Designed and built a secure, real-time digital banking dashboard for a South African fintech startup — complete with transaction analytics, budgeting tools and multi-user role management.",
    result: "4.8★",
    resultLabel: "App Store Rating",
    gradient: "from-blue-500/20 to-indigo-600/10",
    accentColor: "#60A5FA",
    tags: ["React Native", "TypeScript", "Node.js", "Redis"],
    href: "/work#finvault",
    liveUrl: "https://nhlobo.github.io/testing/",
    githubUrl: "https://github.com/nhlobo",
  },
  {
    id: "edubridge",
    client: "EduBridge",
    industry: "Education",
    title: "E-Learning Platform",
    description:
      "Created a responsive e-learning platform for a Gauteng-based EdTech startup, featuring course management, live video sessions and offline-capable lesson delivery.",
    result: "12K+",
    resultLabel: "Active Students",
    gradient: "from-purple-500/20 to-violet-600/10",
    accentColor: "#A78BFA",
    tags: ["Next.js", "WebRTC", "Firebase", "Tailwind CSS"],
    href: "/work#edubridge",
    liveUrl: "https://nhlobo.github.io/testing/",
    githubUrl: "https://github.com/nhlobo",
  },
  {
    id: "logistix",
    client: "Logistix",
    industry: "Logistics",
    title: "Fleet & Delivery Tracker",
    description:
      "Built a real-time fleet management and delivery tracking system for a Cape Town logistics company, integrating GPS telemetry, route optimisation and customer notifications.",
    result: "35%",
    resultLabel: "Fuel Cost Reduction",
    gradient: "from-yellow-400/20 to-orange-400/10",
    accentColor: "#FBBF24",
    tags: ["React", "Google Maps API", "Node.js", "WebSockets"],
    href: "/work#logistix",
    liveUrl: "https://nhlobo.github.io/testing/",
    githubUrl: "https://github.com/nhlobo",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Thabo Mkhize",
    role: "CEO",
    company: "ShopZA",
    quote:
      "Mapengo Innovations transformed our online presence completely. Our site went from slow and clunky to lightning-fast, and sales followed immediately. The team is professional, communicative and delivers on time.",
    rating: 5,
    avatar: "TM",
  },
  {
    id: "t2",
    name: "Dr. Lerato Dlamini",
    role: "Operations Director",
    company: "MedConnect",
    quote:
      "The patient portal Mapengo built for us is simply outstanding. Patients love it, our admin team loves it and our compliance team finally stopped worrying. Worth every rand invested.",
    rating: 5,
    avatar: "LD",
  },
  {
    id: "t3",
    name: "Pieter van der Berg",
    role: "Founder",
    company: "AgriTrack",
    quote:
      "From concept to launch in 12 weeks — I was genuinely impressed. The mobile app works seamlessly in areas with poor connectivity, which is critical for our farming clients. Highly recommended.",
    rating: 5,
    avatar: "PB",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "next-js-14-south-africa",
    title: "Why South African Businesses Should Move to Next.js 14 in 2024",
    excerpt:
      "From load-shedding resilience to mobile-first performance, here's why Next.js 14 is the best framework for South African digital products.",
    content: `
      South Africa's digital landscape has unique challenges: intermittent connectivity, mobile-first users, and increasing competition from global platforms. Next.js 14 addresses all of these.

      ## Server Components = Faster Load Times
      With React Server Components, HTML is generated on the server, reducing JavaScript sent to the browser. This means faster page loads even on 3G connections — critical for the majority of South African mobile users.

      ## Caching & Offline Resilience
      Next.js 14's advanced caching strategies mean content loads faster and stays available even during brief connectivity drops. Pair this with a service worker and you have a near-native offline experience.

      ## SEO Out of the Box
      Next.js's metadata API makes it trivial to set up proper Open Graph tags, Twitter cards and JSON-LD structured data — essential for competing in South African search results.

      ## Vercel Edge Network
      Deploying to Vercel gives you edge nodes in Cape Town and Johannesburg, slashing latency for local users.

      Ready to modernise your digital product? [Contact us](/contact) to get started.
    `,
    date: "2024-03-15",
    readTime: 5,
    tag: "Tech",
    author: "Mapengo Team",
    featured: true,
  },
  {
    id: "b2",
    slug: "popia-compliance-web-apps",
    title: "POPIA Compliance for Web Applications: A Practical Guide",
    excerpt:
      "The Protection of Personal Information Act affects every South African business with a website. Here's what developers need to know.",
    content: `
      The Protection of Personal Information Act (POPIA) came into full effect in July 2021. If your website collects any personal data from South Africans, you need to comply.

      ## What Counts as Personal Information?
      Under POPIA, personal information includes names, email addresses, IP addresses, location data and even behavioural data collected by analytics tools.

      ## Key Technical Requirements

      ### 1. Cookie Consent
      You must obtain explicit consent before setting non-essential cookies. Implement a compliant cookie banner that lets users accept or reject different categories.

      ### 2. Data Minimisation
      Only collect data you actually need. Review every form field and ask: "Do we really need this?"

      ### 3. Secure Data Transmission
      All data must be transmitted over HTTPS. Ensure your SSL certificate is always valid and HTTP redirects to HTTPS.

      ### 4. Right to Erasure
      Users have the right to request deletion of their data. Build processes to handle these requests within the required timeframe.

      ## Practical Checklist
      - [ ] Privacy policy updated for POPIA
      - [ ] Cookie consent banner implemented
      - [ ] Data processing register maintained
      - [ ] Data breach response plan in place
      - [ ] Information Officer appointed

      Need help making your web application POPIA compliant? [Get in touch](/contact).
    `,
    date: "2024-02-28",
    readTime: 7,
    tag: "Compliance",
    author: "Mapengo Team",
  },
  {
    id: "b3",
    slug: "react-native-load-shedding",
    title: "Building Load-Shedding Resilient React Native Apps",
    excerpt:
      "Load shedding is a reality for South African businesses. Here's how we build mobile apps that keep working when the lights go out.",
    content: `
      With load shedding affecting productivity across South Africa, building offline-capable mobile apps is no longer optional — it's a competitive advantage.

      ## Offline-First Architecture
      Design your app to work offline from day one. This means:
      - Local data storage with SQLite or WatermelonDB
      - Optimistic UI updates
      - Background sync when connectivity returns

      ## Conflict Resolution
      When users make changes offline, you need a strategy for merging those changes with server state. We use timestamp-based conflict resolution with user prompts for critical data conflicts.

      ## Network Status Awareness
      Use NetInfo to detect connectivity changes and gracefully degrade functionality. Show clear UI indicators when offline mode is active.

      ## Battery Optimisation
      During load shedding, device batteries are precious. Implement aggressive battery optimisation:
      - Reduce polling frequency
      - Defer non-critical syncs
      - Compress data transfers

      ## Push Notifications Queue
      Queue push notifications locally and send them when connectivity returns. This ensures no important updates are missed.

      Want an offline-capable mobile app for your business? [Contact us](/contact) today.
    `,
    date: "2024-01-20",
    readTime: 6,
    tag: "Mobile",
    author: "Mapengo Team",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "R15,000",
    description: "Perfect for small businesses launching their digital presence.",
    features: [
      "5-page responsive website",
      "Mobile optimised",
      "Basic SEO setup",
      "Contact form",
      "1 month support",
      "Google Analytics",
    ],
    cta: "Get Started",
  },
  {
    id: "growth",
    name: "Growth",
    price: "R45,000",
    description: "For growing businesses that need powerful digital tools.",
    features: [
      "Custom web application",
      "CMS integration",
      "Advanced SEO",
      "Payment gateway",
      "3 months support",
      "Performance monitoring",
      "API integrations",
    ],
    cta: "Start Growing",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organisations and complex requirements.",
    features: [
      "Everything in Growth",
      "Dedicated project manager",
      "Custom integrations",
      "POPIA compliance audit",
      "12 months support",
      "SLA guarantee",
      "Training & documentation",
    ],
    cta: "Contact Us",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "Nhlobo Mapengo",
    role: "Founder & Lead Developer",
    bio: "Full-stack developer with a passion for building digital products that make a real difference for South African businesses. 8+ years of experience across web, mobile and cloud.",
    github: "nhlobo",
    linkedin: "mapengo-innovations",
  },
  {
    id: "tm2",
    name: "Thandi Nkosi",
    role: "UI/UX Designer",
    bio: "User-centred designer who combines aesthetic sensibility with data-driven decision making. Believes great design should be invisible — it just works.",
    linkedin: "mapengo-innovations",
  },
  {
    id: "tm3",
    name: "Sipho Dlamini",
    role: "Backend Engineer",
    bio: "Systems architect specialising in high-availability APIs and database optimisation. Has built backends processing millions of transactions for South African fintech companies.",
    github: "nhlobo",
  },
];

export const siteConfig = {
  name: "Mapengo Innovations",
  description:
    "Premium digital agency building fast websites, powerful apps and smart business systems for South African businesses.",
  url: "https://nhlobo.github.io/testing",
  email: "info@MapengoInnovations.co.za",
  phone: "+27665520197",
  whatsapp: "https://wa.me/27665520197",
  location: "Johannesburg, Gauteng, South Africa",
  social: {
    linkedin: "https://linkedin.com/company/mapengo-innovations",
    github: "https://github.com/nhlobo",
  },
  tagline: "We Build Digital Products That Drive Growth",
  subTagline:
    "Fast websites, powerful apps and smart business systems — built for South African businesses.",
};
