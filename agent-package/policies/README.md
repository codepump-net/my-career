# Operational Policies

Agent와 환경이 공통으로 참조하는 승인·데이터 정책의 정본 템플릿이다. 실제 운영 전 템플릿을 복사해 정책 ID, 소유자, 적용 범위, 시행일을 고정하고 Agent·환경·Release에서 참조한다.

- 정책은 프롬프트 안내가 아니라 실행 계층의 allowlist, approval gate, 보존 설정으로 강제한다.
- 정책을 완화하면 Agent SemVer와 무관하게 별도 Change Request, 안전 Eval, 승인, Release가 필요하다.
- 비밀·개인정보·원문 Trace는 이 폴더에 기록하지 않는다.
