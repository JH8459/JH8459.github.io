import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';
import { FaEye, FaRegClock, FaCalendarAlt } from 'react-icons/fa';
import type { PostModel } from '../../types/post';
import type { GatsbyImageFile } from '../../types/image';

interface PostCardProps {
  post?: PostModel;
  defaultThumbnail?: GatsbyImageFile;
  isLoading?: boolean;
}

function PostCard({ post, defaultThumbnail, isLoading }: PostCardProps) {
  if (isLoading) {
    return (
      <div className="w-full border-b border-[var(--post-card-border-color)] py-7 animate-pulse">
        <div className="mb-3 h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-4 h-7 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-4 h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-4 h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex items-center gap-3">
          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 w-14 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const {
    id,
    slug,
    title,
    excerpt,
    date,
    categories,
    thumbnail,
    views,
    timeToRead,
    tableOfContents,
  } = post;
  const isNew =
    Math.ceil((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24)) <= 7;

  const isExternalImage =
    typeof thumbnail === 'string' &&
    (thumbnail.startsWith('http://') || thumbnail.startsWith('https://'));
  const displayImage: string | IGatsbyImageData | null = isExternalImage
    ? thumbnail
    : (defaultThumbnail?.childImageSharp?.gatsbyImageData ?? null);

  const normalizeHeading = (value: string) =>
    value
      .replace(/<[^>]+>/g, ' ')
      .replace(/[*_`~#>|-]/g, ' ')
      .replace(/[^\w\s가-힣]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const removeEmojiText = (text: string) =>
    text
      .replace(/&#x([0-9a-f]+);/gi, (match, hex: string) => {
        const codePoint = Number.parseInt(hex, 16);
        const isEmojiCodePoint =
          (codePoint >= 0x1f300 && codePoint <= 0x1faff) ||
          (codePoint >= 0x2600 && codePoint <= 0x27bf) ||
          codePoint === 0xfe0f ||
          codePoint === 0x200d;
        return isEmojiCodePoint ? '' : match;
      })
      .replace(/&#([0-9]+);/g, (match, decimal: string) => {
        const codePoint = Number.parseInt(decimal, 10);
        const isEmojiCodePoint =
          (codePoint >= 0x1f300 && codePoint <= 0x1faff) ||
          (codePoint >= 0x2600 && codePoint <= 0x27bf) ||
          codePoint === 0xfe0f ||
          codePoint === 0x200d;
        return isEmojiCodePoint ? '' : match;
      })
      .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
      .replace(/[\u2600-\u27BF]/g, '')
      .replace(/\uFE0F/g, '')
      .replace(/\u200D/g, '');

  const tocHeadings = Array.from((tableOfContents ?? '').matchAll(/<a[^>]*>(.*?)<\/a>/gi))
    .map(([, heading]) =>
      heading
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim(),
    )
    .filter(Boolean);

  const headingCandidates = Array.from(
    new Set(
      tocHeadings.flatMap((heading) => {
        const normalized = normalizeHeading(heading);
        return normalized && normalized !== heading ? [heading, normalized] : [heading];
      }),
    ),
  );

  const previewBaseText = (excerpt ?? '')
    .replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s{0,3}#{1,6}\s+.*$/gm, ' ')
    .replace(/\n+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const previewText = headingCandidates
    .reduce((text, heading) => {
      const escapedTokens = heading
        .split(/\s+/)
        .filter(Boolean)
        .map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      if (!escapedTokens.length) return text;
      const escapedHeading = escapedTokens.join('\\s+');
      return text.replace(new RegExp(`(^|\\s)${escapedHeading}(?=\\s|$|[.,:;!?])`, 'gi'), '$1');
    }, previewBaseText)
    .replace(/\b[\w-]+\.(?:png|jpe?g|gif|webp|svg|avif)\b/gi, ' ')
    .replace(/\b[\w-]+\s+(?:png|jpe?g|gif|webp|svg|avif)\b/gi, ' ')
    .replace(/\bToday\s+I\s+Learn(?:ed)?\b/gi, ' ')
    .replace(/\bOverview\b/gi, ' ')
    .replace(/\bUnderstanding\b/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const sanitizedPreviewText = removeEmojiText(previewText)
    .replace(/\s{2,}/g, ' ')
    .trim();

  return (
    <article className="w-full border-b border-[var(--post-card-border-color)] py-7">
      <Link className="group block text-[var(--primary-text-color)]" key={id} to={slug}>
        <div className="flex gap-5">
          <div className="min-w-0 flex-1">
            <h2 className="mb-3 text-[20px] font-bold leading-[1.35] tracking-[-0.015em] transition-colors duration-200 group-hover:text-[var(--tab-hover-text-color)] md:text-[25px]">
              {title}
              {isNew && (
                <span className="ml-2 inline-flex rounded-md bg-red-50 px-1.5 py-[1px] align-middle text-[10px] font-bold uppercase tracking-[0.06em] text-red-500 dark:bg-red-900/30 dark:text-red-300">
                  New
                </span>
              )}
            </h2>

            <p className="line-clamp-3 text-[14px] leading-[1.75] text-[var(--secondary-text-color)] md:text-[15px]">
              {sanitizedPreviewText}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex min-w-0 flex-wrap items-center gap-1.5 text-[11px] font-medium text-[var(--secondary-text-color)]">
                {categories.map((category) => (
                  <span
                    className="rounded bg-[var(--button-background-color)] px-1.5 py-[1px]"
                    key={category}
                  >
                    {category}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 text-[11px] font-medium text-[var(--secondary-text-color)]">
                {timeToRead && (
                  <span className="inline-flex items-center whitespace-nowrap">
                    <FaRegClock className="mr-1" /> {timeToRead} min
                  </span>
                )}
                {views && views > 0 && (
                  <span className="inline-flex items-center whitespace-nowrap">
                    <FaEye className="mr-1" /> {views}
                  </span>
                )}
                <span className="inline-flex items-center whitespace-nowrap">
                  <FaCalendarAlt className="mr-1 h-3.5 w-3.5" /> {date}
                </span>
              </div>
            </div>
          </div>

          {(isExternalImage || displayImage) && (
            <div className="h-[92px] w-[92px] shrink-0 overflow-hidden rounded-md md:h-[140px] md:w-[140px]">
              {isExternalImage ? (
                <img
                  src={displayImage as string}
                  alt={title}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                />
              ) : (
                <GatsbyImage
                  image={displayImage as IGatsbyImageData}
                  alt={title}
                  className="h-full w-full"
                  imgClassName="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                />
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

export default PostCard;
