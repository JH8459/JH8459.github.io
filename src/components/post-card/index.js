import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FaEye, FaRegClock, FaCalendarAlt } from 'react-icons/fa';


function PostCard({ post, defaultThumbnail, isLoading }) {
  if (isLoading) {
    return (
      <div className="min-h-[150px] w-full flex justify-center">
        <div className="post-card flex flex-col h-auto w-full max-w-content border border-[var(--post-card-border-color)] rounded-[6px] p-[15px] mb-[15px] md:mb-0 animate-pulse">
          {/* Title Placeholder */}
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          {/* Image and Excerpt Placeholder */}
          <div className="flex flex-grow mt-[10px]">
            <div className="w-[100px] h-[100px] min-w-[100px] mr-[15px] bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
          {/* Info Placeholder */}
          <div className="flex justify-between mt-auto pt-[10px]">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
          </div>
        </div>
      </div>
    );
  }

  // Original PostCard content
  const { id, slug, title, excerpt, date, categories, thumbnail, views, timeToRead } = post;
  const isNew = Math.ceil((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24)) <= 7;

  const isExternalImage = typeof thumbnail === 'string' && (thumbnail.startsWith('http://') || thumbnail.startsWith('https://'));
  const displayImage = isExternalImage ? thumbnail : (defaultThumbnail ? getImage(defaultThumbnail) : null);

  return (
    <div className="min-h-[150px] w-full flex justify-center">
      <Link className="post-card flex flex-col h-auto w-full max-w-content border border-[var(--post-card-border-color)] rounded-[6px] p-[15px] mb-[15px] text-[var(--primary-text-color)] cursor-pointer transition-transform duration-200 hover:scale-105 md:mb-0" key={id} to={slug}>
        <h2 class="title text-[18px] font-semibold mb-[7px] leading-[1.4] hover:underline">
          {title}
          {isNew && (
            <span
              class="inline-block align-super text-red-500 font-bold text-xs"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)', marginLeft: '4px' }}
            >
              N
            </span>
          )}
        </h2>

        <div className="flex flex-grow mt-[10px]">
          {(isExternalImage || displayImage) && (
            <div className="w-[100px] h-[100px] min-w-[100px] mr-[15px] overflow-hidden rounded-[4px] flex justify-center items-center">
              {isExternalImage ? (
                <img src={displayImage} alt={title} className="w-full h-full object-cover object-center" />
              ) : (
                <GatsbyImage image={displayImage} alt={title} className="w-full h-full object-cover object-center" />
              )}
            </div>
          )}
          <p
            className={`description text-[13px] leading-[20px] text-[var(--primary-text-color)] overflow-hidden text-ellipsis line-clamp-3 md:line-clamp-4 ${isExternalImage ? '' : 'w-full'}`}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>

        <div className="info flex justify-between mt-auto text-[14px] text-[var(--about-link-icon-color)] pt-[10px]">
          <div className="categories flex">
            {categories.map((category) => (
              <span
                className="category mr-[4px] hover:underline"
                key={category}
              >
                {category}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            {timeToRead && (
              <div className="flex items-center">
                <FaRegClock className="mr-1" /> {timeToRead} min
              </div>
            )}
            {views > 0 && (
              <div className="flex items-center">
                <FaEye className="mr-1" /> {views}
              </div>
            )}
            <div className="flex items-center">
              <FaCalendarAlt className="w-4 h-4 mr-1" /> {date}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
