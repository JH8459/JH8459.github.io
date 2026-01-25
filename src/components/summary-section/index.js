import React from 'react';
import SectionHeader from '../section-header';

function SummarySection({ summary = [], title = 'Summary' }) {
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
