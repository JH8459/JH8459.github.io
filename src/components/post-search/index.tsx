import React, { useState, useCallback } from 'react';
import { navigate } from 'gatsby';
import { FaSearch } from 'react-icons/fa';
import type { PostModel } from '../../types/post';

interface PostSearchProps {
  posts: PostModel[];
}

/**
 * @description 포스트 검색 입력
 * @param {PostSearchProps} props 검색 props
 * @return {JSX.Element}
 */
function PostSearch({ posts }: PostSearchProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<PostModel[]>([]);

  /**
   * @description 검색 입력 변경 처리
   * @param {React.ChangeEvent<HTMLInputElement>} event 입력 이벤트
   * @return {void}
   */
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);

      // 입력값이 있을 때만 검색 결과를 계산
      if (value) {
        const lowerValue = value.toLowerCase();
        const filtered = posts.filter(
          ({ title, categories }) =>
            title.toLowerCase().includes(lowerValue) ||
            (categories && categories.some((cat) => cat.toLowerCase().includes(lowerValue))),
        );
        setFilteredPosts(filtered);
      } else {
        setFilteredPosts([]);
      }
    },
    [posts],
  );

  /**
   * @description 검색 결과 클릭 처리
   * @param {string} slug 이동할 슬러그
   * @return {void}
   */
  const handleItemClick = useCallback((slug: string) => {
    // 검색 결과 클릭 시 이동 및 입력 초기화
    navigate(slug);
    setInputValue('');
    setFilteredPosts([]);
  }, []);

  return (
    <div className="search-input-wrapper relative hidden w-[220px] md:block">
      <div className="relative w-full">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요..."
          className="search-input h-full w-full rounded-md border border-[var(--post-card-border-color)] bg-transparent py-2 pl-9 pr-3 text-[13px] text-[var(--primary-text-color)] placeholder:text-[var(--secondary-text-color)] focus:border-[var(--primary-text-color)] focus:outline-none"
        />
        <FaSearch className="search-icon absolute left-3 top-1/2 mr-[2px] -translate-y-1/2 text-[12px] text-[var(--secondary-text-color)]" />
      </div>
      {inputValue && (
        <div className="absolute top-full z-10 w-full mt-1">
          {filteredPosts.length > 0 ? (
            <ul className="max-h-60 w-full overflow-y-auto rounded-md border border-[var(--post-card-border-color)] bg-[var(--background-color)] shadow-lg">
              {filteredPosts.map((post) => (
                <li
                  key={post.slug}
                  onClick={() => handleItemClick(post.slug)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleItemClick(post.slug);
                    }
                  }}
                  role="presentation"
                  className="cursor-pointer px-4 py-2 transition-colors duration-200 hover:bg-[var(--button-background-color)]"
                >
                  <div className="font-semibold text-[14px] mb-[2px] flex justify-between items-center">
                    <span>{post.title}</span>
                    {post.categories && post.categories.length > 0 && (
                      <span className="ml-auto text-[12px] text-[var(--secondary-text-color)]">
                        {post.categories[0]}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-md border border-[var(--post-card-border-color)] bg-[var(--background-color)] px-4 py-2 text-[13px] text-[var(--secondary-text-color)] shadow-lg">
              해당하는 글이 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default PostSearch;
