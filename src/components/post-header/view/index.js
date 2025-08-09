import React from 'react';
import { FaSpinner } from 'react-icons/fa';

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
    <span className="inline-flex items-center gap-1" aria-live="polite" aria-busy={pending}>
      {pending ? (
        <>
          <FaSpinner className="animate-spin text-[1em] text-[var(--secondary-text-color)]" />
          <span>views</span>
        </>
      ) : (
        <span>{`${n} views`}</span>
      )}
    </span>
  );
}
