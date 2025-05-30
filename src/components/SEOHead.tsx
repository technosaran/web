'use client';

import React from 'react';
import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Saran - Portfolio',
  description = 'Full Stack Developer & Software Engineer specializing in modern web technologies',
  keywords = ['developer', 'portfolio', 'web development', 'software engineer', 'react', 'nextjs'],
  image = '/web/og-image.jpg',
  url = 'https://saran.dev/web/',
  type = 'website',
  author = 'Saran',
  publishedTime,
  modifiedTime,
  section,
  noindex = false,
  nofollow = false
}) => {
  const fullTitle = title.includes('Saran') ? title : `${title} | Saran - Portfolio`;
  const keywordsString = keywords.join(', ');
  
  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Saran',
    jobTitle: 'Full Stack Developer & Software Engineer',
    description: description,
    url: url,
    image: image,
    sameAs: [
      'https://github.com/saran',
      'https://linkedin.com/in/saran-r-b2b1a5275/',
      'mailto:saransci2006@gmail.com'
    ],
    knowsAbout: [
      'Web Development',
      'Software Engineering',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Python',
      'Cybersecurity',
      'Data Analytics'
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Educational Institution'
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Prompt Engineering',
        credentialCategory: 'certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Infosys'
        }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Data Analytics & Visualization',
        credentialCategory: 'certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Accenture North America'
        }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Cybersecurity Analyst',
        credentialCategory: 'certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Tata Group'
        }
      }
    ]
  };

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Saran Portfolio',
    description: description,
    url: url,
    author: {
      '@type': 'Person',
      name: author
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: url
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: url
      }
    ]
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content={author} />
      
      {/* Robots Meta */}
      <meta 
        name="robots" 
        content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}, max-snippet:-1, max-image-preview:large, max-video-preview:-1`} 
      />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Saran Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {keywords.map((keyword, index) => (
            <meta key={index} property="article:tag" content={keyword} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@saran" />
      <meta name="twitter:site" content="@saran" />
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Saran Portfolio" />
      
      {/* Geo Meta Tags */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      
      {/* Language and Content */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="language" content="English" />
      
      {/* Cache Control */}
      <meta httpEquiv="cache-control" content="public, max-age=31536000" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://formspree.io" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//upload.wikimedia.org" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Alternate Languages (if applicable) */}
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Head>
  );
};

export default SEOHead;
