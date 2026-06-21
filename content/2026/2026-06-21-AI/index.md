---
emoji: 🤖
title: "Conductor에서 Supersets로 정착한 이유"
date: '2026-06-21'
author: JH8459
categories: AI
thumbnail: https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-06-21/AI/thumbnail.png
---

<img
  src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-06-21/AI/banner.png"
  alt="배너"
  style="width: 100%; border-radius: 12px;"
/>

## 🔥 Overview

최근 내 개발 환경에서 가장 크게 바뀐 부분은 AI Agent를 사용하는 위치다.

이전에는 IDE 안에서 터미널을 열고, 그 안에서 Codex나 Claude Code를 실행하며 작업을 진행했다. 코드를 확인하는 화면, 명령을 실행하는 화면, AI Agent와 대화하는 화면이 모두 하나의 IDE 안에 있었다.

처음에는 이 방식이 자연스러웠다. 내가 보고 있는 파일을 기준으로 바로 명령을 실행할 수 있고, 결과도 곧바로 확인할 수 있었기 때문이다.

하지만 AI Agent에게 맡기는 작업의 단위가 커지고, 동시에 여러 방향을 실험하는 일이 늘어나면서 이 방식은 점점 답답해졌다.

- 한 작업을 맡기는 동안 다른 시도를 병렬로 진행하기 어렵다.
- AI Agent가 제안하는 여러 변경을 동시에 검토하기 번거롭다.
- AI Agent가 만든 변경을 내가 직접 읽고 판단하는 흐름이 IDE 작업과 섞인다.

그래서 최근에는 작업 방식을 조금 바꿨다.

코드 확인과 최종 판단은 IDE에서 진행하고, 실제 구현이나 조사 작업은 워크트리 기반으로 분리된 AI Agent에게 위임하는 방식이다. 이때 사용해본 도구가 Conductor와 Supersets였다.

둘 다 워크트리 기반으로 병렬 AI Agent 구조를 지원한다는 점에서는 비슷하다. 하지만 실제로 사용해보니 내가 중요하게 보는 지점은 단순히 "여러 Agent를 동시에 실행할 수 있는가"가 아니었다.

내가 원하는 것은 **AI Agent를 더 많이 띄우는 것**이 아니라, **내가 제어할 수 있는 단위로 작업을 분리하고 다시 합칠 수 있는 환경**이었다.

그 기준에서 나는 결국 Conductor보다 Supersets가 더 잘 맞는다고 느꼈다.

<br>
<br>

### 1. IDE 안의 터미널에서 워크트리 기반 병렬 Agent로

---

AI Agent를 처음 실무 흐름에 붙일 때는 IDE 안의 터미널만으로도 충분했다.

작업 디렉터리에서 바로 `Codex` 또는 `Claude-code`를 실행하고, 필요한 파일을 읽게 한 뒤, 변경 사항을 확인하면 됐다. 작은 리팩터링이나 단일 버그 수정처럼 범위가 좁은 작업에서는 이 방식이 꽤 편했다.

하지만 시간이 지나면서 AI Agent에게 맡기는 작업은 점점 다음과 같은 형태로 바뀌었다.

- 작업 범위가 다른 요청을 병렬로 구현하기
- PR 리뷰 코멘트를 기준으로 독립적인 수정안 만들기
- 문서, 테스트, 구현을 나눠서 병렬로 진행하기

이런 작업은 순차적으로 처리해도 가능하지만, 워크트리를 나눠 각각의 Agent에게 맡기는 편이 훨씬 자연스럽고 생산성이 크게 향상된다.

예를 들어 어떤 버그를 고칠 때도 최소 수정안과 구조 개선안을 동시에 맡길 수 있다. 두 결과를 서로 독립된 워크트리에서 확인한 뒤, 실제로 가져올 변경만 선택하면 된다.

이 방식의 장점은 단순히 속도가 빠르다는 데 있지 않다. 오히려 가장 큰 장점은 **비교 가능한 결과물을 남긴다**는 점이다.

