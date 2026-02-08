import React from 'react';
import { FaSpinner, FaEye } from 'react-icons/fa';

/**
 * @description 클라이언트 마운트 여부 체크
 * @return {boolean} 마운트 여부
 */
function useHasMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

interface ViewCountProps {
  viewCount?: number | string | null;
  allowZero?: boolean;
}

/**
 * @description 조회수 표시 컴포넌트
 * @param {ViewCountProps} props 조회수 props
 * @return {JSX.Element}
 */
export default function ViewCount({ viewCount, allowZero = false }: ViewCountProps) {
  const hasMounted = useHasMounted();
  const n = viewCount == null ? null : Number(viewCount);
  // 값이 유효하고 표시 조건을 만족하는지 판단
  const hasNumber = typeof n === 'number' && Number.isFinite(n) && (allowZero ? true : n > 0);
  const pending = !hasMounted || !hasNumber;
  const displayValue = typeof n === 'number' ? n : 0;

  return (
    <span className="inline-flex items-center" aria-live="polite" aria-busy={pending}>
      <FaEye className="w-4 h-4 mr-1" /> {/* Eye icon always visible */}
      {pending ? (
        <span className="flex items-center">
          <FaSpinner className="animate-spin text-[1em] text-[var(--secondary-text-color)] ml-1" />
        </span>
      ) : (
        <span className="flex items-center ml-1">{displayValue}</span>
      )}
    </span>
  );
}
