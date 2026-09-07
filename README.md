<div align="center">

# 🐱 밈고양이 성격테스트 (MemeCats)
### "반려묘 상황극을 통해 알아보는 나의 인터넷 밈 고양이 영혼 유형"

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/)
[![Pure Vanilla JS](https://img.shields.io/badge/Stack-Vanilla_HTML%2FCSS%2FJS-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/ko/docs/Web/JavaScript)
[![Ko-fi Sponsor](https://img.shields.io/badge/Support-Ko--fi-FF5E5B?logo=ko-fi&logoColor=white)](https://ko-fi.com/emhsolo)

**[👉 라이브 데모 체험하기](https://memecats.netlify.app)**

</div>

---

## 📌 프로젝트 소개 (About)
**밈고양이 성격테스트(MemeCats)**는 9가지 반려묘 상황극을 통해 사용자의 성향을 3개 축(사회성, 행동, 멘탈)으로 분석하고, 가장 일치하는 **8종의 전설적인 인터넷 밈 고양이 캐릭터**를 도출해 주는 모바일 반응형 인터랙티브 웹앱입니다.

외부 프레임워크나 무거운 라이브러리 없이 **순수 바닐라 웹 스택(HTML5, CSS3, Vanilla ES6+)**만으로 빌드되어 초고속 로딩과 뛰어난 모바일 터치 UX를 제공합니다.

---

## ✨ 핵심 기능 (Key Features)

- **⚡ 동점 없는 100% 확정형 채점 알고리즘**:
  - 지표별 3문항(홀수) 체계로 동점이 원천 차단된 3자리 타입 코드(`ECS`, `IOG` 등) 산출
- **📱 모바일 퍼스트 & 바이럴 UX**:
  - 부드러운 문제 슬라이드 전환, 1.5초 뇌구조 분석 스피너, 인스타그램 캡처 최적화 카드 UI
- **🔗 바이럴 공유 & 딥링크 시스템**:
  - 모바일 Web Share API 연동 및 클립보드 복사(커스텀 토스트 알림)
  - `?cat=popcat` URL 파라미터 기반의 결과 직결 딥링크 지원
- **🛡️ 로컬 및 오프라인 Fallback 안정성**:
  - `memecats_data.json` 비동기 로딩 + 로컬 `file://` 실행 대비 내장 Fallback 데이터 구비
  - 로컬 이미지(`assets/images/cats/*.webp`) 에러 시 원본 리모트 URL 자동 폴백
- **🔄 자체 네트워크 프로모션 롤링 배너**:
  - 상단 및 하단 슬롯에 5초 주기로 순환되는 크로스 프로모션 시스템 탑재

---

## 🎭 8종 밈고양이 캐릭터 (Characters)

| 타입 코드 | 캐릭터 명 | 성향 키워드 | 대표 매칭 듀오 |
|:---:|:---|:---|:---|
| **`ECS`** | **팝캣 (Popcat)** | 무한 입벌림, 다이아 멘탈, 핵인싸 | 💖 맥스웰 / ⚡ 그럼피 캣 |
| **`ECG`** | **바나나캣 (Banana Cat)** | 감성 폭발, 눈물샘 요정, 러블리 | 💖 올리 / ⚡ 허(Huh?) 고양이 |
| **`EOS`** | **맥스웰 (Maxwell)** | 3D 회전, 루틴 완벽주의, 평정심 | 💖 팝캣 / ⚡ 스머지 |
| **`EOG`** | **예의 바른 고양이 올리 (Ollie)** | 자본주의 미소, K-직장묘, 배려왕 | 💖 바나나캣 / ⚡ 징크스 |
| **`ICS`** | **징크스 (Jinx)** | 4차원 동공, 방구석 독고다이, 마이웨이 | 💖 허(Huh?) 고양이 / ⚡ 올리 |
| **`ICG`** | **스머지 (Smudge The Cat)** | 식탁 위 샐러드 거부, 억울함의 화신 | 💖 그럼피 캣 / ⚡ 맥스웰 |
| **`IOS`** | **허 고양이 (Huh? Cat)** | 영혼 가출, 뇌정지, 무념무상 평정심 | 💖 징크스 / ⚡ 바나나캣 |
| **`IOG`** | **그럼피 캣 (Grumpy Cat)** | 프로 불편묘, 염세주의 팩트폭격기 | 💖 스머지 / ⚡ 팝캣 |

---

## 📂 프로젝트 구조 (Structure)

```text
MemeCats/
├── index.html              # 시맨틱 구조, SEO/OG 메타태그, 단일 페이지 컨테이너
├── style.css               # 모바일 최적화 레이아웃, 컬러 팔레트, 애니메이션
├── script.js               # 데이터 파싱, 채점 로직, 공유 API, 롤링 배너
├── memecats_data.json      # 9문항 및 8종 고양이 전체 원본 데이터
├── netlify.toml            # Netlify 정적 배포, 캐시 및 보안 헤더 설정
├── .gitignore              # Git 형상관리 제외 설정
├── README.md               # 프로젝트 매뉴얼
├── LICENSE                 # MIT License
├── CONTRIBUTING.md         # 기여 가이드라인
├── CODE_OF_CONDUCT.md     # 행동 강령
└── assets/
    └── images/
        └── cats/           # 8종 고양이 webp 이미지
```

---

## 🚀 로컬 실행 방법 (Getting Started)

별도의 패키지 매니저(`npm`, `yarn`) 설치나 빌드 과정이 필요하지 않습니다.

```bash
# 1. 저장소 클론
git clone https://github.com/KIMNAMHYEON92/MemeCats.git
cd MemeCats

# 2. 로컬 웹 서버 실행 (VS Code Live Server 확장 프로그램 또는 Python 서버 사용 권장)
python3 -m http.server 8080
# 브라우저에서 http://localhost:8080 접속
```

---

## 🌐 Netlify 배포 방법 (Deployment)

1. [Netlify](https://www.netlify.com/)에 로그인 후 **"Add new site" > "Import an existing project"**를 선택합니다.
2. 본 GitHub 저장소(`MemeCats`)를 선택합니다.
3. 배포 설정:
   - **Build command**: (비워둠)
   - **Publish directory**: `.` (루트)
4. **"Deploy site"**를 클릭하면 즉시 전 세계 CDN으로 배포됩니다.

---

## 🤝 네트워크 서비스 & 후원 (Network & Support)

- 🍀 **LottoPick**: [글로벌 복권 번호 생성기 바로가기](https://majestic-piroshki-4e94c7.netlify.app)
- 🧪 **Developer's Lab**: [GitHub 프로필 방문](https://github.com/KIMNAMHYEON92)
- ☕ **Buy Me a Coffee**: 본 프로젝트가 재미있으셨다면 따뜻한 커피 한 잔 후원으로 응원해 주세요!  
  👉 **[https://ko-fi.com/emhsolo](https://ko-fi.com/emhsolo)**

---

## 📜 라이선스 (License)

이 프로젝트는 [MIT License](LICENSE)를 따릅니다.  
단, 본 서비스에 인용된 밈 고양이 이미지와 캐릭터의 원작 저작권은 각 원작 창작자에게 있습니다.