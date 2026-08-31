import React from 'react';
import { graphql, Link, type PageProps } from 'gatsby';
import { FaChrome, FaGithub, FaLinkedin, FaPenNib } from 'react-icons/fa';
import { MdArrowBack, MdEmail, MdLanguage, MdLink, MdOpenInNew, MdPhone } from 'react-icons/md';
import Image from '../components/image';
import Seo from '../components/seo';
import type {
  AboutMetadata,
  ResumeCertification,
  ResumeExperience,
  ResumeLink,
  ResumeMetadata,
  ResumeProject,
  ResumeSkillGroup,
  ProjectItem,
} from '../types/about';
import type { SiteMetadata } from '../types/site';

interface AboutPageData {
  site: {
    siteMetadata: SiteMetadata & { about: AboutMetadata & { resume: ResumeMetadata } };
  };
}

type AboutPageProps = PageProps<AboutPageData>;

interface ResumeSectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

interface ExperienceProps {
  experience: ResumeExperience;
}

interface ProjectProps {
  project: ResumeProject;
}

interface ResumeLinkProps {
  item: ResumeLink;
}

const externalLinkProps = {
  rel: 'noopener noreferrer',
  target: '_blank',
};

const projectLinkLabels: Record<string, string> = {
  homepage: '배포 URL',
  github: 'GitHub',
  post: '블로그·가이드',
  demo: '서비스·데모',
  googlePlay: 'Google Play',
  appStore: 'App Store',
  chromeExtension: 'Chrome Web Store',
};

const projectLinkOrder = [
  'github',
  'homepage',
  'demo',
  'chromeExtension',
  'post',
  'googlePlay',
  'appStore',
] as const;

/**
 * @description 프로젝트 링크 종류에 맞는 아이콘을 반환합니다.
 * @param {string} key 링크 종류
 * @return {React.ElementType} 링크 아이콘
 */
function getProjectLinkIcon(key: string) {
  if (key === 'github') return FaGithub;
  if (key === 'chromeExtension') return FaChrome;
  if (key === 'homepage' || key === 'demo') return MdLanguage;
  return MdLink;
}

/**
 * @description 이력서 섹션의 공통 제목을 렌더링합니다.
 * @param {ResumeSectionProps} props 섹션 props
 * @return {JSX.Element}
 */
