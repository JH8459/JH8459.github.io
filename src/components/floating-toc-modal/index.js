import React from 'react';

function FloatingTocModal({ tableOfContents }) {
  if (!tableOfContents) {
    return null;
  }

  return (
    <div
      className="hidden lg:block fixed"
      style={{
        top: '200px', // Adjust this value based on your header height and desired offset
        left: 'calc(50% + 360px + 50px)', // 50% + max-w-content/2 + margin
        width: '200px',
        maxHeight: 'calc(100vh - 220px)', // Adjust based on top offset
        overflowY: 'auto',
      }}
      dangerouslySetInnerHTML={{ __html: tableOfContents }}
    />
  );
}

export default FloatingTocModal;
