import React, { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../../utils/localStorage';

/**
 * @description 다크모드 토글 버튼
 * @return {JSX.Element}
 */
function ThemeSwitch() {
  // 로컬스토리지 초기값을 안전하게 파싱
  const storedValue = getValueFromLocalStorage('isDarkMode');
  const initialIsDarkMode = typeof storedValue === 'boolean' ? storedValue : false;
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialIsDarkMode);

  useEffect(() => {
    // 테마 상태를 로컬스토리지와 DOM 클래스에 반영
    setValueToLocalStorage('isDarkMode', isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="fixed bottom-[18px] right-[18px] z-30 flex items-center justify-center md:bottom-[22px] md:right-[22px]">
      <button
        className="z-30 flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full border border-[var(--post-card-border-color)] bg-[var(--background-color)] shadow-lg"
        onClick={() => setIsDarkMode((isDark) => !isDark)}
      >
        {isDarkMode ? (
          <MdLightMode className="h-5 w-5 text-yellow-500" />
        ) : (
          <MdDarkMode className="h-5 w-5 text-[var(--primary-text-color)]" />
        )}
      </button>
    </div>
  );
}

export default ThemeSwitch;
