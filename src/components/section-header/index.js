import React from 'react';


function SectionHeader({ title }) {
  return (
    <div className="flex justify-center w-full mb-[32px]">
      <h2 className="pb-[5px] border-b-[4px] border-[var(--primary-text-color)] font-bold text-[30px] text-[var(--primary-text-color)]">{title}</h2>
    </div>
  );
}

export default SectionHeader;
