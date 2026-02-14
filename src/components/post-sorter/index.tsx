import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';

type SortType = 'date-desc' | 'views-desc' | 'title-asc' | 'date-asc';

interface SortOption {
  value: SortType;
  label: string;
}

const options: SortOption[] = [
  { value: 'date-desc', label: '최신순' },
  { value: 'views-desc', label: '조회순' },
  { value: 'title-asc', label: '이름순' },
];

interface PostSorterProps {
  sortType: SortType;
  onChange: (event: { target: { value: SortType } }) => void;
}

/**
 * @description 포스트 정렬 드롭다운
 * @param {PostSorterProps} props 정렬 props
 * @return {JSX.Element}
 */
function PostSorter({ sortType, onChange }: PostSorterProps) {
  // 현재 정렬 옵션을 선택 상태로 유지
  const selectedOption = options.find((opt) => opt.value === sortType) ?? options[0];

  /**
   * @description Listbox 변경 시 외부 핸들러 호출
   * @param {SortOption} option 선택된 옵션
   * @return {void}
   */
  const handleChange = (option: SortOption) => {
    onChange({ target: { value: option.value } });
  };

  return (
    <div className="text-right">
      <Listbox value={selectedOption} onChange={handleChange}>
        <div className="relative inline-block w-[108px]">
          <Listbox.Button className="relative w-full cursor-default rounded-md border border-[var(--post-card-border-color)] bg-transparent py-1.5 pl-3 pr-8 text-left text-[13px] font-semibold text-[var(--secondary-text-color)] focus:outline-none focus-visible:border-[var(--primary-text-color)] sm:text-sm">
            <span className="block truncate">{selectedOption.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown
                className="h-3.5 w-3.5 text-[var(--secondary-text-color)]"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-[var(--post-card-border-color)] bg-[var(--background-color)] py-1 text-base shadow-lg focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active, selected }) => {
                    const baseClasses = 'relative cursor-default select-none py-2 px-4 text-center';
                    let stateClasses = '';

                    if (selected) {
                      stateClasses =
                        'bg-[var(--button-background-color)] text-[var(--primary-text-color)]';
                    } else if (active) {
                      stateClasses =
                        'bg-[var(--button-background-color)] text-[var(--primary-text-color)]';
                    }

                    return `${baseClasses} ${stateClasses}`;
                  }}
                  value={option}
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-bold' : 'font-normal'}`}>
                      {option.label}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default PostSorter;