<figure style="margin: 0; text-align: center;">
  <img
    src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-06-21/AI/changes.webp"
    alt="Superset"
    style="width: 100%; border-radius: 12px;"
  />
  <figcaption style="margin-top: 8px; font-size: 14px;">
    <a href="https://superset.sh/" target="_blank" rel="noopener noreferrer">
      Superset
    </a>
    공식 문서 참조
  </figcaption>
</figure>

AI Agent가 제안한 변경은 항상 맞는 것이 아니다. 그래서 나는 Agent가 작업한 결과를 그대로 믿기보다, 별도 IDE에서 코드를 열어 직접 읽고 판단하는 과정을 중요하게 생각한다.

워크트리 기반 도구는 이 흐름과 잘 맞았다.

- Agent는 격리된 워크트리에서 작업한다.
- 나는 IDE에서 해당 워크트리의 diff를 확인한다.
- 괜찮은 변경만 커밋 또는 PR로 정리한다.
- 마음에 들지 않는 시도는 버린다.

이 구조가 잡히고 나니 AI Agent는 IDE 안에 붙어 있는 보조 도구라기보다, 독립된 작업자를 여러 명 띄워두는 방식에 가까워졌다.

<br>
<br>

### 2. Conductor에서 느낀 불편함

---

Conductor를 처음 사용했을 때 좋았던 점은 분명했다.

GUI 기반으로 잘 감싸진 화면은 워크트리를 기반으로 여러 Agent Session을 손쉽게 만들고, 역시나 각 Session을 손쉽게 독립적으로 다룰 수 있었다. 내가 직접 `git worktree add`를 반복하고 터미널을 여러 개 관리하지 않아도 된다는 점은 편했다.

하지만 실제 작업을 반복하면서 불편한 지점도 꽤 선명해졌다.

<figure style="margin: 0; text-align: center;">
  <img
    src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-06-21/AI/cities.png"
    alt="Conductor"
    style="width: 100%; border-radius: 12px;"
  />
  <figcaption style="margin-top: 8px; font-size: 14px;">
    <a href="https://www.conductor.build/docs/reference/cities/" target="_blank" rel="noopener noreferrer">
      Conductor
    </a>
    공식 문서 참조
  </figcaption>
</figure>

가장 먼저 걸렸던 부분은 **워크트리 명칭을 내가 원하는 방식으로 지정하기 어렵다**는 점이었다.

Conductor는 워크트리 이름이 도시 이름 기반의 임의의 값으로 구성된다. 물론 도구 입장에서는 충돌 없는 이름을 자동으로 만들어주는 기능일 수 있다. 하지만 내 입장에서는 작업 맥락을 빠르게 읽기 어렵다는 문제가 생겼다.

예를 들어 여러 Agent가 동시에 떠 있을 때, 나는 이름만 보고도 대략 어떤 작업인지 알기를 원한다.

- `fix-ci-firebase-secrets`
- `docs-pr-workflow-rules`
- `refac-post-query`

이런 이름은 브랜치와 작업 의도를 동시에 드러낸다. 반면 임의로 생성된 도시 이름은 그 자체만으로는 작업 맥락을 설명하지 못하므로, 어떤 작업을 수행했었는지 다시 한번 대화 내용을 확인해봐야한다는 단점이 있었다.

두 번째로 불편했던 점은 **브랜치 네이밍이 내 규칙과 어긋나는 경우가 있었다**는 점이다.

나는 브랜치 prefix와 PR 제목 type을 맞추는 규칙을 두고 있다. 예를 들어 `fix-*` 브랜치에서는 `fix: ...` 형태의 PR 제목을 사용하고, 문서 변경은 `docs-*` 브랜치로 분리한다.

이 규칙은 단순한 취향이 아니다.

- PR 목록에서 변경 의도를 빠르게 파악할 수 있다.
- CI나 배포 흐름에서 브랜치 의미가 분명해진다.
- 나중에 히스토리를 볼 때 어떤 종류의 변경이었는지 추적하기 쉽다.

그런데 도구가 알 수 없는 브랜치 네이밍을 강제하거나, 내가 정한 규칙과 맞지 않는 이름을 만들면 이후 정리 비용이 생긴다. AI Agent가 작업을 잘 끝냈더라도 마지막에 브랜치명을 다시 정리하거나 PR 규칙과 맞추는 과정이 필요해진다.

