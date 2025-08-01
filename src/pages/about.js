import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout';
import Seo from '../components/seo';
import Bio from '../components/bio';
import TimeStampSection from '../components/timestamp-section';
import ProjectSection from '../components/project-section';

function AboutPage({ data }) {
  const metaData = data.site.siteMetadata;
  const { author, about, language } = metaData;
  const { timestamps, projects } = about;
  return (
    <Layout>
      <Seo title="About" />
      <Bio author={author} language={language} />
      <div className="w-[80%] mx-auto">
        <TimeStampSection timestamps={timestamps} />
        <ProjectSection projects={projects} />
      </div>
    </Layout>
  );
}

export default AboutPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        language
        author {
          name
          bio {
            role
            description
            thumbnail
          }
          social {
            github
            linkedIn
            email
          }
        }

        about {
          timestamps {
            date
            activity
            links {
              homepage
              post
              github
              demo
              googlePlay
              appStore
            }
          }

          projects {
            title
            description
            techStack
            thumbnailUrl
            links {
              homepage
              post
              github
              demo
              googlePlay
              appStore
            }
          }
        }
      }
    }
  }
`;
