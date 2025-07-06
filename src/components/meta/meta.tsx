import React, { type FC } from "react";

interface MetaProps {
  description: string;
  image?: string;
  title: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const Meta: FC<MetaProps> = ({ 
  description, 
  title, 
  image, 
  url, 
  type = "website", 
  publishedTime, 
  modifiedTime 
}) => (
  <>
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    {url && <link rel="canonical" href={url} />}
    
    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="@kiran_p" />
    <meta name="twitter:creator" content="@kiran_p" />
    
    {/* Open Graph */}
    <meta name="og:title" content={title} />
    <meta name="og:type" content={type} />
    <meta name="og:description" content={description} />
    <meta name="og:site_name" content="Blog by Kiran Prakash" />
    {url && <meta name="og:url" content={url} />}
    
    {/* Article-specific Open Graph */}
    {type === "article" && publishedTime && (
      <meta name="article:published_time" content={publishedTime} />
    )}
    {type === "article" && modifiedTime && (
      <meta name="article:modified_time" content={modifiedTime} />
    )}
    {type === "article" && (
      <meta name="article:author" content="Kiran Prakash" />
    )}

    {image ? (
      <>
        <meta name="image" content={image} />
        <meta name="og:image" content={image} />
        <meta name="twitter:image" content={image} />
        <meta name="og:image:alt" content={title} />
      </>
    ) : null}
  </>
);

export { Meta };