작은 불편처럼 보이지만, 이런 마찰은 반복될수록 꽤 크게 느껴진다.

AI Agent를 사용하는 이유는 반복적인 작업과 탐색 비용을 줄이기 위해서다. 그런데 도구가 만든 이름과 브랜치 구조를 다시 사람이 정리해야 한다면, 자동화의 이점이 일부 사라진다 생각한다.

<br>
<br>

### 3. 자동으로 주입되는 시스템 프롬프트를 어떻게 볼 것인가

---

Conductor를 사용하면서 또 하나 신경 쓰였던 부분은 임의의 시스템 프롬프트가 주입되는 현상이었다.

<figure style="margin: 28px 0 36px;">
  <div style="
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: stretch;
  ">
    <div style="
      flex: 1 1 320px;
      min-width: 0;
      height: clamp(220px, 28vw, 300px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 12px;
      background: #0f1117;
      border: 1px solid rgba(255, 255, 255, 0.08);
    ">
      <img
        src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-06-21/AI/prompt_1.PNG"
        alt="컨덕터 프롬프트 - 1"
        style="
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        "
      />
    </div>
    <div style="
      flex: 1 1 320px;
      min-width: 0;
      height: clamp(220px, 28vw, 300px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 12px;
      background: #0f1117;
      border: 1px solid rgba(255, 255, 255, 0.08);
    ">
      <img
        src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-06-21/AI/prompt_2.PNG"
        alt="컨덕터 프롬프트 - 2"
        style="
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        "
      />
    </div>
  </div>
  <figcaption style="
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    color: #8b949e;
  ">
    Conductor로 세션을 열고 단순한 요청을 전달해도 시스템 프롬프트가 강제로 주입된다.
  </figcaption>
</figure>

물론 이런 주입이 항상 나쁘다고 말하려는 것은 아니다. 도구 입장에서는 Agent가 더 안정적으로 동작하도록 기본 지침을 넣을 수 있다. 예를 들어 작업 디렉터리를 안전하게 다루거나, 변경 사항을 요약하게 하거나, 특정 UX를 유지하기 위한 지침이 들어갈 수 있다.

나는 AI Agent가 어떤 전제에서 판단했는지 확인하고 싶다. 특히 `AGENTS.md`, `CLAUDE.md`, 스킬과 규칙들을 문서처럼 명시적인 규칙을 두고 있기 때문에, Agent가 따르는 지침은 가능하면 내가 확인 가능한 파일에 남아 있기를 선호한다.

숨겨진 프롬프트나 도구 레벨의 기본 주입이 많아지면 이런 질문이 남는다.

- 이 판단은 저장소 규칙 때문인가?
- 도구가 넣은 기본 지침 때문인가?

AI Agent를 오래 쓰다 보면 모델 성능만큼이나 중요한 것이 재현성이다.

어떤 결과가 좋았을 때도, 나빴을 때도 왜 그런 판단이 나왔는지 추적할 수 있어야 한다. 그래야 프롬프트를 고치든, 작업 단위를 줄이든 다음 개선으로 이어질 수 있다.

이 관점에서 나는 도구가 많은 것을 대신 감춰주는 것보다, 실제로 어떤 명령이 실행되고 어떤 환경에서 Agent가 동작하는지 드러나는 쪽이 더 편했다.

<br>
<br>

### 4. Supersets로 정착한 이유

---

Supersets을 쓰면서 가장 마음에 들었던 부분은 앞에서 말한 두 가지 불편함이 줄었다는 점이다.

첫 번째는 **워크트리 명칭을 내가 원하는 방식으로 다룰 수 있다**는 점이다.

작업 이름을 직접 정할 수 있으면 단순히 보기 좋은 문제가 아니라, 작업 전체의 추적성이 좋아진다. 여러 Agent가 동시에 돌아가도 이름만 보고 어떤 작업인지 판단할 수 있고, IDE에서 해당 워크트리를 열었을 때도 맥락을 잃지 않는다.

두 번째는 **브랜치 네이밍을 내 규칙에 맞출 수 있다**는 점이다.

내가 원하는 브랜치명으로 작업을 시작할 수 있으면, AI Agent가 만든 결과를 PR까지 이어가는 과정이 훨씬 자연스럽다. 브랜치 이름, 커밋 메시지, PR 제목, 배포 규칙이 하나의 흐름으로 이어진다.

<figure style="margin: 0; text-align: center;">
  <img
    src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-06-21/AI/supersets.png"
    alt="Superset"
    style="width: 100%; border-radius: 12px;"
  />
  <figcaption style="margin-top: 8px; font-size: 14px;">
    Supersets 에서는 워크스페이스명과 브런치명을 사용자가 직접 명시할 수 있다.
  </figcaption>
</figure>

세 번째는 **실제 터미널에서 Codex나 Claude Code를 그대로 실행하는 구조**라는 점이다.

이 부분이 특히 좋았다. Supersets은 실제 터미널에서 `codex` 또는 `claude-code`를 실행하는 방식에 가깝다. 그래서 내가 느끼기에는 "도구가 Agent를 새롭게 해석한다"기보다, "내가 원래 쓰던 CLI를 워크트리 단위로 잘 배치해준다"는 인상이 강했다.

이 차이는 작지 않다.

내가 원하는 것은 특정 도구의 독자적인 Agent 경험에 완전히 올라타는 것이 아니라, 이미 검증한 CLI 흐름을 병렬 작업 구조로 확장하는 것이다. 정리하면 내 기준은 다음과 같았다.

| 기준 | Conductor | Supersets |
| --- | --- | --- |
| 워크트리 이름 | 임의 도시 기반 이름으로 맥락 파악이 어려웠다 | 작업 의도를 드러내는 이름을 사용할 수 있었다 |
| 브랜치 네이밍 | 내 저장소 규칙과 어긋나는 경우가 있었다 | 원하는 브랜치 규칙을 유지하기 쉬웠다 |
| Agent 실행 방식 | 세션에 자동으로 주입되는 지침이 신경 쓰였다 | 실제 터미널에서 순정 CLI를 실행하는 느낌이 강했다 |

결국 Supersets이 더 좋았던 이유는 기능이 더 많아서라기보다, 내 작업 방식을 덜 흔들었기 때문이다. 

내가 정한 워크트리 및 브랜치 규칙, CLI 사용 방식, IDE에서의 코드 검토 흐름을 유지한 채 병렬 Agent 작업만 얹을 수 있었다.

<br>
<br>

## 🤔 Understanding

사실 두 도구를 비교했지만, 어떤 도구를 사용하는가는 크게 중요하지 않다 생각한다.

중요한 것은 Agent가 일하는 공간을 어떻게 나누고, 그 결과를 사람이 어떻게 검토하고 최종 변경으로 어떻게 정리할 수 있는가다.

Conductor는 워크트리 기반 병렬 Agent 구조를 아주 손쉽게 경험하게 해준 좋은 출발점이었다. 하지만 내 작업 방식에서는 워크트리 이름과 브랜치 이름을 직접 통제하기 어렵다는 점, 그리고 세션에 내가 의도하지 않은 프롬프트가 주입되는 듯한 점이 계속 불편하게 느껴졌다.

반면 Supersets은 내가 이미 사용하던 Codex, Claude Code CLI 흐름을 크게 바꾸지 않고 워크트리 기반 병렬 실행만 자연스럽게 얹어주는 쪽에 가까웠다. 그래서 도구를 새로 배우는 느낌보다, 기존 터미널 작업을 더 잘 분리하는 느낌이 강했다.

결국 내가 Supersets에 정착한 이유는 더 화려한 기능 때문이 아니라, 더 예측 가능한 실행 모델 때문이었다.

AI Agent를 많이 쓰게 될수록 도구가 제공하는 편의성만큼이나, 내가 제어할 수 있는 이름, 브랜치, 프롬프트, 검토 흐름이 중요해진다. 앞으로도 나는 Agent에게 작업을 위임하되, 최종 판단과 기록은 내가 이해할 수 있는 형태로 남기는 방식을 계속 유지하려 한다.