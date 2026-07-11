import React, { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../../utils/localStorage';

/**
 * @description 다크모드 토글 버튼
 * @return {JSX.Element}
 */
function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    () => getValueFromLocalStorage('isDarkMode') === true,
  );

  useEffect(() => {
    setValueToLocalStorage('isDarkMode', isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  /**
   * @description 다크모드 상태를 전환하고 브라우저에 저장
   * @return {void}
   */
  const onThemeToggle = () => {
    setIsDarkMode((currentIsDarkMode) => !currentIsDarkMode);
  };

  return (
    <div className="fixed bottom-[18px] right-[18px] z-30 flex items-center justify-center md:bottom-[22px] md:right-[22px]">
      <button
        aria-label="테마 전환"
        className="z-30 flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full border border-[var(--post-card-border-color)] bg-[var(--background-color)] shadow-lg"
        onClick={onThemeToggle}
        type="button"
      >
        <MdLightMode aria-hidden="true" className="hidden h-5 w-5 text-yellow-500 dark:block" />
        <MdDarkMode
          aria-hidden="true"
          className="block h-5 w-5 text-[var(--primary-text-color)] dark:hidden"
        />
      </button>
    </div>
  );
}

export default ThemeSwitch;
