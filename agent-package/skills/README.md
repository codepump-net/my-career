# Shared Agent Skills

반복 가능하고 경계가 분명한 절차만 공통 Skill로 분리한다. 프로젝트 요구사항, Agent의 최종 책임, 승인 정책은 Skill에 복제하지 않고 각각의 정본을 참조한다.

## 사용 기준

- 둘 이상의 Agent가 동일한 절차를 반복하고 입력·출력·중단 조건을 공유할 때 Skill을 만든다.
- 한 번의 결정론적 스크립트로 충분하면 Skill 대신 검증 가능한 코드로 둔다.
- Agent의 목적 전체를 Skill 하나로 감싸지 않는다. Skill은 좁은 역량이고 Agent는 결과 책임자다.
- 긴 참고 자료는 `references/`, 반복 실행 코드는 `scripts/`, 출력에 사용하는 파일은 `assets/`에 두되 실제 필요가 있을 때만 만든다.

## 작성과 배포

1. `_template/SKILL.md`를 `skills/<skill-name>/SKILL.md`로 복사한다.
2. frontmatter의 `name`은 폴더명과 같은 kebab-case로, `description`은 수행 작업·사용 시점·제외 조건이 구분되도록 작성한다.
3. 본문에는 입력, 절차, 출력, 안전·중단, 검증만 둔다. 정본 문서는 링크로 연결한다.
4. 사용하는 Agent의 `agent.json > capabilities.skills`에 Skill 디렉터리를 등록한다.
5. Adapter가 OpenAI 또는 Claude 런타임 형식으로 투영하고 conformance 검사를 수행한다.

`skills/_template/`은 복사 원본이므로 완성된 Skill로 등록하지 않는다. 실제 Skill은 해당 런타임의 Skill validator와 패키지 검사를 모두 통과해야 한다.
