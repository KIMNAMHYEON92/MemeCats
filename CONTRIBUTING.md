# 🐾 MemeCats 기여 가이드 (Contributing Guide)

MemeCats 프로젝트에 관심을 가져주셔서 감사합니다! 버그 제보, 새로운 밈고양이 문항 제안, UI/UX 개선 등 모든 기여를 환영합니다.

## 1. 기여 절차 (Contribution Flow)

1. 이 저장소를 **Fork**합니다.
2. 새로운 기능 브랜치를 생성합니다:
   ```bash
   git checkout -b feature/새로운기능명
   ```
3. 코드를 수정하고 로컬 브라우저에서 동작을 테스트합니다.
4. 변경 사항을 커밋합니다:
   ```bash
   git commit -m "feat: 새로운 밈고양이 질문 추가"
   ```
5. 본인의 원격 저장소에 Push합니다:
   ```bash
   git push origin feature/새로운기능명
   ```
6. 메인 저장소(`main` 브랜치)로 **Pull Request(PR)**를 생성합니다.

---

## 2. 커밋 메시지 컨벤션 (Commit Convention)

일관된 히스토리 관리를 위해 다음 접두사를 사용해 주세요:

- `feat:` 새로운 기능 추가 (예: 문항 추가, 공유 옵션 확장)
- `fix:` 버그 수정
- `style:` 코드 포맷팅, CSS 디자인 조정
- `refactor:` 기능 변경 없는 코드 구조 개선
- `docs:` README 등 문서 수정

---

## 3. 질문 및 캐릭터 추가 시 주의사항

- `memecats_data.json`에 새로운 질문을 추가할 때는 동점 방지 규칙(지표별 홀수 문항 구성)이 깨지지 않도록 유의해 주세요.
- 사용되는 이미지는 고화질 `.webp` 포맷을 권장합니다.