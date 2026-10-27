# Agent Releases

Agent Release는 다음 버전 tuple을 하나의 승인 단위로 묶는다.

```text
Agent + Instructions + Context + Skills + Model + Tool/Permission + Orchestration + Runtime Adapter + Execution Environment + Data/Approval Policy + Eval Set
```

`<agent-id>/<version>.json`에는 [`release-template.json`](release-template.json)을 복사해 기계 검증 가능한 승인 기록을 두고, 필요한 설명은 [`release-template.md`](release-template.md)를 함께 사용한다. 배포된 조합 중 하나라도 바뀌면 새 Release Record 또는 명시적인 재검증 기록이 필요하다.

운영 비밀, 원문 사용자 데이터, 전체 Trace는 Release Record에 넣지 않는다. 승인된 증거 저장소 링크와 비식별 요약을 남긴다.
