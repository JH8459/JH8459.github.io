import React from 'react';
import { graphql, type PageProps } from 'gatsby';
import Layout from '../layout';
import Seo from '../components/seo';
import Bio from '../components/bio';
import SummarySection from '../components/summary-section';
import TimeStampSection from '../components/timestamp-section';
import EducationCertificationSection from '../components/education-certification-section';
import ProjectSection from '../components/project-section';
import ListSection from '../components/list-section';
import type { SiteMetadata } from '../types/site';
import type { AboutMetadata } from '../types/about';

interface AboutPageData {
  site: {
    siteMetadata: SiteMetadata & { about: AboutMetadata };
  };
}

type AboutPageProps = PageProps<AboutPageData>;

/**
 * @description About 페이지
 * @param {AboutPageProps} props Gatsby 페이지 props
 * @return {JSX.Element}
 */
function AboutPage({ data }: AboutPageProps) {
  const metaData = data.site.siteMetadata;
  // About 페이지에서 사용되는 메타데이터 추출
  const { author, about, language } = metaData;
  const { careers, education, certifications, projects, summary, openSource, externalActivities } =
    about;

  return (
    <Layout>
      <Seo title="About" />
      <Bio author={author} language={language} />
      <div className="w-full">
        <SummarySection summary={summary} title="Intro" />
      </div>
      <div className="w-full">
        <TimeStampSection careers={careers} />
      </div>
      <div className="w-full">
        <EducationCertificationSection education={education} certifications={certifications} />
      </div>
      <div className="w-full">
        <ListSection title="Open Source" items={openSource} />
        <ListSection title="External Activities" items={externalActivities} />
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
          summary
          careers {
            date
            label
            status
            activity
            posts {
              title
              thumbnail
              publishedAt
              url
            }
            links {
              homepage
              post
              github
              demo
              googlePlay
              appStore
            }
          }

          education {
            date
            title
            institution
            links {
              homepage
              post
            }
          }

          certifications {
            issued
            expires
            title
            issuer
            credentialId
            links {
              post
            }
          }

          openSource {
            title
            description
            date
            links {
              homepage
              post
              github
              demo
              googlePlay
              appStore
            }
          }

          externalActivities {
            title
            description
            date
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
