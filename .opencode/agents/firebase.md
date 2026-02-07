---
name: firebase
description: Firebase 사용 규칙과 프로젝트 지침
tools: Read, Grep
model: sonnet
---

# Firebase Guide

## 기본 원칙

- Firebase SDK는 v12 모듈러 API 사용
- Realtime Database만 사용하며 필요 시 범위를 명확히 제한
- 환경 변수는 `gatsby-meta-config.js`를 통해 매핑

## 사용 위치

- 페이지/템플릿에서만 Firebase 초기화 및 DB 접근
- 공통 로직은 별도 유틸로 분리 가능 (확장 시)

## 확장 규칙

- 새로운 서비스 추가 시 별도 문서로 분리 (예: `firebase-auth.md`)
- 보안 규칙 변경은 반드시 별도 변경 로그 작성
