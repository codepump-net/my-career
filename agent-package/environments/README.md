# Execution Environments

실행 환경은 모델·프롬프트와 별도로 바뀌는 운영 계약이다. Sandbox, 네트워크, 파일시스템, 의존성, 비밀 주입, 세션 예산, 상태 보존, Trace 보존을 [`environment.schema.json`](environment.schema.json)에 따라 명세한다.

- Agent는 `runtime.environment_profile`로 하나의 환경 명세를 참조한다.
- Candidate부터는 `_template`이 아닌 고정된 환경 ID·SemVer·내용 hash를 Release tuple에 기록한다.
- Provider가 환경을 자체 버전 관리하지 않더라도 이 패키지에서 JSON과 hash를 고정한다.
- 네트워크·쓰기·비밀 접근은 기본 거부이며 allowlist만 허용한다.
- 세션 시간, turn, Tool 호출, 병렬 작업, token, 비용 상한을 실행 계층에서 강제한다.
- Trace 저장 위치·보존 일수·redaction 규칙이 없으면 운영 데이터를 처리하지 않는다.
