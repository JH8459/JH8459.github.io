import React from 'react';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';

function EducationCertificationSection({ education = [], certifications = [] }) {
  const visibleEducation = (education || [])
    .filter((item) => item && (item.date || item.title || item.institution))
    .reverse();
  const visibleCertifications = (certifications || [])
    .filter((item) => item && (item.issued || item.title || item.issuer))
    .reverse();

  if (!visibleEducation.length && !visibleCertifications.length) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full mb-[50px] break-keep py-8">
      <SectionHeader title="Education & Certification" />
      <div className="w-full px-[10px]">
        <div className="mx-auto w-full max-w-[720px]">
          {visibleEducation.length > 0 && (
            <div className="mb-[28px]">
              <h3 className="mb-3 text-[16px] font-semibold text-[var(--primary-text-color)]">
                Education
              </h3>
              {visibleEducation.map((item, index) => (
                <div
                  className="relative w-full py-[10px] pl-[20px] text-[15px] font-normal"
                  key={`education-${index}`}
                >
                  <span
                    className="absolute left-0 top-0 h-full w-[2px] bg-[#bdbdbd]"
                    aria-hidden="true"
                  ></span>
                  <span
                    className="absolute left-[-4px] top-[16px] h-[10px] w-[10px] rounded-full border border-[#bdbdbd] bg-[var(--background-color)]"
                    aria-hidden="true"
                  ></span>
                  <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[180px_1fr_auto] md:gap-x-4 md:gap-y-1">
                    <div className="text-[12px] text-[#828282] md:col-span-1">{item.date}</div>
                    <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-1 md:col-span-1">
                      <span className="inline-flex shrink-0 items-center rounded-[4px] border border-[#bdbdbd] px-2 py-[2px] text-[11px] font-medium leading-none whitespace-nowrap text-[#828282]">
                        교육
                      </span>
                      <div className="min-w-0 text-[15px] leading-[1.5]">{item.title}</div>
                    </div>
                    {item.links ? (
                      <div className="hidden md:flex md:col-span-1 md:justify-end">
                        <IconButtonBar links={item.links} className="inline-flex" />
                      </div>
                    ) : null}
                    {item.institution ? (
                      <div className="text-[13px] text-[#828282] md:col-start-1 md:col-end-2">
                        {item.institution}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
          {visibleCertifications.length > 0 && (
            <div>
              <h3 className="mb-3 text-[16px] font-semibold text-[var(--primary-text-color)]">
                Certification
              </h3>
              {visibleCertifications.map((item, index) => (
                <div
                  className="relative w-full py-[10px] pl-[20px] text-[15px] font-normal"
                  key={`certification-${index}`}
                >
                  <span
                    className="absolute left-0 top-0 h-full w-[2px] bg-[#bdbdbd]"
                    aria-hidden="true"
                  ></span>
                  <span
                    className="absolute left-[-4px] top-[16px] h-[10px] w-[10px] rounded-full border border-[#bdbdbd] bg-[var(--background-color)]"
                    aria-hidden="true"
                  ></span>
                  <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[180px_1fr_auto] md:gap-x-4 md:gap-y-1">
                    <div className="text-[12px] text-[#828282] md:col-span-1">{item.issued}</div>
                    <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-1 md:col-span-1">
                      <span className="inline-flex shrink-0 items-center rounded-[4px] border border-[#bdbdbd] px-2 py-[2px] text-[11px] font-medium leading-none whitespace-nowrap text-[#828282]">
                        자격증
                      </span>
                      <div className="min-w-0 text-[15px] leading-[1.5]">{item.title}</div>
                    </div>
                    {item.links ? (
                      <div className="hidden md:flex md:col-span-1 md:justify-end">
                        <IconButtonBar links={item.links} className="inline-flex" />
                      </div>
                    ) : null}
                    {item.issuer ? (
                      <div className="text-[13px] text-[#828282] md:col-start-1 md:col-end-2">
                        {item.issuer}
                      </div>
                    ) : null}
                    {item.credentialId ? (
                      <div className="text-[12px] text-[#9a9a9a] md:col-start-1 md:col-end-2">
                        식별번호 {item.credentialId}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EducationCertificationSection;
