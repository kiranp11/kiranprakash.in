import React, { type FC } from "react";

import { graphql } from "gatsby";

import { type Node } from "@/types/node";
import { Meta } from "@/components/meta";
import { Post } from "@/components/post";
import { Layout } from "@/components/layout";
import { ArticleStructuredData, PersonStructuredData, OrganizationStructuredData } from "@/components/structured-data";
import { useSiteMetadata } from "@/hooks/use-site-metadata";

interface PostTemplateProps {
  data: {
    markdownRemark: Node;
  };
}

const PostTemplate: FC<PostTemplateProps> = ({
  data: { markdownRemark },
}) => (
  <Layout>
    <Post post={markdownRemark} />
  </Layout>
);

export const query = graphql`
  query PostTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        tags
        title
        description
        socialImage {
          publicURL
        }
      }
    }
  }
`;

export const Head: FC<PostTemplateProps> = ({ data }) => {
  const { title, description, url } = useSiteMetadata();

  const {
    fields: { slug },
    frontmatter: {
      title: postTitle,
      description: postDescription = description || "",
      socialImage,
      date,
      tags,
      category,
    },
  } = data.markdownRemark;

  const image = socialImage?.publicURL && url.concat(socialImage?.publicURL);
  const postUrl = url.concat(slug);

  return (
    <>
      <Meta
        title={`${postTitle} - ${title}`}
        description={postDescription}
        image={image}
        url={postUrl}
        type="article"
        publishedTime={date}
      />
      <ArticleStructuredData
        title={postTitle}
        description={postDescription}
        url={postUrl}
        datePublished={date}
        author={{
          name: "Kiran Prakash",
          url: "https://kiranprakash.in",
        }}
        tags={tags}
        category={category}
      />
      <PersonStructuredData
        name="Kiran Prakash"
        url="https://kiranprakash.in"
        description="Programmer. Principal Engineer at ThoughtWorks."
        jobTitle="Principal Engineer"
        worksFor="ThoughtWorks"
        sameAs={[
          "https://twitter.com/kiran_p",
          "https://github.com/kiranp11",
          "https://linkedin.com/in/kiran-prakash",
        ]}
      />
      <OrganizationStructuredData
        name="Blog by Kiran Prakash"
        url="https://kiranprakash.in"
        description="Programmer. Principal Engineer at ThoughtWorks."
      />
    </>
  );
};

export default PostTemplate;
