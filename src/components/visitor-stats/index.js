import React from 'react';

const formatCount = (value, locale) => {
  if (!Number.isFinite(value)) {
    return '-';
  }
  return new Intl.NumberFormat(locale).format(value);
};

function VisitorStats({ stats, language = 'ko' }) {
  const locale = language === 'ko' ? 'ko-KR' : 'en-US';
  const today = typeof stats?.today === 'number' ? stats.today : null;
  const total = typeof stats?.total === 'number' ? stats.total : null;

  return (
    <div className="flex flex-col items-end text-right text-[12px] md:text-[13px] text-[var(--secondary-text-color)]">
      <div className="flex items-center justify-end gap-3">
        <span className="min-w-[44px] text-[11px] md:text-[12px]">today</span>
        <span className="tabular-nums text-[13px] md:text-[14px] font-semibold text-[var(--primary-text-color)]">
          {formatCount(today, locale)}
        </span>
      </div>
      <div className="flex items-center justify-end gap-3">
        <span className="min-w-[44px] text-[11px] md:text-[12px]">total</span>
        <span className="tabular-nums text-[13px] md:text-[14px] font-semibold text-[var(--primary-text-color)]">
          {formatCount(total, locale)}
        </span>
      </div>
    </div>
  );
}

export default VisitorStats;
