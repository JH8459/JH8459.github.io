import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import IconButtonBar from '../icon-button-bar';
import Image from '../image';
import type { AuthorMetadata } from '../../types/site';

interface BioProps {
  author?: AuthorMetadata;
  language?: string;
}

/**
 * @description 작성자 소개 섹션
 * @param {BioProps} props 작성자 소개 props
 * @return {JSX.Element | null}
 */
function Bio({ author, language = 'ko' }: BioProps) {
  if (!author) return null;
  const { bio, social, name } = author;
  return (
    <section className="bio w-full pb-10 pt-8 text-[var(--primary-text-color)] md:pb-14 md:pt-10">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_220px] md:items-stretch md:gap-10">
        {/* 언어에 따라 소개 문구 레이아웃 분기 */}
        {language === 'ko' ? (
          <div className="introduction korean mx-auto flex flex-col break-keep md:mx-0">
            <p className="text-[30px] font-medium leading-[1.24] tracking-[-0.02em] md:text-[44px]">
              안녕하세요.
              <br />
              <span className="title inline-block font-semibold text-[var(--primary-text-color)]">
                <ReactRotatingText
                  items={bio.description}
                  className="react-rotating-text-cursor text-[33px] leading-[1.2] md:text-[46px]"
                />
              </span>
              <br />
              {bio.role}{' '}
              <strong className="inline-block font-semibold text-[var(--primary-text-color)]">
                {name}
              </strong>
              입니다.
              <br />
            </p>
            <div className="social-links mt-6 flex">
              <IconButtonBar
                links={social}
                className="gap-2"
                iconClass="text-[24px] text-[var(--bio-link-icon-color)]"
              />
            </div>
          </div>
        ) : (
          <div className="introduction english mx-auto flex flex-col break-keep text-[25px] leading-[1.2] md:mx-0 md:text-[45px]">
            <p className="name text-[34px] font-semibold tracking-[-0.02em]">
              Hello,
              <br />
              my name is
              <br />
              <strong>{name}</strong>
              .<br />
            </p>
            <p className="job mt-1 text-[31px] text-[var(--content-text-color)] md:text-[40px]">
              I&#39;m a {bio.role} <ReactRotatingText items={bio.description} />
              <br />
            </p>
            <div className="social-links mt-6 flex">
              <IconButtonBar
                links={social}
                className="gap-2"
                iconClass="text-[24px] text-[var(--bio-link-icon-color)]"
              />
            </div>
          </div>
        )}
        <div className="thumbnail-wrapper mx-auto hidden h-full shrink-0 overflow-hidden rounded-2xl md:block md:w-[220px]">
          <Image
            className="h-full w-full rounded-2xl object-cover"
            src={bio.thumbnail}
            alt="thumbnail"
          />
        </div>
      </div>
    </section>
  );
}

export default Bio;
