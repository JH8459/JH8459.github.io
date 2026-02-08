import React, { useCallback } from 'react';
import { MdEmail, MdHome, MdDescription, MdPlayArrow } from 'react-icons/md';
import { FaGithub, FaAndroid, FaApple, FaLinkedin } from 'react-icons/fa';
import type { LinkSet } from '../../types/about';

interface IconButtonBarProps {
  links?: LinkSet;
  iconClass?: string;
  className?: string;
}

type IconKey = keyof LinkSet;

/**
 * @description 링크 아이콘 버튼 바
 * @param {IconButtonBarProps} props 아이콘 바 props
 * @return {JSX.Element}
 */
function IconButtonBar({
  links = {},
  iconClass = 'text-xl text-[var(--about-link-icon-color)]',
  className,
}: IconButtonBarProps) {
  /**
   * @description 아이콘 키에 맞는 컴포넌트 반환
   * @param {IconKey} icon 아이콘 키
   * @param {string} iconClassName 아이콘 클래스
   * @return {JSX.Element}
   */
  const IconPicker = useCallback((icon: IconKey, iconClassName: string) => {
    const props = {};
    switch (icon) {
      case 'homepage':
        return <MdHome {...props} className={iconClassName} />;
      case 'post':
        return <MdDescription {...props} className={iconClassName} />;
      case 'demo':
        return <MdPlayArrow {...props} className={iconClassName} />;
      case 'github':
        return <FaGithub {...props} className={iconClassName} />;
      case 'googlePlay':
        return <FaAndroid {...props} className={iconClassName} />;
      case 'appStore':
        return <FaApple {...props} className={iconClassName} />;
      case 'email':
        return <MdEmail {...props} className={iconClassName} />;
      case 'linkedIn':
        return <FaLinkedin {...props} className={iconClassName} />;
      default:
        return <></>;
    }
  }, []);

  return (
    <div className={`flex space-x-2 ${className ?? ''}`.trim()}>
      {Object.keys(links).map((link, index) => {
        const key = link as IconKey;
        const value = links[key];
        return (
          value && (
            <div key={index} className="relative group">
              {/* 메일 링크는 mailto로 처리 */}
              <a href={`${key === 'email' ? `mailto:` : ``}${value}`}>
                {IconPicker(key, iconClass)}
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {key}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}

export default IconButtonBar;
