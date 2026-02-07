import React from 'react';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';

function TimeStampSection({ careers }) {
  const visibleCareers = (careers || []).filter(
    (career) => career && (career.date || career.label || career.activity),
  );
  if (!visibleCareers.length) return null;
  const orderedCareers = [...visibleCareers].reverse();

  const splitActivity = (activity = '') => {
    const [institution, role] = activity.split(' - ');
    if (role) {
      return { institution, role };
    }
    return { institution: '', role: activity };
  };
  return (
    <div className="flex flex-col items-center justify-center w-full mb-[50px] break-keep py-8">
      <SectionHeader title="Career" />
      <div className="w-full px-[10px]">
        {orderedCareers.map((career, index) => {
          const isCurrent = career.status === 'ongoing';
          const { institution, role } = splitActivity(career.activity);
          return (
            <div
              className="timestamp-item relative w-full py-[10px] pl-[20px] text-[15px] font-normal"
              key={`career-${index}`}
            >
              <span
                className="absolute left-0 top-0 h-full w-[2px] bg-[#bdbdbd]"
                aria-hidden="true"
              ></span>
              <span
                className={`absolute left-[-4px] top-[16px] h-[10px] w-[10px] rounded-full border ${isCurrent ? 'animate-blink-black border-black bg-black' : 'border-[#bdbdbd] bg-[var(--background-color)]'}`}
                aria-hidden="true"
              ></span>
              <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[180px_1fr_auto] md:gap-x-4 md:items-center">
                <div
                  className={`timestamp-date text-[12px] text-[#828282] ${isCurrent ? 'text-black font-bold' : ''}`}
                >
                  {career.date}
                  {institution && (
                    <div className="mt-[4px] text-[13px] text-[#828282]">{institution}</div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  {career.label ? (
                    <span
                      className={`inline-flex shrink-0 items-center rounded-[4px] border px-2 py-[2px] text-[11px] font-medium leading-none whitespace-nowrap ${isCurrent ? 'border-black text-black' : 'border-[#bdbdbd] text-[#828282]'}`}
                    >
                      {career.label}
                    </span>
                  ) : null}
                  <div
                    className={`min-w-0 text-[15px] leading-[1.5] ${isCurrent ? 'font-bold' : ''}`}
                  >
                    {role}
                  </div>
                </div>
                {career.links ? (
                  <div className="hidden md:flex md:justify-end">
                    <IconButtonBar links={career.links} className="inline-flex" />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TimeStampSection;
