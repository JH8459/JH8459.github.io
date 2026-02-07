import React from 'react';

function PostContent({ html }) {
  return (
    <div className="flex flex-col justify-center w-full mb-[20px]">
      <div
        className="prose dark:prose-invert prose-img:mx-auto mx-auto w-full max-w-[720px]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export default PostContent;
