import React from 'react';

function CategoryPageHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center mt-[30px] mb-[30px]">
      <h1 className="w-fit pb-[7px] mb-[15px] text-[40px] font-bold text-center border-b-[3px] border-[var(--primary-text-color)]">
        {title}
      </h1>
      <p className="pb-[10px] text-[20px] font-medium text-center">{subtitle}</p>
    </div>
  );
}

export default CategoryPageHeader;
