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
    <div className="fixed bottom-[20px] right-[20px] flex items-center justify-center">
      <button
        className="w-[50px] h-[50px] rounded-full bg-[#363f47] cursor-pointer shadow-xl backdrop-blur-md z-30 flex items-center justify-center"
        onClick={() => setIsDarkMode((isDark) => !isDark)}
      >
        {isDarkMode ? (
          <MdLightMode className="w-6 h-6 text-yellow-500" />
        ) : (
          <MdDarkMode className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}

export default ThemeSwitch;
