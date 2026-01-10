import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import IconButtonBar from '../icon-button-bar';
import Image from '../image';
import VisitorStats from '../visitor-stats';


function Bio({ author, language = 'ko', visitorStats }) {
  if (!author) return null;
  const { bio, social, name } = author;
  const socialRow = (
    <div className="mt-[20px] flex w-full items-start justify-between gap-4">
      <div className="social-links flex justify-start">
        <IconButtonBar links={social} iconClass="text-[30px] text-[var(--bio-link-icon-color)]" />
      </div>
      <VisitorStats stats={visitorStats} language={language} />
    </div>
  );
  return (
    <div className="bio flex flex-col justify-between w-full mt-[120px] mb-[120px] text-[var(--primary-text-color)] md:flex-row md:items-center">
      {language === 'ko' ? (
        <div className="introduction korean flex flex-col word-break-keep-all mx-auto md:mx-0">
          <p className="font-thin text-[32px] leading-[1.2] md:text-[40px]">
            안녕하세요.
            <br />
            <span className="title">
              <ReactRotatingText items={bio.description} className="react-rotating-text-cursor text-[35px] leading-[35px] md:text-[45px] md:leading-[45px]" />
            </span>
            <br />
            {bio.role} <strong className="inline-block font-semibold">{name}</strong>입니다.
            <br />
          </p>
          {socialRow}
        </div>
      ) : (
        <div className="introduction english flex flex-col word-break-keep-all font-montserrat text-[25px] leading-[1.2] md:text-[45px] mx-auto md:mx-0">
          <p className="name text-[35px] font-semibold">
            Hello,
            <br />
            my name is
            <br />
            <strong>{name}</strong>
            .<br />
          </p>
          <p className="job text-[35px] text-lg text-gray-700 dark:text-gray-300">
            I'm a {bio.role} <ReactRotatingText items={bio.description} />
            <br />
          </p>
          <p className="description font-extralight mt-[8px] text-[20px]"></p>
          {socialRow}
        </div>
      )}
      <div className="thumbnail-wrapper hidden md:block flex-shrink-0">
        <Image className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover" src={bio.thumbnail} alt="thumbnail" />
      </div>
    </div>
  );
}

export default Bio;
