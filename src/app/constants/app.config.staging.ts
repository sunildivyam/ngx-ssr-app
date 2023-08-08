import { AppConfig } from '@annuadvent/ngx-core/app-config';

export const appConfig: AppConfig = {
  name: 'annuBusiness',
  copyrightText: 'copyright©annu-business',
  themeName: 'skyBlue',
  apiBaseUrl: 'https://annu-business.web.app',
  imagesSourceUrl: '/getImage?imageId=',
  loginUrl: '/login',
  logoutUrl: '/login',
  profileUrl: '/dashboard',
  adminEmail: 'info@annubiztech.com',
  defaultPageSize: 5,
  tNcUrl: '/tnc/terms-and-conditions',
  privacyPolicyUrl: '/privacy/privacy-policy',
  contactUsUrl:
    '/contact-us/contact-us-for-sales-enquiry-technology-consulting-business-consulting-research-consulting-or-a-general-enquiry',
  aboutUsUrl: '/about-us/about-annu-advent',
  metaInfo: {
    title: 'Annu Business',
    description:
      'Annu Business is a dynamic and innovative team of digital content creators who are passionate about crafting captivating and immersive experiences for audiences across various digital platforms. With our diverse skill set and expertise, we specialize in producing high-quality and engaging content that leaves a lasting impact. At Annu Business we are driven by our commitment to excellence, innovation, and audience satisfaction. We embrace the ever-evolving digital landscape, constantly pushing boundaries, and exploring new avenues to deliver content that resonates with our viewers, readers, and listeners. Join us on this exciting journey as we continue to shape the digital content landscape with our creativity, expertise, and unwavering dedication.',
    keywords:
      'Annu Business, Visual storytelling, Video content creators, Vlogs, Tutorials, Short films, Informative articles, Social media influencers, Entertaining stories, In-depth interviews, Graphic designers, Artists, Digital artwork, Infographics, Evolving digital landscape',
    robots: 'index, follow',
    'Content-Type': 'text/html; charset=utf-8',
    language: 'english',
    'revisit-after': '7 days',
    author: 'Annu Business',
    type: 'article',
    'article:published_time': '2022-01-03T17:53:35.868Z',
    'article:author': 'Annu Business',
    'article:section': 'business',
    'article:tag':
      'Annu Business, Visual storytelling, Video content creators, Vlogs, Tutorials, Short films, Informative articles, Social media influencers, Entertaining stories, In-depth interviews, Graphic designers, Artists, Digital artwork, Infographics, Evolving digital landscape',
    image: '/assets/annu-advent-logo.png',
    url: '',
    card: 'summary_large_image',
    site_name: 'Annu Business',
    audio: '',
    video: '',
  },
  mainMenuItems: [
    {
      title: 'Sample Category 1',
      href: ['./sample-category-1'],
    },
    {
      title: 'Sample Category 2',
      href: ['./sample-category-2'],
    },
    {
      title: 'Sample Category 3',
      href: ['./sample-category-3'],
    },
    {
      title: 'Sample Category 4',
      href: ['./sample-category-4'],
    },
  ],
  socialMedia: {
    facebook: 'https://www.facebook.com/profile.php?id=100089738215994',
    twitter: 'https://twitter.com/annuadvent',
    linkedin: 'https://www.linkedin.com/company/annuadvent',
    instagram: 'https://www.instagram.com/annuadvent/',
  }
};
