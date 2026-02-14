import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';
import type { CareerItem } from '../../types/about';

interface TimeStampSectionProps {
  careers?: CareerItem[];
}

/**
 * @description 경력 타임라인 섹션
 * @param {TimeStampSectionProps} props 섹션 props
 * @return {JSX.Element | null}
 */
function TimeStampSection({ careers }: TimeStampSectionProps) {
  const [expandedPostMap, setExpandedPostMap] = useState<Record<number, boolean>>({});
  const [postPageMap, setPostPageMap] = useState<Record<number, number>>({});

  // 렌더링할 항목만 필터링
  const visibleCareers = (careers || []).filter(
    (career) => career && (career.date || career.label || career.activity),
  );
  if (!visibleCareers.length) return null;
  const orderedCareers = [...visibleCareers].reverse();

  /**
   * @description 활동 문자열을 기관/역할로 분리
   * @param {string} activity 활동 문자열
   * @return {{ institution: string; role: string }} 분리 결과
   */
  const splitActivity = (activity = ''): { institution: string; role: string } => {
    // 구분자가 있는 경우 기관/역할로 분해
    const [institution, role] = activity.split(' - ');
    if (role) {
      return { institution, role };
    }
    return { institution: '', role: activity };
  };

  /**
   * @description 게시일자를 YYYY.MM.DD 형식으로 변환
   */
  const formatPublishedDate = (publishedAt = ''): string => {
    if (!publishedAt) return '';
    const parsedDate = new Date(publishedAt);
    if (Number.isNaN(parsedDate.getTime())) return publishedAt;

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  /**
   * @description 게시글 접기/펼치기 상태 토글
   */
  const togglePostView = (index: number) => {
    setExpandedPostMap((prev) => {
      const nextExpanded = !prev[index];
      if (!nextExpanded) {
        setPostPageMap((prevPage) => ({ ...prevPage, [index]: 0 }));
      }
      return { ...prev, [index]: nextExpanded };
    });
  };

  /**
   * @description 게시글 페이지 변경
   */
  const changePostPage = (index: number, nextPage: number) => {
    setPostPageMap((prev) => ({ ...prev, [index]: nextPage }));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mb-[50px] break-keep py-8">
      <SectionHeader title="Career" />
      <div className="w-full px-[10px]">
        {orderedCareers.map((career, index) => {
          const isCurrent = career.status === 'ongoing';
          const { institution, role } = splitActivity(career.activity);
          const visiblePosts = (career.posts || []).filter((post) => post?.title && post?.url);
          const sortedPosts = [...visiblePosts].sort((a, b) => {
            const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return timeB - timeA;
          });
          const isExpanded = !!expandedPostMap[index];
          const totalPages = Math.max(1, Math.ceil(sortedPosts.length / 3));
          const currentPage = Math.min(postPageMap[index] || 0, totalPages - 1);
          const pageStart = currentPage * 3;
          const postsToShow = isExpanded
            ? sortedPosts.slice(pageStart, pageStart + 3)
            : sortedPosts.slice(0, 1);

          return (
            <div
              className="timestamp-item relative w-full py-[10px] pl-[20px] text-[15px] font-normal"
              key={`career-${index}`}
            >
              <span
                className="absolute left-0 top-0 h-full w-[2px] bg-[#bdbdbd]"
                aria-hidden="true"
              ></span>
              <span
                className={`absolute left-[-4px] top-[16px] h-[10px] w-[10px] rounded-full border ${isCurrent ? 'animate-pulse border-black bg-black dark:border-[#f3f4f6] dark:bg-[#f3f4f6]' : 'border-[#bdbdbd] bg-[var(--background-color)]'}`}
                aria-hidden="true"
              ></span>
              <div className="grid grid-cols-1 gap-y-1 md:grid-cols-[180px_1fr_auto] md:gap-x-4 md:items-center">
                <div
                  className={`timestamp-date text-[12px] text-[#828282] ${isCurrent ? 'text-black font-bold dark:text-[#f3f4f6]' : ''}`}
                >
                  {career.date}
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  {career.label ? (
                    <span
                      className={`inline-flex shrink-0 items-center rounded-[4px] border px-2 py-[2px] text-[11px] font-medium leading-none whitespace-nowrap ${isCurrent ? 'border-black text-black dark:border-[#e5e7eb] dark:text-[#f3f4f6]' : 'border-[#bdbdbd] text-[#828282]'}`}
                    >
                      {career.label}
                    </span>
                  ) : null}
                  <div
                    className={`min-w-0 text-[15px] leading-[1.5] ${isCurrent ? 'font-bold' : ''}`}
                  >
                    {role}
                  </div>
                </div>
                {career.links ? (
                  <div className="hidden md:flex md:justify-end">
                    <IconButtonBar links={career.links} className="inline-flex" />
                  </div>
                ) : null}
                {institution ? (
                  <div className="text-[13px] text-[#828282] md:col-start-1 md:col-end-2">
                    {institution}
                  </div>
                ) : null}
                {visiblePosts.length ? (
                  <div className="mt-2 md:col-start-2 md:col-end-4">
                    <div
                      className={`mb-2 flex items-center gap-2 ${isExpanded ? 'justify-between' : 'justify-end'}`}
                    >
                      {isExpanded ? (
                        <span className="text-[12px] font-medium text-[#6b7280] dark:text-[#a1a1aa]">
                          총 {sortedPosts.length}건
                        </span>
                      ) : null}
                      <button
                        className="inline-flex items-center gap-1 px-1 py-[6px] text-[12px] font-semibold text-[#4b5563] transition-colors duration-200 hover:text-[#111827] dark:text-[#d4d4d8] dark:hover:text-[#f5f5f5]"
                        onClick={() => togglePostView(index)}
                        type="button"
                      >
                        {isExpanded ? '접기' : '더보기'}
                        <FaChevronDown
                          className={`text-[11px] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      {postsToShow.map((post, postIndex) => (
                        <a
                          className="group relative flex w-full flex-col overflow-hidden rounded-[12px] border border-[#e4e4e7] bg-gradient-to-r from-[#faf7f2] via-white to-[#f5f7fb] transition-all duration-200 hover:border-[#d1d5db] hover:shadow-[0_10px_24px_rgba(17,24,39,0.08)] dark:border-[#3f3f46] dark:from-[#1f2937] dark:via-[#1f2937] dark:to-[#111827] dark:hover:border-[#6b7280] dark:hover:shadow-[0_10px_24px_rgba(2,6,23,0.45)] md:flex-row"
                          href={post.url}
                          key={`career-post-${index}-${postIndex}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {post.thumbnail ? (
                            <div className="h-[170px] w-full shrink-0 overflow-hidden bg-[#f3f4f6] md:h-[108px] md:w-[180px]">
                              <img
                                alt={post.title || '요즘IT 게시글 썸네일'}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                loading="lazy"
                                src={post.thumbnail}
                              />
                            </div>
                          ) : null}
                          <div className="flex min-h-[108px] flex-1 flex-col justify-between px-4 py-3">
                            <h4 className="text-[15px] font-semibold leading-[1.45] text-[var(--primary-text-color)]">
                              {post.title}
                            </h4>
                            <div className="mt-2 flex items-center justify-between gap-2 text-[12px] font-medium text-[#6b7280]">
                              <span>발행일 · {formatPublishedDate(post.publishedAt)}</span>
                              <span className="rounded-full bg-[#eef2ff] px-2 py-[2px] text-[11px] font-semibold text-[#4f46e5]">
                                요즘IT
                              </span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                    {isExpanded && totalPages > 1 ? (
                      <div className="mt-3 flex items-center justify-center gap-2">
                        <button
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d4d4d8] bg-white text-[13px] font-semibold text-[#4b5563] transition-colors duration-200 hover:border-[#9ca3af] hover:text-[#111827] disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={currentPage === 0}
                          onClick={() => changePostPage(index, Math.max(0, currentPage - 1))}
                          type="button"
                        >
                          {'<'}
                        </button>
                        <span className="text-[12px] font-medium text-[#6b7280]">
                          {currentPage + 1} / {totalPages}
                        </span>
                        <button
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d4d4d8] bg-white text-[13px] font-semibold text-[#4b5563] transition-colors duration-200 hover:border-[#9ca3af] hover:text-[#111827] disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={currentPage === totalPages - 1}
                          onClick={() =>
                            changePostPage(index, Math.min(totalPages - 1, currentPage + 1))
                          }
                          type="button"
                        >
                          {'>'}
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TimeStampSection;
