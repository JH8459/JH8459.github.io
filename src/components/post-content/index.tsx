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
    <div className="mb-[20px] flex w-full flex-col justify-center pt-8">
      <div
        className="prose dark:prose-invert prose-img:mx-auto prose-headings:tracking-[-0.015em] prose-p:leading-[1.9] mx-auto w-full max-w-[760px]"
        dangerouslySetInnerHTML={{ __html: html ?? '' }}
      />
    </div>
  );
}

export default PostContent;
