import React from 'react';

interface SectionHeaderProps {
  title: string;
}

/**
 * @description 섹션 제목 영역
 * @param {SectionHeaderProps} props 섹션 제목 props
 * @return {JSX.Element}
 */
function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex justify-center w-full mb-[32px]">
      <h2 className="pb-[5px] border-b-[4px] border-[var(--primary-text-color)] font-bold text-[30px] text-[var(--primary-text-color)]">
        {title}
      </h2>
    </div>
  );
}

export default SectionHeader;
