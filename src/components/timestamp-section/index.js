import React from 'react';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';

function TimeStampSection({ careers }) {
  if (!careers || careers.length < 2) return null;
  const reversedCareers = [...careers].reverse();
  return (
    <div className="flex flex-col items-center justify-center w-full mb-[50px] break-keep py-8">
      <SectionHeader title="Career" />
      <div className="w-full px-[10px]">
        {reversedCareers.map((career, index) => {
          if (index === reversedCareers.length - 1) return null;
          const isCurrent = career.status === 'ongoing';
          return (
            <div
              className="timestamp-item relative flex justify-items-center w-full py-[10px] border-l-2 border-[#bdbdbd] text-lg font-normal"
              key={index}
            >
              <div
                className={`absolute left-[-9px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] border-2 border-[#bdbdbd] rounded-full z-10 ${isCurrent ? 'animate-blink-black' : ''}`}
                style={{ backgroundColor: 'var(--background-color)' }}
              ></div>
              <div
                className={`timestamp-date ml-[20px] mr-[5px] w-[115px] min-w-[115px] text-[#828282] self-center ${isCurrent ? 'text-black font-bold' : ''}`}
              >
                {career.date}
              </div>
              <div
                className={`timestamp-activity flex flex-row items-center gap-2 leading-[23px] w-full ${isCurrent ? 'font-bold' : ''}`}
              >
                {career.label ? (
                  <span
                    className={`inline-flex shrink-0 items-center rounded-[4px] border px-2 py-[2px] text-[11px] font-medium leading-none whitespace-nowrap ${isCurrent ? 'border-black text-black' : 'border-[#bdbdbd] text-[#828282]'}`}
                  >
                    {career.label}
                  </span>
                ) : null}
                <span
                  className={`mr-4 ${career.activity === 'Code States - Full Immersive 34th' ? 'whitespace-nowrap' : ''}`}
                >
                  {career.activity}
                </span>
                {career.links && (
                  <IconButtonBar links={career.links} className="inline-flex ml-auto" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TimeStampSection;
