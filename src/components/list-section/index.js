import React from 'react';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';

function ListSection({ title, items }) {
  const visibleItems = (items || []).filter(
    (item) => item && (item.title || item.description || item.date),
  );
  if (!visibleItems.length) return null;

  return (
    <div className="flex flex-col justify-center items-center w-full py-8">
      <SectionHeader title={title} />
      <div className="w-full px-[10px]">
        {visibleItems.map((item, index) => (
          <div className="flex flex-col mb-[18px] w-full" key={index}>
            <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
              {item.title ? (
                <h3 className="text-[18px] font-bold leading-[1.4] text-[var(--primary-text-color)]">
                  {item.title}
                </h3>
              ) : null}
              {item.date ? (
                <span className="text-[12px] text-[#828282] mt-[3px]">{item.date}</span>
              ) : null}
              {item.links ? (
                <IconButtonBar links={item.links} className="inline-flex ml-auto" />
              ) : null}
            </div>
            {item.description ? (
              <p className="text-[14px] font-normal leading-[1.6] text-gray-700 dark:text-gray-300 mt-[6px]">
                {item.description}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListSection;
