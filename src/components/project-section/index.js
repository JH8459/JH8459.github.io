import React from 'react';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';
import Image from '../image';

function ProjectSection({ projects }) {
  if (!projects || projects.length < 2) return null;
  return (
    <div className="flex flex-col justify-center items-center w-full py-8">
      <SectionHeader title="Projects" />
      {projects.map((project, index) =>
        index === 0 ? null : (
          <div className="flex flex-col mb-[30px] p-[15px] w-full" key={index}>
            <div className="flex items-center mb-[10px]">
              <h3 className="text-[18px] font-bold leading-[30px] text-gray-900 dark:text-white mr-4">
                {project.title}
              </h3>
              {project.links && (
                <IconButtonBar links={project.links} className="inline-flex space-x-4" />
              )}
            </div>
            <div className="hidden md:flex justify-center w-full mb-[10px]">
              <Image
                className="w-full max-w-[720px] h-[260px] object-cover"
                src={project.thumbnailUrl}
                alt={project.title}
              />
            </div>
            {project.techStack && (
              <div className="flex flex-wrap gap-2 mb-[10px]">
                {project.techStack.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="py-[5px] px-[7px] bg-[var(--chip-background-color)] rounded-[10px] text-[14px] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <p className="text-[14px] font-normal leading-[1.4] text-gray-700 dark:text-gray-300">
              {project.description}
            </p>
          </div>
        ),
      )}
    </div>
  );
}

export default ProjectSection;
