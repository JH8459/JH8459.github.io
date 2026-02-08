/**
 * @description 로컬스토리지에서 값을 가져옴
 * @param {string} key 로컬스토리지 키
 * @return {unknown} 저장된 값
 */
export function getValueFromLocalStorage(key: string): unknown {
  if (typeof window === 'undefined') return undefined;
  const rawValue = window.localStorage.getItem(key);
  return rawValue ? JSON.parse(rawValue) : undefined;
}

/**
 * @description 로컬스토리지에 값을 저장
 * @param {string} key 로컬스토리지 키
 * @param {unknown} value 저장할 값
 * @return {void}
 */
export function setValueToLocalStorage(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}
