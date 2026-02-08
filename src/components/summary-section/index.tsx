import React from 'react';
import SectionHeader from '../section-header';

interface SummarySectionProps {
  summary?: string[] | string;
  title?: string;
}

/**
 * @description 요약 섹션
 * @param {SummarySectionProps} props 요약 섹션 props
 * @return {JSX.Element | null}
 */
function SummarySection({ summary = [], title = 'Summary' }: SummarySectionProps) {
  // 빈 값 제거 후 렌더링 대상만 추출
  const summaryItems = (Array.isArray(summary) ? summary : [summary]).filter(
    (item) => item && item.trim(),
  );
  if (!summaryItems.length) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full mb-[50px] break-keep py-8">
      <SectionHeader title={title} />
      <div className="w-full px-[10px] text-[15px] leading-[1.7] text-[var(--primary-text-color)]">
        {summaryItems.map((paragraph, index) => (
          <p className="mb-3 last:mb-0" key={`summary-${index}`}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SummarySection;
