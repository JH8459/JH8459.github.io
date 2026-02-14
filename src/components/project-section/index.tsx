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

  return (
    <div className="flex flex-col justify-center items-center w-full py-8">
      <SectionHeader title="Projects" />
      <div className="mt-4 w-full">
        {projects.map((project, index) => {
          if (index === 0) return null;

          const techStack = project.techStack || [];
          const mobileTechStack = techStack.slice(0, 3);
          const hiddenMobileTechCount = Math.max(0, techStack.length - mobileTechStack.length);

          return (
            <div
              className="group w-full border-b border-[var(--post-card-border-color)] py-7"
              key={index}
            >
              <div className="flex items-start gap-5">
                <div className="min-w-0 flex-1">
                  <h3 className="text-[20px] font-semibold leading-[1.35] text-[var(--primary-text-color)] md:text-[24px]">
                    {project.title}
                  </h3>

                  <p
                    ref={(element) => {
                      descriptionRefs.current[index] = element;
                    }}
                    className="mt-3 text-[14px] font-normal leading-[1.75] text-[var(--secondary-text-color)] line-clamp-3"
                  >
                    {project.description}
                  </p>

                  <div className="mt-4 flex min-w-0 items-center justify-between gap-2">
                    <div className="min-w-0 flex-1 overflow-hidden text-[11px] font-medium text-[var(--secondary-text-color)]">
                      <div className="flex items-center gap-1.5 overflow-hidden md:hidden">
                        {mobileTechStack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="max-w-[90px] shrink-0 truncate rounded bg-[var(--button-background-color)] px-1.5 py-[1px]"
                            title={tech}
                          >
                            {tech}
                          </span>
                        ))}
                        {hiddenMobileTechCount > 0 && (
                          <span className="shrink-0 text-[11px]">+{hiddenMobileTechCount}</span>
                        )}
                      </div>

                      <div className="hidden flex-wrap items-center gap-1.5 md:flex">
                        {techStack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="rounded bg-[var(--button-background-color)] px-1.5 py-[1px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      {project.links && (
                        <IconButtonBar links={project.links} className="inline-flex" />
                      )}
                      {isDescriptionClamped[index] && (
                        <button
                          type="button"
                          onClick={() => setActiveProjectIndex(index)}
                          className="hidden text-[12px] font-medium text-[var(--link-text-color)] hover:underline md:inline-block"
                        >
                          더보기
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {project.thumbnailUrl && (
                  <div className="h-[92px] w-[92px] shrink-0 overflow-hidden rounded-md md:h-[140px] md:w-[140px]">
                    <Image
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      src={project.thumbnailUrl}
                      alt={project.title ?? 'project'}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {activeProjectIndex !== null && projects[activeProjectIndex] && (
        <div className="fixed inset-0 z-50 hidden items-center justify-center bg-black/50 px-4 md:flex">
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
                {projects[activeProjectIndex].techStack?.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="rounded bg-[var(--button-background-color)] px-1.5 py-[1px] text-[11px] font-medium text-[var(--secondary-text-color)]"
                  >
                    {tech}
                  </span>
                ))}
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
