import React from 'react';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';


function TimeStampSection({ timestamps }) {
  if (!timestamps || timestamps.length < 2) return null;
  const reversedTimestamps = [...timestamps].reverse();
  return (
    <div className="flex flex-col items-center justify-center w-full mb-[50px] break-keep py-8">
      <SectionHeader title="Timestamps" />
      <div className="w-full px-[10px]">
        {reversedTimestamps.map((timestamp, index) =>
          index === reversedTimestamps.length - 1 ? null : (
            <div className="timestamp-item relative flex justify-items-center w-full py-[10px] border-l-2 border-[#bdbdbd] text-lg font-normal" key={index}>
              <div className={`absolute left-[-9px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] border-2 border-[#bdbdbd] rounded-full z-10 ${index === 0 ? 'animate-blink-black' : ''}`} style={{ backgroundColor: 'var(--background-color)' }}></div>
              <div className={`timestamp-date ml-[20px] mr-[5px] w-[115px] min-w-[115px] text-[#828282] self-center ${index === 0 ? 'text-black font-bold' : ''}`}>
                {timestamp.date}
              </div>
              <div className={`timestamp-activity flex items-center leading-[23px] w-full ${index === 0 ? 'font-bold' : ''}`}>
                <span className="mr-4">{timestamp.activity}</span>
                {timestamp.links && <IconButtonBar links={timestamp.links} className="inline-flex ml-2" />}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default TimeStampSection;
