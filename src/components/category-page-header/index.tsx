import React from 'react';

interface CategoryPageHeaderProps {
  title: string;
  subtitle: string;
}

/**
 * @description 카테고리 페이지 헤더
 * @param {CategoryPageHeaderProps} props 헤더 props
 * @return {JSX.Element}
 */
function CategoryPageHeader({ title, subtitle }: CategoryPageHeaderProps) {
  return (
    <div className="mt-8 mb-4 w-full pb-5">
      <h1 className="mb-2 text-[34px] font-extrabold tracking-[-0.02em] text-[var(--primary-text-color)] md:text-[40px]">
        {title}
      </h1>
      <p className="text-[14px] font-semibold uppercase tracking-[0.08em] text-[var(--secondary-text-color)]">
        {subtitle}
      </p>
    </div>
  );
}

export default CategoryPageHeader;
