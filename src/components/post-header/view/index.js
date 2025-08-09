import React from 'react';
import { FaSpinner, FaEye } from 'react-icons/fa';

function useHasMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

export default function ViewCount({ viewCount, allowZero = false }) {
  const hasMounted = useHasMounted();
  const n = viewCount == null ? null : Number(viewCount);
  const hasNumber = Number.isFinite(n) && (allowZero ? true : n > 0);
  const pending = !hasMounted || !hasNumber;

  return (
    <span className="inline-flex items-center" aria-live="polite" aria-busy={pending}>
      <FaEye className="w-4 h-4 mr-1" /> {/* Eye icon always visible */}
      {pending ? (
        <span className="flex items-center">
          <FaSpinner className="animate-spin text-[1em] text-[var(--secondary-text-color)] ml-1" />
        </span>
      ) : (
        <span className="flex items-center ml-1">{n}</span>
      )}
    </span>
  );
}
