import { AppConfig } from '@annuadvent/ngx-core/app-config';

export const appConfig: AppConfig = {
  name: 'annuadvent',
  copyrightText: 'copyright©annuadvent',
  themeName: 'skyBlue',
  apiBaseUrl: 'https://www.annuadvent.com', // When running prod on hosting server
  imagesSourceUrl: '/getImage?imageId=',
  loginUrl: '/login',
  logoutUrl: '/login',
  profileUrl: '/dashboard',
  adminEmail: 'sunil.divyam@gmail.com',
  defaultPageSize: 5,
  tNcUrl: '/tnc/terms-and-conditions',
  privacyPolicyUrl: '/privacy/privacy-policy',
  contactUsUrl:
    '/contact-us/contact-us-for-sales-enquiry-technology-consulting-business-consulting-research-consulting-or-a-general-enquiry',
  aboutUsUrl: '/about-us/about-annu-advent',
  metaInfo: {
    title: 'Annu Advent',
    description:
      'Annu Advent is a dynamic and innovative team of digital content creators who are passionate about crafting captivating and immersive experiences for audiences across various digital platforms. With our diverse skill set and expertise, we specialize in producing high-quality and engaging content that leaves a lasting impact. At Annu Advent we are driven by our commitment to excellence, innovation, and audience satisfaction. We embrace the ever-evolving digital landscape, constantly pushing boundaries, and exploring new avenues to deliver content that resonates with our viewers, readers, and listeners. Join us on this exciting journey as we continue to shape the digital content landscape with our creativity, expertise, and unwavering dedication.',
    keywords:
      'Annu Advent, Visual storytelling, Video content creators, Vlogs, Tutorials, Short films, Informative articles, Social media influencers, Entertaining stories, In-depth interviews, Graphic designers, Artists, Digital artwork, Infographics, Evolving digital landscape',
    robots: 'index, follow',
    'Content-Type': 'text/html; charset=utf-8',
    language: 'english',
    'revisit-after': '7 days',
    author: 'Annu Advent',
    type: 'article',
    'article:published_time': '2023-01-01T17:53:35.868Z',
    'article:author': 'Annu Advent',
    'article:section': 'business',
    'article:tag':
      'Annu Advent, Visual storytelling, Video content creators, Vlogs, Tutorials, Short films, Informative articles, Social media influencers, Entertaining stories, In-depth interviews, Graphic designers, Artists, Digital artwork, Infographics, Evolving digital landscape',
    image: '/assets/annu-advent-logo.png',
    url: '',
    card: 'summary_large_image',
    site_name: 'Annu Advent',
    audio: '',
    video: '',
  },
  mainMenuItems: [
    {
      title: 'Technology as business',
      href: ['./technology'],
    },
    {
      title: 'Business Techniques',
      href: ['./business-techniques'],
    },
    {
      title: 'Research',
      href: ['./research'],
    },
  ],
};
