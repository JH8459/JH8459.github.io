/**
 * @description About 페이지 전반에서 사용하는 공통 링크 집합
 */
export interface LinkSet {
  homepage?: string;
  github?: string;
  post?: string;
  demo?: string;
  googlePlay?: string;
  appStore?: string;
  chromeExtension?: string;
  email?: string;
  linkedIn?: string;
  yozmIt?: string;
}

/**
 * @description About 페이지 경력 타임라인 항목
 */
export interface CareerItem {
  date?: string;
  label?: string;
  status?: string;
  activity?: string;
  posts?: CareerPostItem[];
  links?: LinkSet;
}

/**
 * @description 경력 항목 하단 게시글 카드
 */
export interface CareerPostItem {
  title?: string;
  thumbnail?: string;
  publishedAt?: string;
  url?: string;
}

/**
 * @description About 페이지 학력 항목
 */
export interface EducationItem {
  date?: string;
  title?: string;
  institution?: string;
  links?: LinkSet;
}

/**
 * @description About 페이지 자격증 항목
 */
export interface CertificationItem {
  issued?: string;
  expires?: string;
  title?: string;
  issuer?: string;
  credentialId?: string;
  links?: LinkSet;
}

/**
 * @description 오픈소스/외부활동 항목
 */
export interface ActivityItem {
  title?: string;
  description?: string;
  date?: string;
  links?: LinkSet;
}

/**
 * @description About 페이지 프로젝트 항목
 */
export interface ProjectItem {
  title?: string;
  period?: string;
  description?: string;
  techStack?: string[];
  thumbnailUrl?: string;
  thumbnailFit?: 'cover' | 'contain';
  thumbnailBackground?: string;
  links?: LinkSet;
}

/**
 * @description 이력서 외부 링크
 */
export interface ResumeLink {
  label?: string;
  url?: string;
}

/**
 * @description 이력서 경력 프로젝트
 */
export interface ResumeProject {
  period?: string;
  title?: string;
  summary?: string;
  bullets?: string[];
}

/**
 * @description 이력서 경력 회사
 */
export interface ResumeExperience {
  mark?: string;
  logo?: string;
  logoBackground?: string;
  company?: string;
  period?: string;
  duration?: string;
  employmentType?: string;
  role?: string;
  level?: string;
  current?: boolean;
  projects?: ResumeProject[];
}

/**
 * @description 이력서 기술 스택 그룹
 */
export interface ResumeSkillGroup {
  category?: string;
  items?: string[];
}

/**
 * @description 이력서 자격증
 */
export interface ResumeCertification {
  issued?: string;
  title?: string;
  type?: string;
  issuer?: string;
  credentialId?: string;
}

/**
 * @description About 페이지에서 사용하는 이력서 데이터
 */
export interface ResumeMetadata {
  role?: string;
  experience?: string;
  phone?: string;
  email?: string;
  introduction?: string[];
  projects?: ProjectItem[];
  experiences?: ResumeExperience[];
  skills?: ResumeSkillGroup[];
  certifications?: ResumeCertification[];
  links?: ResumeLink[];
}

/**
 * @description About 페이지 메타데이터 구조
 */
export interface AboutMetadata {
  summary?: string[] | string;
  resume?: ResumeMetadata;
  careers?: CareerItem[];
  education?: EducationItem[];
  certifications?: CertificationItem[];
  openSource?: ActivityItem[];
  externalActivities?: ActivityItem[];
  projects?: ProjectItem[];
}
