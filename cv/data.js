/*
 * 이력서 정본 데이터: 출처: cv/data/오현석_CV.pdf
 *
 * 여기에는 **사실만** 적는다. 어떤 절을 어떤 순서로 보일지는 versions/*.js 가 정한다.
 * 경력 한 줄을 고치면 모든 버전에 함께 반영된다. 버전 파일에 사실을 복사해 두지 않는다.
 *
 * 다국어 값은 { ko, en } 으로 적는다. 문자열 하나만 적으면 번역하지 않는 값
 * (연도, 직함, 서비스명 등)으로 본다.
 *
 * 경력 항목의 id 는 버전 파일의 include 에서 이 항목을 가리키는 이름이다. 바꾸면
 * 버전 파일도 함께 고쳐야 한다.
 *
 * 영문 표기 확인 필요: 공식 영문 사명이 있으면 교체한다.
 *   aico     (주)에이코          -> AICO Inc.
 *   softpump 소프트펌프(주)       -> Softpump Inc.
 *   spring   스프링스트림 게임연구소 -> Spring Stream Game Lab
 */

window.DOC_DATA = {

    head: {
        name: { ko: '오현석', en: 'Hyunseok Oh' },
        contact: [
            { text: 'jeff.oh.hyunseok@gmail.com', href: 'mailto:jeff.oh.hyunseok@gmail.com' },
            { text: '+82 10 4578 8063' }
        ]
    },

    /* 분야에 맞춰 다시 쓸 일이 많은 문단이다.
     * 버전 파일에서 content 로 덮어쓸 수 있다(versions/default.js 주석 참고). */
    summary: {
        ko: '컴퓨터그래픽스와 게임 기술을 기반으로 연구와 산업을 병행해온 연구자이자 창업가입니다. AI 기반 3D 효과 생성 및 동작 복원 기술을 연구하고 있으며, 산업 측면에서는 메타버스 플랫폼(ZEPETO, Roblox)을 기반으로 대기업과 협력하여 브랜드형 인터랙션 콘텐츠를 기획·개발하고 있습니다. 여러 글로벌 플랫폼과 콘텐츠의 기술 연구와 산업 실무를 통합하는 경험을 바탕으로, 실증적 연구와 현장 중심 교육 모두에 기여할 수 있습니다.',
        en: 'A researcher and founder who has worked across both research and industry on the basis of computer graphics and game technology. My research covers AI-driven 3D effect generation and motion reconstruction; on the industry side I plan and build branded interaction content with large enterprises on metaverse platforms such as ZEPETO and Roblox. Having combined technical research with hands-on industry work across several global platforms, I can contribute to both empirical research and field-oriented teaching.'
    },

    tagline: {
        ko: '컴퓨터그래픽스와 게임 기술을 기반으로 연구와 산업을 병행해온 연구자이자 창업가',
        en: 'Researcher and founder working across computer graphics and game technology'
    },

    // Roblox 지표 출처: nnn-games-website/shared/data/{projects,communities}.json
    // 수집 기준: 2026-10-27T03:35:58.621Z. 커뮤니티 가입 수는 그룹별 합계(중복 포함).
    platforms: [
        {
            text: {
                ko: '[ROBLOX] Tower Flood Race: 누적 방문 11,448,820회, 즐겨찾기 527,638개',
                en: '[ROBLOX] Tower Flood Race: 11,448,820 visits and 527,638 favorites'
            },
            accent: { ko: ['[ROBLOX]'], en: ['[ROBLOX]'] },
            emphasis: {
                ko: ['누적 방문 11,448,820회', '즐겨찾기 527,638개'],
                en: ['11,448,820 visits', '527,638 favorites']
            },
            meta: { ko: '2026.10.27 기준', en: 'As of 2026.10.27' }
        },
        {
            text: {
                ko: '[ROBLOX] FREE UGC RNG: 누적 방문 381,002회, 즐겨찾기 6,196개',
                en: '[ROBLOX] FREE UGC RNG: 381,002 visits and 6,196 favorites'
            },
            accent: { ko: ['[ROBLOX]'], en: ['[ROBLOX]'] },
            emphasis: { ko: ['누적 방문 381,002회', '즐겨찾기 6,196개'], en: ['381,002 visits', '6,196 favorites'] },
            meta: { ko: '2026.10.27 기준', en: 'As of 2026.10.27' }
        },
        {
            text: {
                ko: '[ROBLOX] 커뮤니티 7곳 운영, 가입 수 합계 216,860건(그룹 간 중복 포함)',
                en: '[ROBLOX] Operated seven communities with 216,860 memberships in total (including overlap between groups)'
            },
            accent: { ko: ['[ROBLOX]'], en: ['[ROBLOX]'] },
            emphasis: {
                ko: ['커뮤니티 7곳', '216,860건'],
                en: ['seven communities', '216,860 memberships']
            },
            meta: { ko: '2026.10.27 기준', en: 'As of 2026.10.27' }
        },
        {
            text: {
                ko: '[ROBLOX] UGC 아이템 300종 출시·판매',
                en: '[ROBLOX] Launched and sold 300 UGC items'
            },
            accent: { ko: ['[ROBLOX]'], en: ['[ROBLOX]'] },
            emphasis: { ko: ['UGC 아이템 300종'], en: ['300 UGC items'] },
            meta: { ko: '기존 실적 기록', en: 'Previously recorded' }
        },
        {
            text: {
                ko: '[ZEPETO] Get Train: 누적 방문 250만·최고 주간 활성 사용자 60만, JR동일본 브랜드 월드 제작 및 JRE WALLET 앱 연동',
                en: '[ZEPETO] Get Train: 2.5M visits and 600K peak weekly active users; produced a JR East branded world integrated with the JRE WALLET app'
            },
            accent: { ko: ['[ZEPETO]'], en: ['[ZEPETO]'] },
            emphasis: {
                ko: ['누적 방문 250만', '최고 주간 활성 사용자 60만', 'JRE WALLET 앱 연동'],
                en: ['2.5M visits', '600K peak weekly active users', 'JRE WALLET app']
            },
            meta: '2025'
        },
        {
            text: {
                ko: '[ZEPETO] Nightmare Lab: ZEPETO Global World Jam Fall 2023 우승, 2024년 2월 출시',
                en: '[ZEPETO] Nightmare Lab: winner of ZEPETO Global World Jam Fall 2023; released in February 2024'
            },
            accent: { ko: ['[ZEPETO]'], en: ['[ZEPETO]'] },
            emphasis: {
                ko: ['ZEPETO Global World Jam Fall 2023 우승', '2024년 2월 출시'],
                en: ['winner of ZEPETO Global World Jam Fall 2023', 'released in February 2024']
            },
            meta: '2024.02'
        },
        {
            text: {
                ko: 'UEFN·Meta Horizon 제작 경험, ifland 콘텐츠 제작·운영 경험',
                en: 'Production experience with UEFN and Meta Horizon; content production and operations experience with ifland'
            },
            accent: {
                ko: ['UEFN', 'Meta Horizon', 'ifland'],
                en: ['UEFN', 'Meta Horizon', 'ifland']
            },
            meta: '2021 – 2025'
        }
    ],

    skills: [
        {
            text: {
                ko: 'Game: Unity, Unreal, Roblox Studio, ZEPETO Studio, UEFN, Meta Horizon Worlds Desktop Editor',
                en: 'Game: Unity, Unreal, Roblox Studio, ZEPETO Studio, UEFN, Meta Horizon Worlds Desktop Editor'
            }
        },
        {
            text: {
                ko: 'AI: Claude Code, Codex, Agentic AI, Tripo',
                en: 'AI: Claude Code, Codex, Agentic AI, Tripo'
            }
        },
        {
            text: {
                ko: 'Programming: Luau, TypeScript, C#, C++, Java, Python',
                en: 'Programming: Luau, TypeScript, C#, C++, Java, Python'
            }
        },
        {
            text: {
                ko: 'Backend: AWS, MERN Stack',
                en: 'Backend: AWS, MERN Stack'
            }
        }
    ],

    experience: [
        {
            id: 'ajou',
            org: { ko: '아주대학교 디지털미디어학부', en: 'Ajou University, Department of Digital Media' },
            period: { ko: '2025.09 – 현재', en: '2025.09 – Present' },
            role: 'Adjunct Professor',
            points: [{
                id: 'web-service',
                text: {
                    ko: '실전 웹서비스 개발 강의',
                    en: 'Teaching Practical Web Service Development'
                }
            }]
        },
        {
            id: 'nnn',
            org: { ko: '(주)트리플엔게임즈', en: 'TripleN Games Inc.' },
            period: { ko: '2024.02 – 현재', en: '2024.02 – Present' },
            role: 'Technical Director · Co-Founder',
            points: [
                {
                    id: 'zepeto',
                    text: {
                        ko: '[게임·서비스 연동 | ZEPETO] Get Train의 RNG 게임·보상 시스템과 ZEPETO 미지원 부가 서비스·JRE WALLET 연동 기획·개발·운영',
                        en: '[Game & Service Integration | ZEPETO] Planned, developed, and operated Get Train’s RNG game, reward system, supporting services not natively available in ZEPETO, and JRE WALLET integration'
                    }
                },
                {
                    id: 'roblox',
                    text: {
                        ko: '[제품·라이브 운영 | ROBLOX] Tower Flood Race의 최대 50인 코어 플레이와 랜덤 타워·라운드·보상 시스템 설계',
                        en: '[Product & Live Operations | ROBLOX] Designed Tower Flood Race’s core gameplay for up to 50 players and its random tower, round, and reward systems'
                    },
                    sub: [
                        {
                            ko: '플레이 데이터 기반 난이도·라이브 콘텐츠 개선',
                            en: 'Improved difficulty and live content using player data'
                        }
                    ]
                },
                {
                    id: 'ai-pipeline',
                    text: {
                        ko: '[AI 제작 시스템 | ROBLOX] UI·전투 등 반복 개발 기능을 전용 Agent로 분리하고, ROBLOX API 공통 모듈과 오픈소스 패키지 실행 하네스 구축',
                        en: '[AI Production System | ROBLOX] Separated recurring UI and combat development into dedicated agents and built shared ROBLOX API modules and an execution harness for open-source packages'
                    }
                },
                {
                    id: 'ugc',
                    text: {
                        ko: '[크리에이터 생태계·툴 검증] ROBLOX 아바타 아이템·이벤트·커뮤니티 운영, UEFN Water Colosseum·Meta Horizon Slime Sanctum 프로토타입 제작',
                        en: '[Creator Ecosystem & Tool Evaluation] Operated ROBLOX avatar items, events, and communities; built the UEFN Water Colosseum and Meta Horizon Slime Sanctum prototypes'
                    }
                }
            ]
        },

        {
            id: 'aico',
            org: { ko: '(주)에이코', en: 'AICO Inc.' },
            period: '2022.06 – 2024.01',
            role: 'Research Director · Founder',
            points: [
                {
                    id: 'choreo',
                    text: {
                        ko: 'AI 안무 창작 기술: K-POP 안무를 활용해 새로운 인간 동작을 생성하는 기술 연구·개발',
                        en: 'AI choreography technology: researched and developed technology that generates new human movements using K-pop choreography'
                    },
                    sub: [
                        {
                            ko: '생성 안무를 3D 아바타 댄스 영상에 적용해 콘텐츠 제작 가능성 검증',
                            en: 'Applied generated choreography to 3D avatar dance videos to validate its use in content production'
                        },
                        {
                            ko: 'AI 안무 창작 관련 핵심 기술 특허 출원',
                            en: 'Filed a patent application for the core AI choreography technology'
                        }
                    ]
                }
            ]
        },

        {
            id: '1m',
            org: { ko: '(주)원밀리언', en: '1MILLION Inc.' },
            period: '2021.01 – 2022.06',
            role: 'Chief Technology Officer',
            points: [
                {
                    id: 'ifland',
                    text: {
                        ko: 'SKT ifland ‘원밀리언 랜드’: 메타버스 콘텐츠·시스템 개발 총괄',
                        en: 'SKT ifland “1MILLION Land”: led development of the metaverse content and systems'
                    },
                    sub: [
                        {
                            ko: '9인 개발팀 구성 및 개발·출시 관리',
                            en: 'Built a nine-person team and managed development and release'
                        }
                    ]
                },
                {
                    id: 'metaverse',
                    text: {
                        ko: '1MILLION Metaverse: 메타버스 서비스·콘텐츠 개발 총괄',
                        en: '1MILLION Metaverse: led development of the metaverse service and content'
                    },
                    sub: [
                        {
                            ko: '4인 개발팀 구성 및 개발 디렉팅',
                            en: 'Built and directed a four-person development team'
                        }
                    ]
                },
                {
                    id: 'homedance',
                    text: {
                        ko: '1MILLION HomeDance: 댄스 교육 OTT 및 스마트TV 서비스 개발 총괄',
                        en: '1MILLION HomeDance: led development of the dance-education OTT and smart-TV services'
                    },
                    sub: [
                        {
                            ko: '10인 개발팀 구성 및 LG 스마트TV·KT 올레TV 서비스 개발·출시',
                            en: 'Built a ten-person team and developed and launched services for LG Smart TV and KT Olleh TV'
                        }
                    ]
                },
                {
                    id: 'studio',
                    text: {
                        ko: '1MILLION Dance Studio Platform: 온·오프라인 통합 댄스 교육 웹·앱 개발 총괄',
                        en: '1MILLION Dance Studio Platform: led development of the integrated online/offline dance-education web and app service'
                    },
                    sub: [
                        {
                            ko: '10인 개발팀 구성 및 플랫폼 개발·유지보수 관리',
                            en: 'Built a ten-person team and managed platform development and maintenance'
                        }
                    ]
                }
            ]
        },

        {
            id: 'woowa',
            org: { ko: '(주)우아한형제들', en: 'Woowa Brothers Corp.' },
            period: '2020.01 – 2021.01',
            role: 'Senior Unity Engineer',
            points: [
                {
                    id: 'tiing',
                    text: {
                        ko: 'AR 영상 놀이 플랫폼 ‘띠잉’ Unity 클라이언트 개발',
                        en: 'Developed the Unity client for the AR video play platform “Tiing”'
                    },
                    sub: [
                        {
                            ko: 'AR 엔진 개발 및 AR 게임 콘텐츠 개발',
                            en: 'Developed the AR engine and AR game content'
                        },
                        {
                            ko: 'WebRTC 기반 영상통화 기능 개발',
                            en: 'Developed WebRTC-based video-call functionality'
                        },
                        { ko: '기술: Unity, C#, AR, WebRTC', en: 'Technologies: Unity, C#, AR, WebRTC' }
                    ]
                }
            ]
        },

        {
            id: 'snow',
            org: { ko: '스노우(주)', en: 'SNOW Inc.' },
            period: '2018.04 – 2019.11',
            role: 'Senior Graphics Engineer',
            points: [
                {
                    id: 'renderer',
                    text: {
                        ko: 'SNOW 카메라 그래픽스 엔진 개발',
                        en: 'Developed the graphics engine for the SNOW camera'
                    },
                    sub: [
                        {
                            ko: '3D 물리 엔진 개발',
                            en: 'Developed a 3D physics engine'
                        },
                        {
                            ko: 'ZEPETO 아바타 BlendShape 애니메이션 개발',
                            en: 'Developed BlendShape animation for ZEPETO avatars'
                        },
                        {
                            ko: '기술: Computer Graphics, AR, C++, Android, iOS',
                            en: 'Technologies: Computer Graphics, AR, C++, Android, iOS'
                        }
                    ]
                }
            ]
        },

        {
            id: 'softpump',
            org: { ko: '소프트펌프(주)', en: 'Softpump Inc.' },
            period: '2015.12 – 2018.04',
            role: 'Game Director · Founder',
            points: [
                {
                    id: 'commando',
                    text: {
                        ko: '3D TPS 게임 ‘코만도 퀘스트’ 시스템 기획 및 개발',
                        en: 'Planned and developed the systems for the 3D TPS game “Commando Quest”'
                    }
                },
                {
                    id: 'duffy',
                    text: {
                        ko: '2D 캐주얼 게임 ‘더피는 가출중’ 시스템 기획 및 개발',
                        en: 'Planned and developed the systems for the 2D casual game “Runaway Duffy”'
                    },
                    sub: [{
                        ko: '기술: Unity, C#, Shader, Spine',
                        en: 'Technologies: Unity, C#, Shader, Spine'
                    }]
                },
                {
                    id: 'gaze',
                    text: {
                        ko: '시선 추적 게임 컨트롤 연구: 눈동자 데이터 수집·모델 학습·Unity 게임 적용',
                        en: 'Gaze-controlled game research: pupil-data collection, model training, and Unity game integration'
                    },
                    sub: [
                        {
                            ko: '기술: Unity, C#, ARCore, Caffe2',
                            en: 'Technologies: Unity, C#, ARCore, Caffe2'
                        }
                    ]
                }
            ]
        },

        {
            id: 'spring',
            org: { ko: '스프링스트림 게임연구소', en: 'Spring Stream Game Lab' },
            period: '2012.11 – 2014.07',
            role: 'Co-Founder, Lead Programmer',
            points: [
                {
                    id: 'engine',
                    text: {
                        ko: 'Facebook용 HTML5 2D 게임 엔진과 게임 API 설계·개발',
                        en: 'Designed and developed an HTML5 2D game engine and game APIs for Facebook'
                    }
                },
                {
                    id: 'greatstone',
                    text: {
                        ko: '2D 퍼즐 RPG ‘그레이트 스톤’ 개발',
                        en: 'Developed the 2D puzzle RPG “Great Stone”'
                    },
                    sub: [{
                        ko: '기술: HTML5, Canvas, NodeJS, JavaScript',
                        en: 'Technologies: HTML5, Canvas, NodeJS, JavaScript'
                    }]
                }
            ]
        }
    ],

    education: [
        {
            text: {
                ko: '아주대학교 정보통신전문대학원 정보통신공학 박사 수료',
                en: 'Ajou University, Graduate School of Information and Communication: Ph.D. coursework completed, Information and Communication Engineering'
            },
            meta: '2007.03 – 2009.02'
        },
        {
            text: {
                ko: '아주대학교 미디어대학원 미디어학(컴퓨터 그래픽스) 석사',
                en: 'Ajou University, Graduate School of Media: M.S. in Media Studies (Computer Graphics)'
            },
            meta: '2005.03 – 2007.02'
        },
        {
            text: {
                ko: '아주대학교 정보및컴퓨터공학 학사',
                en: 'Ajou University: B.S. in Information and Computer Engineering'
            },
            meta: '2000.03 – 2005.02'
        }
    ],

    lecture: [
        {
            text: {
                ko: '아주대학교: 실전 웹서비스 개발',
                en: 'Ajou University: Practical Web Service Development'
            },
            meta: { ko: '2025 ~ 현재', en: '2025 – Present' }
        },
        {
            text: {
                ko: '서울게임아카데미: 게임 프로그래밍 국비과정',
                en: 'Seoul Game Academy: Game Programming, national training course'
            },
            meta: '2015 – 2016'
        },
        {
            text: { ko: '아주대학교: 실시간 애니메이션', en: 'Ajou University: Real-time Animation' },
            meta: '2015'
        },
        {
            text: { ko: '아주대학교: 모바일 프로그래밍', en: 'Ajou University: Mobile Programming' },
            meta: '2015'
        },
        {
            text: { ko: '아주대학교: 웹앱 프로그래밍', en: 'Ajou University: Web App Programming' },
            meta: '2013'
        }
    ],

    publication: [
        {
            before: 'Hyun Joon Shin, Hyun Seok Oh.',
            title: 'Fat graphs: Constructing an Interactive Character with Continuous Controls.',
            after: 'In Proceedings of the 2006 ACM SIGGRAPH/Eurographics Symposium on Computer Animation (SCA ’06), pp. 291–298.',
            meta: 'SCA ’06'
        }
    ],

    awards: [
        {
            text: { ko: 'ZEPETO Global World Jam Fall 2023 우승', en: 'Winner, ZEPETO Global World Jam Fall 2023' },
            meta: '2024'
        },
        {
            text: {
                ko: '제1회 한국 문화체험 메타버스 콘텐츠 공모전 대상(문화체육부장관상)',
                en: 'Grand Prize (Minister of Culture, Sports and Tourism Award), 1st Korea Cultural Experience Metaverse Content Competition'
            },
            meta: '2021'
        }
    ]
};