function ResumeSection({ number, title, children, className = '' }: ResumeSectionProps) {
  return (
    <section className={`resume-section ${className}`.trim()} id={title.toLowerCase()}>
      <div className="mb-7 flex items-end gap-3 border-b border-[#1d1f22] pb-3 dark:border-[#e4e4e7]">
        <span className="text-[12px] font-bold tracking-[0.16em] text-[#71767d]">{number}</span>
        <h2 className="text-[24px] font-extrabold tracking-[-0.04em] text-[#17191c] dark:text-[#f4f4f5] md:text-[28px]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

/**
 * @description 경력 프로젝트 하나를 이력서 형식으로 렌더링합니다.
 * @param {ProjectProps} props 프로젝트 props
 * @return {JSX.Element}
 */
function ResumeProjectItem({ project }: ProjectProps) {
  return (
    <article className="resume-project border-t border-[#e5e7eb] py-6 first:border-t-0 first:pt-0 last:pb-0 dark:border-[#3f4248]">
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
        <h4 className="text-[17px] font-extrabold leading-[1.45] tracking-[-0.025em] text-[#181a1d] dark:text-[#f4f4f5]">
          {project.title}
        </h4>
        {project.period ? (
          <time className="shrink-0 text-[12px] font-bold tracking-[0.02em] text-[#747a82]">
            {project.period}
          </time>
        ) : null}
      </div>
      {project.summary ? (
        <p className="mt-3 text-[14px] leading-[1.75] text-[#555b63] dark:text-[#c5c7cb]">
          {project.summary}
        </p>
      ) : null}
      {project.bullets?.length ? (
        <ul className="mt-3 space-y-2 text-[14px] leading-[1.75] text-[#555b63] dark:text-[#c5c7cb]">
          {project.bullets.map((bullet, index) => (
            <li className="flex items-start gap-2" key={`${project.title}-bullet-${index}`}>
              <span
                aria-hidden="true"
                className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-[#6d737b]"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

interface PortfolioProjectProps {
  project: ProjectItem;
}

/**
 * @description 개인 프로젝트를 이력서 카드 형식으로 렌더링합니다.
 * @param {PortfolioProjectProps} props 프로젝트 props
 * @return {JSX.Element}
 */
function ResumePortfolioProjectItem({ project }: PortfolioProjectProps) {
  const links = projectLinkOrder.reduce<Array<[string, string]>>((items, key) => {
    const url = project.links?.[key];

    if (url) items.push([key, url]);
    return items;
  }, []);
  const thumbnailClassName =
    project.thumbnailFit === 'contain'
      ? 'h-full w-full object-contain p-1'
      : 'h-full w-full object-cover';

  return (
    <article className="resume-project resume-avoid-break border-t border-[#e5e7eb] py-7 first:border-t-0 first:pt-0 last:pb-0 dark:border-[#3f4248]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {project.thumbnailUrl ? (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#e1e4e8] bg-[#f7f8f9] p-1 dark:border-[#4a4e55] dark:bg-[#30343a]"
            style={{ backgroundColor: project.thumbnailBackground }}
          >
            <Image
              alt={project.title ?? '프로젝트'}
              className={thumbnailClassName}
              src={project.thumbnailUrl}
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-[17px] font-extrabold leading-[1.45] tracking-[-0.025em] text-[#181a1d] dark:text-[#f4f4f5]">
                {project.title}
              </h3>
              {project.period ? (
                <time className="mt-1 block text-[11px] font-bold tracking-[0.02em] text-[#747a82]">
                  {project.period}
                </time>
              ) : null}
            </div>
            {links.length ? (
              <div className="flex shrink-0 items-center gap-2">
                {links.map(([key, url]) => {
                  const Icon = getProjectLinkIcon(key);

                  return (
                    <a
                      aria-label={`${project.title} ${projectLinkLabels[key] ?? key}`}
                      className="text-[#777d85] transition-colors hover:text-[#17191c] dark:text-[#aeb2b8] dark:hover:text-white"
                      href={url}
                      {...externalLinkProps}
                      key={key}
                      title={projectLinkLabels[key] ?? key}
                    >
                      <Icon className="text-[17px]" />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
          {project.description ? (
            <p className="mt-3 text-[13px] leading-[1.75] text-[#5e646b] dark:text-[#c5c7cb]">
              {project.description}
            </p>
          ) : null}
          {project.techStack?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  className="rounded-full bg-[#f0f2f4] px-2.5 py-1 text-[11px] font-bold text-[#626970] dark:bg-[#30343a] dark:text-[#d1d3d6]"
                  key={tech}
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/**
 * @description 회사별 경력과 프로젝트를 렌더링합니다.
 * @param {ExperienceProps} props 경력 props
 * @return {JSX.Element}
 */
function ResumeExperienceItem({ experience }: ExperienceProps) {
  const companyDetails = [
    experience.period,
    experience.duration ? `(${experience.duration})` : '',
    experience.employmentType,
    experience.role,
    experience.level,
  ].filter(Boolean);

  return (
    <article className="resume-company resume-avoid-break mb-12 last:mb-0">
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="resume-company-logo flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#e1e4e8] bg-[#f7f8f9] p-1 text-[12px] font-extrabold tracking-[-0.02em] text-[#17191c] dark:border-[#4a4e55] dark:bg-[#30343a] dark:text-[#f4f4f5]"
          style={{ backgroundColor: experience.logoBackground }}
        >
          {experience.logo ? (
            <img
              alt=""
              className="h-full w-full object-contain"
              loading="lazy"
              src={experience.logo}
            />
          ) : (
            experience.mark
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[20px] font-extrabold tracking-[-0.035em] text-[#17191c] dark:text-[#f4f4f5]">
              {experience.company}
            </h3>
            {experience.current ? (
              <span className="rounded-full bg-[#e8f7ee] px-2 py-1 text-[10px] font-extrabold tracking-[0.04em] text-[#18794e] dark:bg-[#173c2b] dark:text-[#8ee0b6]">
                CURRENT
              </span>
            ) : null}
          </div>
          <p className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-[13px] font-semibold leading-[1.5] text-[#737980] dark:text-[#b5b8be]">
            {companyDetails.map((detail, index) => (
              <React.Fragment key={`${experience.company}-detail-${index}`}>
                {index > 0 ? <span aria-hidden="true">·</span> : null}
                <span>{detail}</span>
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
      <div className="ml-16 mt-6">
        {experience.projects?.map((project, index) => (
          <ResumeProjectItem key={`${experience.company}-project-${index}`} project={project} />
        ))}
      </div>
    </article>
  );
}

/**
 * @description 이력서 링크 항목과 서비스별 아이콘을 렌더링합니다.
 * @param {ResumeLinkProps} props 링크 props
 * @return {JSX.Element | null}
 */
function ResumeLinkItem({ item }: ResumeLinkProps) {
  if (!item.label || !item.url) return null;

  const normalizedLabel = item.label.toLowerCase();
  const Icon = normalizedLabel.includes('github')
    ? FaGithub
    : normalizedLabel.includes('linkedin')
      ? FaLinkedin
      : normalizedLabel.includes('요즘')
        ? FaPenNib
        : MdLink;

  return (
    <a
      className="group flex items-start gap-3 rounded-xl border border-[#e6e8eb] p-4 transition-colors hover:border-[#aeb4bb] dark:border-[#3f4248] dark:hover:border-[#727780]"
      href={item.url}
      {...externalLinkProps}
    >
      <Icon className="mt-0.5 shrink-0 text-[20px] text-[#636970] transition-colors group-hover:text-[#17191c] dark:text-[#b5b8be] dark:group-hover:text-white" />
      <span className="min-w-0">
        <span className="block text-[14px] font-extrabold text-[#22252a] dark:text-[#f4f4f5]">
          {item.label}
        </span>
        <span className="mt-1 block break-all text-[12px] leading-[1.5] text-[#858a91]">
          {item.url}
        </span>
      </span>
      <MdOpenInNew className="ml-auto mt-0.5 shrink-0 text-[16px] text-[#9aa0a7]" />
    </a>
  );
}

/**
 * @description About 페이지를 웹 이력서 화면으로 렌더링합니다.
 * @param {AboutPageProps} props Gatsby 페이지 props
 * @return {JSX.Element}
 */
function AboutPage({ data, location }: AboutPageProps) {
  const { siteMetadata } = data.site;
  const { author, about } = siteMetadata;
  const resume = about.resume;
  const phoneHref = resume.phone?.replace(/[^+\d]/g, '');
  const projects = resume.projects?.filter((project) => project.title && project.description) ?? [];

  return (
    <div className="resume-page min-h-screen bg-[#f3f5f7] px-4 py-5 text-[#17191c] dark:bg-[#17181b] sm:px-6 md:py-8">
      <Seo
        description="백엔드 엔지니어 김정현의 경력, 프로젝트, 기술 스택과 연락처를 담은 이력서입니다."
        pathname={location.pathname}
        title="김정현 | Backend Engineer"
      />
      <div className="resume-toolbar mx-auto flex w-full max-w-[1040px] items-center justify-between gap-4 pb-5 md:pb-7">
        <Link
          className="flex items-center gap-2 text-[13px] font-extrabold tracking-[-0.02em] text-[#454b52] dark:text-[#d5d7da]"
          to="/"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#17191c] text-[10px] font-black text-white dark:bg-[#f4f4f5] dark:text-[#17191c]">
            JH
          </span>
          <span className="hidden sm:inline">JH&apos;s Engineering Notes</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-bold text-[#666c73] transition-colors hover:bg-white hover:text-[#17191c] dark:text-[#b5b8be] dark:hover:bg-[#292c31] dark:hover:text-white"
            to="/"
          >
            <MdArrowBack className="text-[16px]" />
            블로그
          </Link>
        </div>
      </div>

      <main className="resume-paper mx-auto w-full max-w-[1040px] rounded-[24px] bg-white px-6 py-8 shadow-[0_20px_70px_rgba(26,31,36,0.09)] dark:bg-[#212327] dark:shadow-[0_20px_70px_rgba(0,0,0,0.22)] sm:px-10 sm:py-12 md:px-16 md:py-16">
        <header className="resume-hero flex flex-col justify-between gap-10 border-b border-[#dfe2e6] pb-10 dark:border-[#41444a] md:flex-row md:items-end md:gap-12 md:pb-12">
          <div className="min-w-0">
            <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#737980]">
              {resume.role}
            </p>
            <h1 className="text-[46px] font-black tracking-[-0.08em] text-[#131518] dark:text-[#fafafa] sm:text-[60px]">
              {author.name}
            </h1>
            <p className="mt-4 max-w-[620px] text-[16px] font-bold leading-[1.65] tracking-[-0.025em] text-[#4f555c] dark:text-[#d1d3d6] sm:text-[18px]">
              서비스의 흐름을 이해하고, 쉽게 흔들리지 않는 백엔드 구조를 만듭니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-[#737980] dark:text-[#b5b8be]">
              {phoneHref && resume.phone ? (
                <a
                  className="inline-flex items-center gap-1.5 hover:text-[#17191c] dark:hover:text-white"
                  href={`tel:${phoneHref}`}
                >
                  <MdPhone className="text-[16px]" />
                  {resume.phone}
                </a>
              ) : null}
              {resume.email ? (
                <a
                  className="inline-flex items-center gap-1.5 hover:text-[#17191c] dark:hover:text-white"
                  href={`mailto:${resume.email}`}
                >
                  <MdEmail className="text-[16px]" />
                  {resume.email}
                </a>
              ) : null}
            </div>
          </div>
          <div className="resume-profile-image h-32 w-32 shrink-0 overflow-hidden rounded-[28px] bg-[#eef1f4] dark:bg-[#30343a] md:h-40 md:w-40">
            <img
              alt="김정현 프로필 사진"
              className="h-full w-full object-cover"
              loading="eager"
              src="/profile.jpeg"
            />
          </div>
        </header>

        <div className="mt-10 grid gap-10 md:mt-12 md:gap-14">
          <ResumeSection number="01" title="소개">
            <div className="grid gap-7">
              <div className="space-y-5 text-[15px] leading-[1.85] text-[#4f555c] dark:text-[#c9cbd0]">
                {resume.introduction?.map((paragraph, index) => (
                  <p key={`introduction-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>
          </ResumeSection>

          <ResumeSection number="02" title="경력">
            <div>
              {resume.experiences?.map((experience, index) => (
                <ResumeExperienceItem
                  key={`${experience.company}-${index}`}
                  experience={experience}
                />
              ))}
            </div>
          </ResumeSection>

          {projects.length ? (
            <ResumeSection number="03" title="프로젝트">
              <div>
                {projects.map((project, index) => (
                  <ResumePortfolioProjectItem key={`${project.title}-${index}`} project={project} />
                ))}
              </div>
            </ResumeSection>
          ) : null}

          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <ResumeSection
              number="04"
              title="스킬"
              className="resume-section-compact lg:col-span-2"
            >
              <div className="space-y-6">
                {resume.skills?.map((group: ResumeSkillGroup, index) => (
                  <div key={`${group.category}-${index}`}>
                    <h3 className="mb-3 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#737980]">
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items?.map((skill) => (
                        <span
                          className="rounded-full border border-[#dfe2e6] px-3 py-1.5 text-[12px] font-bold text-[#4d535a] dark:border-[#50545b] dark:text-[#d5d7da]"
                          key={skill}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ResumeSection>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <ResumeSection number="05" title="자격증" className="resume-section-compact">
              <div className="space-y-5">
                {resume.certifications?.map((item: ResumeCertification, index) => (
                  <article className="resume-avoid-break" key={`${item.title}-${index}`}>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-[16px] font-extrabold leading-[1.45] text-[#202328] dark:text-[#f4f4f5]">
                        {item.title}
                      </h3>
                      <time className="shrink-0 text-[11px] font-bold text-[#7d838a]">
                        {item.issued}
                      </time>
                    </div>
                    <p className="mt-1 text-[13px] font-semibold text-[#5e646b] dark:text-[#c5c7cb]">
                      {item.issuer} <span className="text-[#a0a5ab]">·</span> {item.type}
                    </p>
                  </article>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection number="06" title="링크" className="resume-section-compact">
              <div className="grid gap-3">
                {resume.links?.map((item, index) => (
                  <ResumeLinkItem item={item} key={`${item.label}-${index}`} />
                ))}
              </div>
            </ResumeSection>
          </div>
        </div>

        <footer className="resume-footer mt-14 border-t border-[#dfe2e6] pt-5 text-[11px] font-semibold text-[#8a9096] dark:border-[#41444a] dark:text-[#989da5]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>Last updated · 2026.08</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default AboutPage;

export const pageQuery = graphql`
  query AboutResumeQuery {
    site {
      siteMetadata {
        title
        description
        language
        siteUrl
        ogImage
        author {
          name
        }
        about {
          resume {
            role
            experience
            phone
            email
            introduction
            projects {
              title
              period
              description
              techStack
              thumbnailUrl
              thumbnailFit
              thumbnailBackground
              links {
                homepage
                github
                post
                demo
                chromeExtension
              }
            }
            experiences {
              mark
              company
              logo
              logoBackground
              period
              duration
              employmentType
              role
              level
              current
              projects {
                period
                title
                summary
                bullets
              }
            }
            skills {
              category
              items
            }
            certifications {
              issued
              title
              type
              issuer
            }
            links {
              label
              url
            }
          }
        }
      }
    }
  }
`;
