import React, { type FC } from "react";

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url: string;
  };
  tags?: string[];
  category?: string;
}

interface PersonStructuredDataProps {
  name: string;
  url: string;
  description: string;
  jobTitle: string;
  worksFor: string;
  sameAs?: string[];
}

interface OrganizationStructuredDataProps {
  name: string;
  url: string;
  description: string;
  logo?: string;
}

const ArticleStructuredData: FC<ArticleStructuredDataProps> = ({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  tags,
  category,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Blog by Kiran Prakash",
      url: "https://kiranprakash.in",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(tags && { keywords: tags.join(", ") }),
    ...(category && { articleSection: category }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

const PersonStructuredData: FC<PersonStructuredDataProps> = ({
  name,
  url,
  description,
  jobTitle,
  worksFor,
  sameAs,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    description,
    jobTitle,
    worksFor: {
      "@type": "Organization",
      name: worksFor,
    },
    ...(sameAs && { sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

const OrganizationStructuredData: FC<OrganizationStructuredDataProps> = ({
  name,
  url,
  description,
  logo,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    description,
    ...(logo && { logo }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

const WebSiteStructuredData: FC<{ name: string; url: string }> = ({ name, url }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export { 
  ArticleStructuredData, 
  PersonStructuredData, 
  OrganizationStructuredData, 
  WebSiteStructuredData 
};