import React, { useEffect, useRef, useState } from 'react';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';
import Image from '../image';
import type { ProjectItem } from '../../types/about';

interface ProjectSectionProps {
  projects?: ProjectItem[];
}

/**
 * @description 프로젝트 섹션
 * @param {ProjectSectionProps} props 프로젝트 섹션 props
 * @return {JSX.Element | null}
 */
function ProjectSection({ projects }: ProjectSectionProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [isDescriptionClamped, setIsDescriptionClamped] = useState<Record<number, boolean>>({});
  const descriptionRefs = useRef<Record<number, HTMLParagraphElement | null>>({});

  useEffect(() => {
    if (!projects || projects.length < 2) {
      return;
    }

    const updateClampState = () => {
      const nextState: Record<number, boolean> = {};
      projects.forEach((_, index) => {
        if (index === 0) return;
        const element = descriptionRefs.current[index];
        if (!element) return;
        nextState[index] = element.scrollHeight > element.clientHeight + 1;
      });
      setIsDescriptionClamped(nextState);
    };

    const frame = requestAnimationFrame(updateClampState);
    window.addEventListener('resize', updateClampState);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateClampState);
    };
  }, [projects]);

  // 샘플 항목을 제외하고 보여주기 위해 2개 이상일 때만 렌더링
  if (!projects || projects.length < 2) return null;

  const getTechTone = (tech: string) => {
    const value = tech.toLowerCase();

    const frontendKeywords = [
      'react',
      'next',
      'vue',
      'svelte',
      'gatsby',
      'angular',
      'storybook',
      'tailwind',
      'styled-components',
      'emotion',
      'html',
      'css',
      'javascript',
      'typescript',
      'redux',
    ];
    const backendKeywords = [
      'node',
      'express',
      'nest',
      'spring',
      'django',
      'flask',
      'fastapi',
      'rails',
      'laravel',
      'graphql',
      'java',
      'kotlin',
      'python',
      'go',
      'php',
      'c#',
      'dotnet',
      'postgres',
      'mysql',
      'mongodb',
      'redis',
    ];
    const infraKeywords = [
      'aws',
      'gcp',
      'azure',
      'docker',
      'kubernetes',
      'terraform',
      'ansible',
      'nginx',
      'vercel',
      'netlify',
      'cloudflare',
      'github actions',
      'ci',
      'cd',
    ];
    const mobileKeywords = ['react native', 'flutter', 'swift', 'kotlin', 'android', 'ios'];

    if (mobileKeywords.some((keyword) => value.includes(keyword))) return 'mobile';
    if (frontendKeywords.some((keyword) => value.includes(keyword))) return 'frontend';
    if (backendKeywords.some((keyword) => value.includes(keyword))) return 'backend';
    if (infraKeywords.some((keyword) => value.includes(keyword))) return 'infra';
    return 'default';
  };

  return (
    <div className="flex flex-col justify-center items-center w-full py-8">
      <SectionHeader title="Projects" />
      <div className="mt-6 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => {
          if (index === 0) return null;
          return (
            <div
              className="group flex flex-col overflow-hidden border border-[var(--post-card-border-color)] rounded-[8px] bg-[var(--background-color)] p-[16px] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#d1d5db] hover:shadow-[0_10px_24px_rgba(17,24,39,0.08)] md:aspect-square"
              key={index}
            >
              <h3 className="text-[16px] font-bold leading-[1.4] text-gray-900 dark:text-white">
                {project.title}
              </h3>
              {project.links && (
                <div className="mt-2 flex justify-end">
                  <IconButtonBar links={project.links} className="inline-flex space-x-3" />
                </div>
              )}
              {project.thumbnailUrl && (
                <div className="mt-3 flex justify-center w-full h-[120px] md:h-[40%] mb-3 overflow-hidden rounded-[6px]">
                  <Image
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    src={project.thumbnailUrl}
                    alt={project.title ?? 'project'}
                  />
                </div>
              )}
              {project.techStack && (
                <div className="mb-2 md:mb-3">
                  <div className="flex flex-nowrap gap-2 overflow-hidden">
                    {project.techStack.map((tech, techIndex) => {
                      const tone = getTechTone(tech);
                      const toneClassName =
                        tone === 'frontend'
                          ? 'bg-sky-100 text-sky-800 dark:bg-sky-800/70 dark:text-sky-100'
                          : tone === 'backend'
                            ? 'bg-slate-200 text-slate-700 dark:bg-slate-800/80 dark:text-slate-200'
                            : tone === 'infra'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-200'
                              : tone === 'mobile'
                                ? 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/60 dark:text-fuchsia-200'
                                : 'bg-[var(--chip-background-color)] text-[var(--primary-text-color)]';

                      return (
                        <span
                          key={techIndex}
                          className={`py-[2px] px-[6px] rounded-[10px] text-[11px] font-medium ${toneClassName}`}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="mt-2 md:mt-auto">
                <p
                  ref={(element) => {
                    descriptionRefs.current[index] = element;
                  }}
                  className="text-[13px] font-normal leading-[1.5] text-gray-700 dark:text-gray-300 line-clamp-3 md:line-clamp-4"
                >
                  {project.description}
                </p>
                {isDescriptionClamped[index] && (
                  <button
                    type="button"
                    onClick={() => setActiveProjectIndex(index)}
                    className="mt-2 ml-auto block text-[12px] font-medium text-[var(--link-text-color)] hover:underline"
                  >
                    더보기
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {activeProjectIndex !== null && projects[activeProjectIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-[640px] rounded-[10px] bg-[var(--background-color)] p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-[18px] font-bold text-gray-900 dark:text-white">
                  {projects[activeProjectIndex].title}
                </h4>
                {projects[activeProjectIndex].links && (
                  <div className="mt-2">
                    <IconButtonBar
                      links={projects[activeProjectIndex].links}
                      className="inline-flex space-x-3"
                    />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveProjectIndex(null)}
                className="text-[14px] font-medium text-[var(--link-text-color)] hover:underline"
              >
                닫기
              </button>
            </div>
            {projects[activeProjectIndex].thumbnailUrl && (
              <div className="mt-4 overflow-hidden rounded-[8px]">
                <Image
                  className="w-full max-h-[280px] object-cover"
                  src={projects[activeProjectIndex].thumbnailUrl}
                  alt={projects[activeProjectIndex].title ?? 'project'}
                />
              </div>
            )}
            {projects[activeProjectIndex].techStack && (
              <div className="mt-4 flex flex-wrap gap-2">
                {projects[activeProjectIndex].techStack?.map((tech, techIndex) => {
                  const tone = getTechTone(tech);
                  const toneClassName =
                    tone === 'frontend'
                      ? 'bg-sky-100 text-sky-800 dark:bg-sky-800/70 dark:text-sky-100'
                      : tone === 'backend'
                        ? 'bg-slate-200 text-slate-700 dark:bg-slate-800/80 dark:text-slate-200'
                        : tone === 'infra'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-200'
                          : tone === 'mobile'
                            ? 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/60 dark:text-fuchsia-200'
                            : 'bg-[var(--chip-background-color)] text-[var(--primary-text-color)]';

                  return (
                    <span
                      key={techIndex}
                      className={`py-[2px] px-[6px] rounded-[10px] text-[11px] font-medium ${toneClassName}`}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
            )}
            <p className="mt-4 text-[14px] leading-[1.6] text-gray-700 dark:text-gray-300">
              {projects[activeProjectIndex].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectSection;
