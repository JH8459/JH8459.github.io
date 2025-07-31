import React, { useCallback } from 'react';
import { MdEmail, MdHome, MdDescription, MdPlayArrow } from 'react-icons/md';
import { FaGithub, FaAndroid, FaApple, FaLinkedin } from 'react-icons/fa';

function IconButtonBar({ links = {}, iconClass = 'text-xl text-[var(--about-link-icon-color)]' }) {
  const IconPicker = useCallback((icon, iconClass) => {
    const props = {};
    switch (icon) {
      case 'homepage':
        return <MdHome {...props} className={iconClass} />;
      case 'post':
        return <MdDescription {...props} className={iconClass} />;
      case 'demo':
        return <MdPlayArrow {...props} className={iconClass} />;
      case 'github':
        return <FaGithub {...props} className={iconClass} />;
      case 'googlePlay':
        return <FaAndroid {...props} className={iconClass} />;
      case 'appStore':
        return <FaApple {...props} className={iconClass} />;
      case 'email':
        return <MdEmail {...props} className={iconClass} />;
      case 'linkedIn':
        return <FaLinkedin {...props} className={iconClass} />;
      default:
        return <></>;
    }
  }, []);

  return (
    <div className="flex space-x-2">
      {Object.keys(links).map((link, index) => {
        return (
          links[link] && (
            <div key={index} className="relative group">
              <a href={`${link === 'email' ? `mailto:` : ``}${links[link]}`}>
                {IconPicker(link, iconClass)}
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {link}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}

export default IconButtonBar;
