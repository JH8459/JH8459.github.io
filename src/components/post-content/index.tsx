import React from 'react';

interface PostContentProps {
  html?: string;
}

/**
 * @description 포스트 본문 영역
 * @param {PostContentProps} props 본문 props
 * @return {JSX.Element}
 */
function PostContent({ html }: PostContentProps) {
  return (
    <div className="flex flex-col justify-center w-full mb-[20px]">
      <div
        className="prose dark:prose-invert prose-img:mx-auto mx-auto w-full max-w-[720px]"
        dangerouslySetInnerHTML={{ __html: html ?? '' }}
      />
    </div>
  );
}

export default PostContent;