/* 이력 소개용 요약. 회사·기간·직책은 상세 경력 정본을 그대로 참조한다. */
window.DOC_DATA.experienceBrief = window.DOC_DATA.experience.map(function (entry) {
    var summaries = {
        nnn: {
            ko: 'Roblox·ZEPETO 게임 및 UGC 콘텐츠 기획·개발·운영',
            en: 'Planning, development, and operations of Roblox and ZEPETO games and UGC content'
        },
        aico: {
            ko: 'AI 기반 안무·동작 생성 기술 연구·개발',
            en: 'Research and development of AI choreography and motion generation'
        },
        '1m': {
            ko: '메타버스 콘텐츠 및 댄스 교육 플랫폼 개발 총괄',
            en: 'Led development of metaverse content and dance education platforms'
        },
        woowa: {
            ko: 'AR 영상 놀이 플랫폼 ‘띠잉’ 클라이언트 개발',
            en: 'Client development for the AR video platform Tiing'
        },
        snow: {
            ko: 'SNOW 카메라 그래픽스 엔진 및 ZEPETO 아바타 애니메이션 개발',
            en: 'Development of SNOW camera graphics and ZEPETO avatar animation'
        },
        softpump: {
            ko: '모바일 게임 기획·개발 및 게임 기술 연구',
            en: 'Mobile game planning and development, and game technology research'
        },
        spring: {
            ko: 'HTML5 게임 엔진 및 게임 개발',
            en: 'HTML5 game engine and game development'
        }
    };
    return Object.assign({}, entry, {
        points: summaries[entry.id] ? [{ id: 'summary', text: summaries[entry.id] }] : entry.points
    });
});
