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
  email?: string;
  linkedIn?: string;
}

/**
 * @description About 페이지 경력 타임라인 항목
 */
export interface CareerItem {
  date?: string;
  label?: string;
  status?: string;
  activity?: string;
  links?: LinkSet;
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
  description?: string;
  techStack?: string[];
  thumbnailUrl?: string;
  links?: LinkSet;
}

/**
 * @description About 페이지 메타데이터 구조
 */
export interface AboutMetadata {
  summary?: string[];
  careers?: CareerItem[];
  education?: EducationItem[];
  certifications?: CertificationItem[];
  openSource?: ActivityItem[];
  externalActivities?: ActivityItem[];
  projects?: ProjectItem[];
}
