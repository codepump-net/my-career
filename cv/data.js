/*
 * 이력서 정본 데이터 — 출처: cv/data/오현석_CV.pdf
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
 * 영문 표기 확인 필요 — 공식 영문 사명이 있으면 교체한다.
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

    experience: [
        {
            id: 'nnn',
            org: { ko: '(주)트리플엔게임즈', en: 'TripleN Games Inc.' },
            period: { ko: '2024.02 – 현재', en: '2024.02 – Present' },
            role: 'Chief Executive Officer',
            points: [
                {
                    id: 'zepeto',
                    text: {
                        ko: 'ZEPETO JR 동일본 ‘Get Train’ 월드 제작 총괄',
                        en: 'Directed production of the ZEPETO JR East Japan world ‘Get Train’'
                    }
                },
                {
                    id: 'roblox',
                    text: {
                        ko: 'ROBLOX NNN UGC 사업 총괄',
                        en: 'Led the ROBLOX NNN UGC business'
                    }
                }
            ]
        },

        {
            id: 'aico',
            org: { ko: '(주)에이코', en: 'AICO Inc.' },
            period: '2022.06 – 2024.01',
            role: 'Chief Executive Officer',
            points: [
                {
                    id: 'gonggong',
                    text: {
                        ko: '2022 공공키움사업 수행(한국문화정보원)',
                        en: 'Delivered the 2022 Gonggong Kium project (Korea Culture Information Service Agency)'
                    }
                },
                {
                    id: 'choreo',
                    text: {
                        ko: '인공지능 안무 솔루션 R&D',
                        en: 'R&D on an AI choreography solution'
                    }
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
                        ko: 'SKT ifland ‘원밀리언 랜드’ 개발 총괄',
                        en: 'Led development of SKT ifland ‘1MILLION Land’'
                    },
                    sub: [
                        {
                            ko: '9인 규모 메타버스 개발팀 조직 및 개발 디렉팅',
                            en: 'Built and directed a 9-person metaverse development team'
                        },
                        {
                            ko: '2021 실감콘텐츠 대기업 협력사업(한국콘텐츠진흥원) 과제 총괄',
                            en: 'Led the 2021 immersive content enterprise partnership project (KOCCA)'
                        }
                    ]
                },
                {
                    id: 'metaverse',
                    text: {
                        ko: '1MILLION Metaverse 개발 총괄',
                        en: 'Led development of 1MILLION Metaverse'
                    },
                    sub: [
                        {
                            ko: '4인 규모 메타버스 개발팀 조직 및 개발 디렉팅',
                            en: 'Built and directed a 4-person metaverse development team'
                        },
                        {
                            ko: '제1회 한국 문화체험 메타버스 콘텐츠 공모전(문화체육관광부) 대상 수상',
                            en: 'Grand Prize, 1st Korea Cultural Experience Metaverse Content Competition (Ministry of Culture, Sports and Tourism)'
                        }
                    ]
                },
                {
                    id: 'homedance',
                    text: {
                        ko: '1MILLION HomeDance Platform 개발 총괄 책임',
                        en: 'Headed development of the 1MILLION HomeDance Platform'
                    },
                    sub: [
                        {
                            ko: '댄스 교육 OTT 서비스 개발 총괄',
                            en: 'Led development of a dance-education OTT service'
                        },
                        {
                            ko: '10인 규모 동영상 플랫폼 개발팀 조직',
                            en: 'Built a 10-person video platform development team'
                        },
                        { ko: 'LG 스마트 TV 스토어 론칭', en: 'Launched on the LG Smart TV store' },
                        { ko: 'KT 올레TV 론칭', en: 'Launched on KT Olleh TV' }
                    ]
                },
                {
                    id: 'studio',
                    text: {
                        ko: '1MILLION Dance Studio Platform 개발 총괄',
                        en: 'Led development of the 1MILLION Dance Studio Platform'
                    },
                    sub: [
                        {
                            ko: '10인 규모 글로벌 댄스 교육 플랫폼 개발팀 조직',
                            en: 'Built a 10-person global dance-education platform team'
                        },
                        {
                            ko: '온오프라인 통합 글로벌 댄스 교육 플랫폼 개발(웹, 앱) 및 유지 보수',
                            en: 'Built and maintained an online/offline integrated global dance-education platform (web, app)'
                        },
                        {
                            ko: '2021 아기유니콘 200 육성사업(창업진흥원) 기술 사업 개발 총괄 책임',
                            en: 'Headed technical business development for the 2021 Baby Unicorn 200 programme (KISED)'
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
                        ko: 'AR 영상 놀이 플랫폼 ‘띠잉’ Unity 개발',
                        en: 'Unity development for the AR video play platform ‘Tiing’'
                    },
                    sub: [
                        { ko: 'AR 엔진 통합', en: 'AR engine integration' },
                        { ko: 'AR 게임 콘텐츠 개발', en: 'AR game content development' },
                        { ko: '동영상 편집 기능 개발', en: 'Video editing features' }
                    ]
                },
                {
                    id: 'webrtc',
                    text: {
                        ko: 'Web-RTC 기반 사내 회의 소프트웨어 개발',
                        en: 'Built in-house conferencing software on Web-RTC'
                    },
                    sub: [
                        {
                            ko: 'Web-RTC 기반 영상통화 어플리케이션 개발',
                            en: 'Web-RTC based video call application'
                        }
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
                        ko: 'AR 카메라 SNOW, B612 렌더링 엔진 개발',
                        en: 'Rendering engine development for the AR cameras SNOW and B612'
                    },
                    sub: [
                        { ko: '3D Physics Engine integration', en: '3D physics engine integration' },
                        {
                            ko: 'Physics Engine 성능 개선 및 기능 추가',
                            en: 'Physics engine performance improvements and new features'
                        },
                        { ko: 'Physics 콘텐츠 문제 해결', en: 'Physics content troubleshooting' },
                        {
                            ko: 'BlendShape Animation 기능 구현',
                            en: 'BlendShape animation feature implementation'
                        }
                    ]
                }
            ]
        },

        {
            id: 'softpump',
            org: { ko: '소프트펌프(주)', en: 'Softpump Inc.' },
            period: '2015.12 – 2018.04',
            role: 'Founder, Game Director',
            points: [
                {
                    id: 'duffy',
                    text: {
                        ko: '2D 캐주얼 게임 ‘더피는 가출중’, 게임 디렉터',
                        en: 'Game director, 2D casual game ‘Runaway Duffy’'
                    },
                    sub: [
                        { ko: '게임 개발 디렉팅', en: 'Game development direction' },
                        { ko: '프로젝트 관리', en: 'Project management' },
                        { ko: '해외 퍼블리싱', en: 'Overseas publishing' },
                        { ko: 'Unity C# 프레임 워크 개발', en: 'Unity C# framework development' },
                        { ko: 'Unity 성능 최적화', en: 'Unity performance optimisation' }
                    ]
                },
                {
                    id: 'commando',
                    text: {
                        ko: '3D 3인칭 슈팅 게임 ‘코만도 퀘스트’, 게임 디렉터',
                        en: 'Game director, 3D third-person shooter ‘Commando Quest’'
                    },
                    sub: [
                        { ko: '3D TPS Game 개발', en: '3D TPS game development' },
                        {
                            ko: '모션 캡쳐 데이터를 이용한 캐릭터 애니메이션',
                            en: 'Character animation from motion capture data'
                        },
                        { ko: '카툰 렌더링 셰이더 구현', en: 'Cartoon rendering shader implementation' },
                        {
                            ko: '제1회 구글 인디게임 페스티벌 본선 진출',
                            en: 'Finalist, 1st Google Indie Games Festival'
                        }
                    ]
                },
                {
                    id: 'gaze',
                    text: {
                        ko: '시선 추적을 이용한 게임 컨트롤 연구',
                        en: 'Research on game control through gaze tracking'
                    },
                    sub: [
                        {
                            ko: '안드로이드 ARCore 기술을 이용한 눈동자 이미지 수집 알고리즘 구현',
                            en: 'Implemented a pupil image collection algorithm using Android ARCore'
                        },
                        {
                            ko: 'Caffe2를 이용해 수집한 데이터에서 눈동자의 위치를 학습 후 위치 정보 추출',
                            en: 'Trained on the collected data with Caffe2 to extract pupil position'
                        },
                        {
                            ko: '위치 데이터를 이용해 게임 캐릭터를 제어하는 Unity 3D Runner 게임 개발',
                            en: 'Built a Unity 3D runner game controlled by the extracted position data'
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
                        ko: 'HTML5 Game Engine 프로젝트 개발 리드',
                        en: 'Led the HTML5 game engine project'
                    },
                    sub: [
                        {
                            ko: 'Facebook 용 2D Game Engine 개발',
                            en: 'Built a 2D game engine for Facebook'
                        }
                    ]
                },
                {
                    id: 'greatstone',
                    text: {
                        ko: '2D 퍼즐 RPG ‘그레이트 스톤’ 개발 리드',
                        en: 'Led development of the 2D puzzle RPG ‘Great Stone’'
                    },
                    sub: [
                        {
                            ko: 'HTML5 2D Game Engine 을 이용한 2D 퍼즐 디펜스 게임 개발',
                            en: 'Built a 2D puzzle defence game on the HTML5 2D game engine'
                        }
                    ]
                }
            ]
        }
    ],

    education: [
        {
            text: {
                ko: '아주대학교 정보통신전문대학원 정보통신공학 박사 수료',
                en: 'Ajou University, Graduate School of Information and Communication — Ph.D. coursework completed, Information and Communication Engineering'
            },
            meta: '2007.03 – 2009.02'
        },
        {
            text: {
                ko: '아주대학교 미디어대학원 미디어학(컴퓨터 그래픽스) 석사',
                en: 'Ajou University, Graduate School of Media — M.S. in Media Studies (Computer Graphics)'
            },
            meta: '2005.03 – 2007.02'
        },
        {
            text: {
                ko: '아주대학교 정보및컴퓨터공학 학사',
                en: 'Ajou University — B.S. in Information and Computer Engineering'
            },
            meta: '2000.03 – 2005.02'
        }
    ],

    lecture: [
        {
            text: {
                ko: '서울게임아카데미 — 게임 프로그래밍 국비과정',
                en: 'Seoul Game Academy — Game Programming, national training course'
            },
            meta: '2015 – 2016'
        },
        {
            text: { ko: '아주대학교 — 실시간 애니메이션', en: 'Ajou University — Real-time Animation' },
            meta: '2015'
        },
        {
            text: { ko: '아주대학교 — 모바일 프로그래밍', en: 'Ajou University — Mobile Programming' },
            meta: '2015'
        },
        {
            text: { ko: '아주대학교 — 웹앱 프로그래밍', en: 'Ajou University — Web App Programming' },
            meta: '2013'
        }
    ],

    publication: [
        {
            before: 'Hyun Joon Shin, Hyun Seok Oh.',
            title: 'Fat graphs: Constructing an Interactive Character with Continuous Controls.',
            after: 'In Proceedings of the 2006 ACM SIGGRAPH/Eurographics Symposium on Computer Animation (SCA ’06), pp. 291–298.'
        }
    ],

    awards: [
        {
            text: { ko: 'ZEPETO World Jam Fall 2023 우승', en: 'Winner, ZEPETO World Jam Fall 2023' },
            meta: '2024'
        },
        {
            text: {
                ko: '제1회 한국 문화체험 메타버스 콘텐츠 공모전 대상(문화체육부장관상)',
                en: 'Grand Prize (Minister of Culture, Sports and Tourism Award), 1st Korea Cultural Experience Metaverse Content Competition'
            },
            meta: '2021'
        },
        {
            text: {
                ko: '제1회 구글 인디게임페스티벌 ‘코만도 퀘스트’ 본선 파이널 진출',
                en: 'Finalist, 1st Google Indie Games Festival — ‘Commando Quest’'
            },
            meta: '2016'
        }
    ]
};
