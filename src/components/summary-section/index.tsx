import React from 'react';
import SectionHeader from '../section-header';

interface SummarySectionProps {
  summary?: string[] | string;
  title?: string;
}

const SUMMARY_INLINE_BREAK_REGEX = /\[br\]|<br\s*\/?\s*>/gi;

type SummaryRenderItem =
  | {
      type: 'text';
      value: string;
    }
  | {
      type: 'bullet';
      value: string;
    }
  | {
      type: 'break';
    };

/**
 * @description 요약 섹션
 * @param {SummarySectionProps} props 요약 섹션 props
 * @return {JSX.Element | null}
 */
function SummarySection({ summary = [], title = 'Summary' }: SummarySectionProps) {
  const rawItems = Array.isArray(summary) ? summary : [summary];
  const summaryItems = rawItems.reduce<SummaryRenderItem[]>((acc, item) => {
    const normalized = item?.trim().toLowerCase();
    if (
      !item ||
      normalized === '' ||
      normalized === '[br]' ||
      normalized === '<br>' ||
      normalized === '<br/>'
    ) {
      acc.push({ type: 'break' });
      return acc;
    }

    const text = item
      .split(SUMMARY_INLINE_BREAK_REGEX)
      .map((line) => line.trim())
      .filter((line) => line)
      .join('\n');

    if (!text) {
      acc.push({ type: 'break' });
      return acc;
    }

    if (text.startsWith('- ')) {
      acc.push({ type: 'bullet', value: text.replace(/^-\s*/, '') });
      return acc;
    }

    acc.push({ type: 'text', value: text });
    return acc;
  }, []);

  if (!summaryItems.length) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full mb-[50px] break-keep py-8">
      <SectionHeader title={title} />
      <div className="w-full px-[10px] text-[15px] leading-[1.7] text-[var(--primary-text-color)]">
        {summaryItems.map((item, index) =>
          item.type === 'break' ? (
            <div className="h-4" key={`summary-break-${index}`} />
          ) : item.type === 'bullet' ? (
            <div className="mb-3 last:mb-0 flex items-start gap-3" key={`summary-bullet-${index}`}>
              <span
                aria-hidden="true"
                className="mt-[10px] inline-block h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--primary-text-color)]"
              />
              <span className="whitespace-pre-line">{item.value}</span>
            </div>
          ) : (
            <p className="mb-3 last:mb-0 whitespace-pre-line" key={`summary-text-${index}`}>
              {item.value}
            </p>
          ),
        )}
      </div>
    </div>
  );
}

export default SummarySection;
