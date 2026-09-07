/**
 * 밈고양이 성격테스트 (MemeCats) - Core Script
 * 순수 바닐라 JS 구현 (외부 라이브러리 의존성 없음)
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. 내장 Fallback 데이터 (JSON 비동기 로드 실패 및 file:// 실행 대비)
  // ==========================================================================
  const FALLBACK_DATA = {
    meta: {
      title: "밈고양이 성격테스트 (MemeCats)",
      dimensions: {
        social: "인싸냥(E) vs 집순냥(I)",
        action: "혼돈카오스(C) vs 근엄질서(O)",
        mental: "강철멘탈(S) vs 유리멘탈(G)"
      }
    },
    questions: [
      {
        id: 1,
        axis: "social",
        situation: "집사가 사전 예고도 없이 친구들을 우르르 데려와 거실에서 홈파티를 시작했다!",
        options: [
          { choice: "A", text: "새로운 캔 따개들이 왔다! 현관으로 튀어나가 배 까고 온몸을 비비며 파티 호스트 노릇을 한다.", trait: "E" },
          { choice: "B", text: "불필요한 외계 생명체들의 침입이다. 소파 밑 0.5평 암흑 지대로 광속 은둔한다.", trait: "I" }
        ]
      },
      {
        id: 2,
        axis: "social",
        situation: "정기검진 날 동물병원 대기실, 옆자리 댕냥이들이 긴장해서 웅성거리고 있다.",
        options: [
          { choice: "A", text: "이동장 창살 틈으로 솜방망이를 내밀어 옆자리 강아지 코를 톡 치며 인사를 건넨다.", trait: "E" },
          { choice: "B", text: "이동장 구석에 이마를 박고 투명 고양이인 척 벽과 물아일체가 된다.", trait: "I" }
        ]
      },
      {
        id: 3,
        axis: "social",
        situation: "따스한 오후, 처음 보는 길고양이가 창문 방충망 너머로 나를 빤히 응시하고 있다.",
        options: [
          { choice: "A", text: "방충망에 두 발로 매달려 '애옹! 너 참치캔 먹어봤냐?!' 폭풍 수다를 떤다.", trait: "E" },
          { choice: "B", text: "눈이 마주치자마자 캣타워 최상층 요새로 올라가 근엄하게 감시 레이더만 가동한다.", trait: "I" }
        ]
      },
      {
        id: 4,
        axis: "action",
        situation: "집사가 아끼는 책상 모서리 끝에 영롱한 유리컵이 아슬아슬하게 놓여 있다.",
        options: [
          { choice: "A", text: "앞발로 1mm씩 툭... 툭... 밀어내며 낙하하는 쾌감과 중력의 법칙을 실험한다.", trait: "C" },
          { choice: "B", text: "위험 구역임을 인지하고 털 끝 하나 닿지 않도록 정교하고 우아하게 우회한다.", trait: "O" }
        ]
      },
      {
        id: 5,
        axis: "action",
        situation: "새벽 3시, 온 집안의 불이 꺼지고 깊은 적막이 찾아왔을 때 나의 상태는?",
        options: [
          { choice: "A", text: "야생의 본능 각성! 거실 카펫부터 벽면까지 도배하듯 질주하는 '새벽 우다다'를 개최한다.", trait: "C" },
          { choice: "B", text: "지정된 집사의 발치 명당자리에서 규격에 맞는 완벽한 식빵을 굽고 취침을 유지한다.", trait: "O" }
        ]
      },
      {
        id: 6,
        axis: "action",
        situation: "집사가 20만 원짜리 고급 원목 캣타워와 택배 골판지 박스를 방에 펼쳐놓았다.",
        options: [
          { choice: "A", text: "원목 캣타워는 거들떠도 안 보고, 찌그러진 골판지 박스 모서리부터 질겅질겅 뜯는다.", trait: "C" },
          { choice: "B", text: "집사의 지갑 사정과 노동을 존중하여 캣타워 1단 발판부터 순서대로 차근차근 밟아본다.", trait: "O" }
        ]
      },
      {
        id: 7,
        axis: "mental",
        situation: "집사가 달콤한 목소리로 '간식 타임!'을 외쳤는데, 손에 귀 세정제가 들려 있었다.",
        options: [
          { choice: "A", text: "'귀 좀 내어주고 츄르 2개 뜯어내면 이득이지.' 귀를 털썩 맡기며 아무 타격도 입지 않는다.", trait: "S" },
          { choice: "B", text: "'어떻게 나를 속여?!' 배신감에 동공 지진을 일으키며 3일 동안 억울함에 치를 떤다.", trait: "G" }
        ]
      },
      {
        id: 8,
        axis: "mental",
        situation: "캣타워에서 멋진 점프를 시도하다 발이 미끄러져 거실 바닥에 엉덩방아를 찧었다!",
        options: [
          { choice: "A", text: "'원래 바닥 냄새 맡으려고 내려온 건데?' 천연덕스럽게 털을 다듬으며 태연함을 유지한다.", trait: "S" },
          { choice: "B", text: "집사와 눈이 마주치자마자 수치심 폭발! 귀를 납작하게 눕히고 억울해서 '애애앵!' 소리를 지른다.", trait: "G" }
        ]
      },
      {
        id: 9,
        axis: "mental",
        situation: "늘어지게 꿀잠을 자고 있는데 집사가 귀엽다며 볼살을 꼬집고 뽀뽀 테러를 퍼붓는다.",
        options: [
          { choice: "A", text: "'또 시작이네...' 한숨 한 번 내쉬고 영혼을 로그아웃한 채 마저 숙면을 취한다.", trait: "S" },
          { choice: "B", text: "내 소중한 수면권을 침해당했다는 극심한 스트레스에 솜방망이 펀치 난타전을 벌인다.", trait: "G" }
        ]
      }
    ],
    results: [
      {
        id: "popcat",
        type_code: "ECS",
        name: "팝캣 (Popcat)",
        english_name: "Popcat",
        subtitle: "24시간 텐션 폭발 무한 입벌림 파티냥",
        summary: "어디서나 존재감을 뿜어내며 어떤 잔소리에도 타격 없는 파티광",
        description: "입을 뻐끔뻐끔 벌리며 세상만사 모든 일에 참견해야 직성이 풀리는 에너자이저입니다. 남들이 나를 보고 웃든 당황하든 개의치 않으며, 분당 300회의 텐션으로 분위기를 주도합니다. 타인의 눈치를 보느라 시간을 낭비하지 않는 진정한 멘탈 승리자입니다.",
        pros: [
          "어떤 낯선 모임에 던져놔도 5분 만에 핵인싸 등극",
          "비판이나 악플을 들어도 '오 그래?' 하고 넘기는 다이아몬드 멘탈",
          "지치지 않는 긍정 에너지로 주변 사람들의 우울감 퇴치"
        ],
        cons: [
          "가끔 상대방의 진지한 분위기나 신호를 눈치채지 못함",
          "새벽까지 텐션을 주체하지 못해 주변 사람들을 지치게 만듦",
          "생각보다 말이 먼저 튀어나와 엉뚱한 사고를 칠 때가 있음"
        ],
        life_tip: "입을 닫고 경청하는 법을 딱 3초만 연습해보세요. 당신의 매력이 두 배가 됩니다.",
        best_match: {
          id: "maxwell",
          name: "맥스웰",
          reason: "회전하는 맥스웰 옆에서 비트를 맞춰 입을 뻐끔거리면 세상 완벽한 듀오 쇼가 완성됩니다."
        },
        worst_match: {
          id: "grumpy_cat",
          name: "그럼피 캣",
          reason: "시끄럽게 굴다가 그럼피 캣의 싸늘한 한숨과 레이저 눈빛에 온몸이 얼어붙을 수 있습니다."
        },
        image_url: "https://imgur.com/TBlAmJo.png",
        image_placeholder: "assets/images/cats/popcat.webp"
      },
      {
        id: "banana_cat",
        type_code: "ECG",
        name: "바나나캣 (Banana Cat)",
        english_name: "Banana Cat",
        subtitle: "서러움 폭발 눈물샘 요정",
        summary: "세상에 사랑받고 싶지만 사소한 일에도 서러워서 눙물이 왈칵 쏟아지는 감성파",
        description: "바나나 옷을 입고 해피송을 부르다가도, 뜻대로 안 되면 순식간에 눈물바다를 만드는 감정 기복의 달인입니다. 사람과 관심을 너무 사랑하지만 마음은 쿠쿠다스 같아서 작은 억까에도 '나한테 왜 그래!'라며 오열합니다. 하지만 눈물을 닦아주고 간식 하나만 주면 1초 만에 다시 춤을 춥니다.",
        pros: [
          "순수하고 솔직한 감정 표현으로 보는 사람의 보호 본능 자극",
          "풍부한 공감 능력으로 친구의 슬픔에 자기 일처럼 같이 울어줌",
          "달래주면 언제 그랬냐는 듯 회복되는 러블리한 단순함"
        ],
        cons: [
          "상대방의 무심한 한마디에 밤새 이불킥하며 오열함",
          "감정 기복 롤러코스터에 주변 사람들의 기가 빨릴 수 있음",
          "억울한 상황이 생기면 논리보다 눈물이 먼저 터져 나옴"
        ],
        life_tip: "세상은 당신을 괴롭히려고 작정하지 않았습니다. 일단 울음을 멈추고 심호흡부터 해보세요.",
        best_match: {
          id: "polite_cat",
          name: "올리",
          reason: "내가 울고불고 떼를 써도 올리는 자본주의 억지 미소로 친절하게 달래줍니다."
        },
        worst_match: {
          id: "huh_cat",
          name: "허(Huh?) 고양이",
          reason: "서러워서 엉엉 우는데 'Huh?' 하면서 멍청한 표정으로 쳐다보면 속이 터져버립니다."
        },
        image_url: "https://imgur.com/8UNlisA.png",
        image_placeholder: "assets/images/cats/banana_cat.webp"
      },
      {
        id: "maxwell",
        type_code: "EOS",
        name: "맥스웰 (Maxwell)",
        english_name: "Maxwell The Spinning Cat",
        subtitle: "흔들림 없는 3D 회전 평정심 마스터",
        summary: "스포트라이트를 즐기면서도 규칙과 템포를 칼같이 유지하는 차분한 쇼맨",
        description: "저화질 BGM 속에서 일정한 속도와 완벽한 축을 유지하며 끝없이 회전하는 고양이입니다. 대중 앞에 서는 것을 즐기지만, 결코 선을 넘거나 규칙을 깨지 않는 우아한 관종입니다. 외부의 자극이나 시끄러운 참견 속에서도 자신만의 페이스를 유지하는 내공이 엄청납니다.",
        pros: [
          "어떤 혼돈의 프로젝트에서도 정해진 루틴을 완수하는 실행력",
          "주목받는 자리를 두려워하지 않는 당당함과 쇼맨십",
          "감정 기복 없이 일정한 에너지를 유지하는 높은 안정감"
        ],
        cons: [
          "정해진 궤도에서 벗어나는 돌발 상황을 싫어함",
          "자기만의 기준과 루틴이 너무 확고해 고집스러워 보일 수 있음",
          "언제나 완벽한 모습만 보여주려다 혼자 피로가 누적됨"
        ],
        life_tip: "가끔은 회전을 멈추고 어지러운 현실을 똑바로 마주하는 여유도 필요합니다.",
        best_match: {
          id: "popcat",
          name: "팝캣",
          reason: "규칙적인 내 템포에 맞춰 팝캣이 흥을 돋워주면 가장 이상적인 파티 밸런스가 나옵니다."
        },
        worst_match: {
          id: "smudge",
          name: "스머지",
          reason: "우아하게 회전하고 있는데 옆에서 샐러드 접시를 엎으며 난동을 피우면 질색하게 됩니다."
        },
        image_url: "https://imgur.com/itC8B5s.png",
        image_placeholder: "assets/images/cats/maxwell.webp"
      },
      {
        id: "polite_cat",
        type_code: "EOG",
        name: "예의 바른 고양이 올리 (Ollie)",
        english_name: "Polite Cat Ollie",
        subtitle: "자본주의 억지 미소의 K-직장묘",
        summary: "겉으로는 다정하고 완벽하게 예의를 갖추지만 속으로는 식은땀을 흘리는 프로 사회생활러",
        description: "어색한 입꼬리 미소로 모든 사회적 요구를 받아내는 프로 직장인 고양이입니다. 예의 바르고 배려심 넘치지만, 사실 거절을 잘 못해서 속이 까맣게 타들어 가는 중입니다. 집에 돌아와 문을 닫는 순간 입꼬리를 내리고 침대에 쓰러져 한숨을 푹 내쉽니다.",
        pros: [
          "처음 보는 사람도 편안하게 만드는 만렙의 사회적 매너",
          "갈등을 사전에 방지하고 중재하는 탁월한 센스",
          "책임감이 강해 맡은 일은 어떻게든 깔끔하게 마감"
        ],
        cons: [
          "싫다는 말을 못 해서 원치 않는 약속과 일거리를 떠안음",
          "남의 시선과 평가를 지나치게 의식해 자존감이 깎이기 쉬움",
          "겉은 웃고 있지만 속은 곪아 터져 번아웃 위험 1순위"
        ],
        life_tip: "'죄송하지만 거절하겠습니다'를 거울 앞에서 하루 10번씩 맹연습하세요.",
        best_match: {
          id: "banana_cat",
          name: "바나나캣",
          reason: "감정에 솔직한 바나나캣을 보면 대리 만족을 느끼고, 챙겨주면서 보람을 느낍니다."
        },
        worst_match: {
          id: "jinx",
          name: "징크스",
          reason: "사회적 규범 따위 1도 신경 안 쓰는 4차원 징크스를 보면 뇌 용량이 과부하됩니다."
        },
        image_url: "https://imgur.com/sDmOP5L.png",
        image_placeholder: "assets/images/cats/polite_cat.webp"
      },
      {
        id: "jinx",
        type_code: "ICS",
        name: "징크스 (Jinx)",
        english_name: "Jinx The Cat",
        subtitle: "심연을 걷는 방구석 4차원 독고다이",
        summary: "커다란 눈으로 허공을 응시하며 남의 시선 따위 1도 신경 쓰지 않는 혼돈의 마이웨이",
        description: "비뚤어진 발과 거대한 동공으로 방구석에서 기괴하고 귀여운 짓을 벌이는 미스터리 고양이입니다. 사교활동에는 전혀 관심이 없으며, 오직 자신만의 기묘한 세계관에 빠져 살아갑니다. 남들이 이상하게 쳐다보든 말든 '내가 귀여운데 어쩔 건데?' 마인드로 일관합니다.",
        pros: [
          "독보적인 개성과 창의력으로 누구도 흉내 낼 수 없는 캐릭터",
          "타인의 평가나 사회적 압박에 전혀 휘둘리지 않는 멘탈",
          "혼자 있어도 24시간 내내 심심할 틈이 없는 풍부한 내면세계"
        ],
        cons: [
          "도대체 무슨 생각을 하고 사는지 가족조차 알 길이 없음",
          "협동 과제나 단체 생활에 섞이기 매우 힘듦",
          "일상적인 상식의 범주를 벗어난 돌발 행동으로 주변을 놀라게 함"
        ],
        life_tip: "가끔은 지구인들의 언어와 눈빛으로 대화하는 시늉이라도 해보세요.",
        best_match: {
          id: "huh_cat",
          name: "허(Huh?) 고양이",
          reason: "둘이 마주 앉아 말없이 허공만 쳐다보고 있어도 전혀 어색하지 않은 소울메이트입니다."
        },
        worst_match: {
          id: "polite_cat",
          name: "올리",
          reason: "올리가 정중하게 건네는 사회적 인사말을 멍하니 씹어버려 올리를 울릴 수 있습니다."
        },
        image_url: "https://imgur.com/JUUdeEO.png",
        image_placeholder: "assets/images/cats/jinx.webp"
      },
      {
        id: "smudge",
        type_code: "ICG",
        name: "스머지 (Smudge The Cat)",
        english_name: "Smudge The Cat",
        subtitle: "식탁 위의 억울한 심판관",
        summary: "조용히 밥상에 앉아있다가 원치 않는 풀떼기를 보고 극대노하는 억울함의 화신",
        description: "식탁 앞에서 여자가 손가락질하며 소리를 지를 때, 샐러드 접시 뒤에서 잔뜩 찡그린 표정으로 억울함을 항변하는 바로 그 고양이입니다. 혼자만의 영역을 지키고 싶었을 뿐인데 자꾸 귀찮은 일에 휘말려 억울함 게이지가 맥스를 찍습니다. 표정 하나로 모든 분노와 황당함을 뿜어냅니다.",
        pros: [
          "부당하거나 불합리한 상황을 기가 막히게 감지하는 안테나",
          "꾸밈없이 직관적인 얼굴 표정으로 진심을 전달함",
          "자기 영역과 취향이 확실하여 호불호가 분명함"
        ],
        cons: [
          "별것 아닌 일에도 '나한테만 왜 이래!' 하며 과도하게 억울해함",
          "싫어하는 음식을 주거나 선을 넘으면 곧바로 극딜을 날림",
          "쌓인 스트레스를 푸는 데 시간이 오래 걸리는 편"
        ],
        life_tip: "세상의 모든 채소를 없앨 순 없습니다. 마음에 안 들면 조용히 접시를 밀어두세요.",
        best_match: {
          id: "grumpy_cat",
          name: "그럼피 캣",
          reason: "세상 모든 불합리함에 대해 밤새도록 함께 욕하며 깊은 전우애를 다질 수 있습니다."
        },
        worst_match: {
          id: "maxwell",
          name: "맥스웰",
          reason: "나는 억울해서 피가 거꾸로 솟는데 옆에서 BGM 틀고 빙글빙글 돌고 있으면 속이 뒤집힙니다."
        },
        image_url: "https://imgur.com/JtkpPRo.png",
        image_placeholder: "assets/images/cats/smudge.webp"
      },
      {
        id: "huh_cat",
        type_code: "IOS",
        name: "허 고양이 (Huh? Cat)",
        english_name: "Huh Cat",
        subtitle: "영혼 가출 뇌정지 평정심묘",
        summary: "복잡한 세상만사에 'Huh?' 한마디로 모든 번뇌를 날려버리는 무념무상형",
        description: "남들이 진지하게 설명하거나 싸우고 있을 때 입을 반쯤 벌리고 'Huh?' 소리를 내며 뇌를 정지시키는 고양이입니다. 깊은 생각이나 복잡한 계산을 거부하며, 조용히 구석에 앉아 평화로운 일상을 누립니다. 어떤 도발이나 스트레스도 이 고양이의 뇌 속 필터를 거치면 백지상태로 사라집니다.",
        pros: [
          "불안, 걱정, 스트레스가 거의 없는 극강의 정신 건강 보유자",
          "주변 사람들의 날카로운 신경질을 무력화시키는 엉뚱한 순수함",
          "상황에 휘둘리지 않고 묵묵히 제자리를 지키는 진정한 뚝심"
        ],
        cons: [
          "중요한 전달 사항이나 마감 기한을 한 귀로 듣고 흘려버림",
          "진지한 대화가 필요한 순간에도 멍하니 있어 상대를 답답하게 만듦",
          "의욕이 없어 보여 게으르다는 오해를 자주 받음"
        ],
        life_tip: "'Huh?' 하기 전에 상대방의 말을 한 번만 더 곱씹어 보세요. 인생의 사고를 절반으로 줄여줍니다.",
        best_match: {
          id: "jinx",
          name: "징크스",
          reason: "서로 무슨 생각을 하는지 굳이 묻지도 따지지도 않는 가장 평화로운 룸메이트입니다."
        },
        worst_match: {
          id: "banana_cat",
          name: "바나나캣",
          reason: "공감과 위로를 갈구하며 우는 바나나캣에게 영혼 없는 'Huh?'를 날렸다간 대참사가 납니다."
        },
        image_url: "https://imgur.com/WF7DcGl.png",
        image_placeholder: "assets/images/cats/huh_cat.webp"
      },
      {
        id: "grumpy_cat",
        type_code: "IOG",
        name: "그럼피 캣 (Grumpy Cat)",
        english_name: "Grumpy Cat",
        subtitle: "세상 모든 것이 마음에 안 드는 프로 불편묘",
        summary: "방구석에서 엄격한 규칙을 고수하며 세상의 무질서와 소음에 팩트 폭격을 날리는 염세주의자",
        description: "언제나 불만 가득한 입꼬리와 굳은 표정으로 세상을 쏘아보는 인터넷 밈의 영원한 레전드입니다. 자기만의 질서와 원칙이 너무 엄격하여, 기준에 미달하는 모든 인간과 상황에 분노하고 스트레스를 받습니다. 하지만 그 까칠함 뒤에는 혼자만의 평화와 안식을 간절히 바라는 속내가 있습니다.",
        pros: [
          "허점과 오류를 단 1초 만에 짚어내는 날카로운 비판적 사고",
          "가식이나 위선이 전혀 없는 100% 진실된 피드백",
          "자신의 기준과 약속은 목에 칼이 들어와도 지키는 칼매너"
        ],
        cons: [
          "매사에 불평불만이 많아 주변 공기를 순식간에 냉각시킴",
          "남들의 작은 실수나 무례함도 용납하지 못해 혼자 속병을 앓음",
          "새로운 시도나 변화를 무조건 부정적으로 바라보기 쉬움"
        ],
        life_tip: "세상은 원래 엉망진창입니다. 모든 것을 고치려 하지 말고 딱 하루만 눈을 감아보세요.",
        best_match: {
          id: "smudge",
          name: "스머지",
          reason: "세상에 대한 불만을 공유하며 서로의 까칠함을 완벽하게 이해해 주는 최고의 술친구입니다."
        },
        worst_match: {
          id: "popcat",
          name: "팝캣",
          reason: "아무 생각 없이 입만 뻐끔거리며 뛰어다니는 팝캣을 보면 혈압이 300까지 치솟습니다."
        },
        image_url: "https://imgur.com/wnFC1Mb.png",
        image_placeholder: "assets/images/cats/grumpy_cat.webp"
      }
    ]
  };

  // ==========================================================================
  // 2. 프로모션 롤링 배너 데이터 (5초 간격 전환)
  // ==========================================================================
  const PROMO_ITEMS = [
    {
      badge: "LottoPick",
      text: "🍀 LottoPick: 글로벌 복권 번호 생성기 [이동]",
      url: "https://majestic-piroshki-4e94c7.netlify.app"
    },
    {
      badge: "웹소설",
      text: "📖 EMHS Gallery: 웹소설: 영원한 모태솔로 갤러리 [읽어보기]",
      url: "https://ko-fi.com/emhsolo"
    },
    {
      badge: "OPEN SOURCE",
      text: "💻 GitHub Open Source: 이 서비스의 소스코드가 궁금하다면? [방문]",
      url: "https://github.com/KIMNAMHYEON92/MemeCats"
    }
  ];

  // 로딩 화면 위트 문구 목록
  const LOADING_QUOTES = [
    "고양이 털 날리는 중...",
    "고양이 뇌 구조 정밀 분석 중...",
    "츄르 냄새 감지 회로 가동 중...",
    "새벽 우다다 본능 측정 중...",
    "인터넷 밈 영혼 도킹 중..."
  ];

  // ==========================================================================
  // 3. 앱 상태 관리 (State)
  // ==========================================================================
  let appData = FALLBACK_DATA;
  let currentQuestionIndex = 0;
  let userAnswers = []; // 선택된 trait ('E', 'C', 'S' 등) 배열
  let currentResult = null;
  let promoIndex = 0;
  let promoTimer = null;

  // DOM 캐싱
  const DOM = {
    // 화면들
    screens: {
      start: document.getElementById('screen-start'),
      quiz: document.getElementById('screen-quiz'),
      loading: document.getElementById('screen-loading'),
      result: document.getElementById('screen-result')
    },
    // 상단 롤링 배너
    promoLink: document.getElementById('promo-link'),
    promoText: document.getElementById('promo-text'),
    // 하단 롤링 배너
    promoLinkBottom: document.getElementById('promo-link-bottom'),
    promoTextBottom: document.getElementById('promo-text-bottom'),
    // 퀴즈 화면 요소
    axisTag: document.getElementById('quiz-axis-tag'),
    counter: document.getElementById('quiz-counter'),
    progressBar: document.getElementById('progress-bar'),
    questionText: document.getElementById('question-situation'),
    choiceA: document.getElementById('choice-a'),
    choiceB: document.getElementById('choice-b'),
    btnStart: document.getElementById('btn-start'),
    loadingQuote: document.getElementById('loading-quote'),
    // 결과 화면 요소
    resTypeCode: document.getElementById('res-type-code'),
    resSubtitle: document.getElementById('res-subtitle'),
    resName: document.getElementById('res-name'),
    resEnglish: document.getElementById('res-english'),
    resImage: document.getElementById('res-image'),
    resSummary: document.getElementById('res-summary'),
    resDescription: document.getElementById('res-description'),
    resPros: document.getElementById('res-pros'),
    resCons: document.getElementById('res-cons'),
    resLifeTip: document.getElementById('res-lifetip'),
    bestMatchName: document.getElementById('best-match-name'),
    bestMatchReason: document.getElementById('best-match-reason'),
    worstMatchName: document.getElementById('worst-match-name'),
    worstMatchReason: document.getElementById('worst-match-reason'),
    // 액션 버튼 & 토스트
    btnShare: document.getElementById('btn-share'),
    btnCopy: document.getElementById('btn-copy'),
    btnRetry: document.getElementById('btn-retry'),
    toast: document.getElementById('toast')
  };

  // ==========================================================================
  // 4. 초기화 & 데이터 비동기 로딩
  // ==========================================================================
  async function initApp() {
    try {
      const response = await fetch('memecats_data.json');
      if (response.ok) {
        const json = await response.json();
        if (json && json.questions && json.results) {
          appData = json;
        }
      }
    } catch (e) {
      console.info("로컬 정적 데이터(Fallback)로 원활하게 동작합니다.");
    }

    // 롤링 배너 가동
    startPromoBanner();

    // 이벤트 리스너 등록
    bindEvents();

    // URL 파라미터 체크 (?cat=popcat 또는 ?result=popcat)
    checkUrlParam();
  }

  // ==========================================================================
  // 5. 화면 전환 매니저
  // ==========================================================================
  function showScreen(screenKey) {
    Object.keys(DOM.screens).forEach(key => {
      DOM.screens[key].classList.remove('active');
    });
    DOM.screens[screenKey].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================================================
  // 6. 퀴즈 진행 로직
  // ==========================================================================
  function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    renderQuestion();
    showScreen('quiz');
  }

  function renderQuestion() {
    const q = appData.questions[currentQuestionIndex];
    const total = appData.questions.length;

    // 진행률 (%) 업데이트
    const progressPercent = Math.round(((currentQuestionIndex + 1) / total) * 100);
    DOM.progressBar.style.width = `${progressPercent}%`;
    DOM.counter.textContent = `${currentQuestionIndex + 1} / ${total}`;

    // 지표 태그 표기
    const axisNames = {
      social: "인싸냥 vs 집순냥 (사회성)",
      action: "혼돈 vs 질서 (행동)",
      mental: "강철 vs 유리 (멘탈)"
    };
    DOM.axisTag.textContent = axisNames[q.axis] || "성향 지표";

    // 질문 및 선택지 텍스트
    DOM.questionText.textContent = q.situation;

    const optA = q.options.find(o => o.choice === 'A') || q.options[0];
    const optB = q.options.find(o => o.choice === 'B') || q.options[1];

    DOM.choiceA.querySelector('.choice-text').textContent = optA.text;
    DOM.choiceB.querySelector('.choice-text').textContent = optB.text;

    DOM.choiceA.dataset.trait = optA.trait;
    DOM.choiceB.dataset.trait = optB.trait;

    // 이전 클릭 선택 효과 제거
    DOM.choiceA.classList.remove('selected');
    DOM.choiceB.classList.remove('selected');
  }

  function handleChoiceClick(e) {
    const btn = e.currentTarget;
    const trait = btn.dataset.trait;

    // 터치 피드백
    btn.classList.add('selected');
    userAnswers.push(trait);

    // 0.2초 후 다음 질문 또는 결과 판독으로 전환
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < appData.questions.length) {
        renderQuestion();
      } else {
        processResults();
      }
    }, 220);
  }

  // ==========================================================================
  // 7. 점수 집계 & 확정형 알고리즘
  // ==========================================================================
  function calculateResult() {
    // 3개 지표별 3문항 (홀수)이므로 2:1 또는 3:0으로 무조건 과반수 결정 (동점 불가)
    const counts = { E: 0, I: 0, C: 0, O: 0, S: 0, G: 0 };
    userAnswers.forEach(trait => {
      if (counts[trait] !== undefined) counts[trait]++;
    });

    const social = counts.E >= counts.I ? 'E' : 'I';
    const action = counts.C >= counts.O ? 'C' : 'O';
    const mental = counts.S >= counts.G ? 'S' : 'G';

    const targetCode = `${social}${action}${mental}`;
    const matched = appData.results.find(r => r.type_code === targetCode);
    return matched || appData.results[0];
  }

  // ==========================================================================
  // 8. 로딩 화면 & 결과 렌더링
  // ==========================================================================
  function processResults() {
    showScreen('loading');

    // 위트 문구 롤링
    let quoteIndex = 0;
    DOM.loadingQuote.textContent = LOADING_QUOTES[0];
    const quoteInterval = setInterval(() => {
      quoteIndex = (quoteIndex + 1) % LOADING_QUOTES.length;
      DOM.loadingQuote.textContent = LOADING_QUOTES[quoteIndex];
    }, 450);

    // 1.5초간 고양이 뇌구조 분석 애니메이션 유지
    setTimeout(() => {
      clearInterval(quoteInterval);
      currentResult = calculateResult();
      renderResult(currentResult);
      showScreen('result');
    }, 1500);
  }

  function renderResult(cat) {
    DOM.resTypeCode.textContent = cat.type_code;
    DOM.resSubtitle.textContent = cat.subtitle;
    DOM.resName.textContent = cat.name;
    DOM.resEnglish.textContent = cat.english_name;

    // 로컬 webp 우선 로드 -> 에러 시 원본 URL 폴백
    const localImgPath = `assets/images/cats/${cat.id}.webp`;
    DOM.resImage.src = localImgPath;
    DOM.resImage.alt = cat.name;
    DOM.resImage.onerror = function () {
      this.onerror = null;
      this.src = cat.image_url || 'https://imgur.com/TBlAmJo.png';
    };

    DOM.resSummary.textContent = `"${cat.summary}"`;
    DOM.resDescription.textContent = cat.description;

    // Pros (장점) 목록
    DOM.resPros.innerHTML = '';
    cat.pros.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      DOM.resPros.appendChild(li);
    });

    // Cons (단점) 목록
    DOM.resCons.innerHTML = '';
    cat.cons.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      DOM.resCons.appendChild(li);
    });

    // 인생 꿀팁
    DOM.resLifeTip.textContent = cat.life_tip;

    // 환상/파멸 궁합
    DOM.bestMatchName.textContent = cat.best_match.name;
    DOM.bestMatchReason.textContent = cat.best_match.reason;
    DOM.worstMatchName.textContent = cat.worst_match.name;
    DOM.worstMatchReason.textContent = cat.worst_match.reason;
  }

  // ==========================================================================
  // 9. 바이럴 공유 & 토스트 알림
  // ==========================================================================
  function showToast(msg) {
    DOM.toast.textContent = msg;
    DOM.toast.classList.add('show');
    setTimeout(() => {
      DOM.toast.classList.remove('show');
    }, 2400);
  }

  function getShareUrl() {
    const url = new URL(window.location.href);
    if (currentResult) {
      url.searchParams.set('cat', currentResult.id);
    }
    return url.toString();
  }

  async function handleShare() {
    const shareUrl = getShareUrl();
    const shareData = {
      title: `내 안의 밈고양이 찾기 결과: ${currentResult ? currentResult.name : '밈고양이'}`,
      text: currentResult ? `나의 밈고양이 영혼 유형은 [${currentResult.name}]! 지금 당신의 밈고양이도 확인해보세요!` : '내 안의 밈고양이 찾기 테스트',
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(shareUrl);
        }
      }
    } else {
      copyToClipboard(shareUrl);
    }
  }

  function copyToClipboard(textToCopy) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("결과 링크가 복사되었습니다! 친구에게 자랑해보세요 🐾");
      }).catch(() => {
        legacyCopy(textToCopy);
      });
    } else {
      legacyCopy(textToCopy);
    }
  }

  function legacyCopy(textToCopy) {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast("결과 링크가 복사되었습니다! 🐾");
    } catch (err) {
      showToast("복사에 실패했습니다. 브라우저 주소창 링크를 복사해주세요.");
    }
    document.body.removeChild(textArea);
  }

  function checkUrlParam() {
    const params = new URLSearchParams(window.location.search);
    const catId = params.get('cat') || params.get('result');
    if (catId) {
      const found = appData.results.find(r => r.id === catId);
      if (found) {
        currentResult = found;
        renderResult(found);
        showScreen('result');
      }
    }
  }

  // ==========================================================================
  // 10. 자가 프로모션 배너 (5초 롤링)
  // ==========================================================================
  function startPromoBanner() {
    function rotateBanner() {
      promoIndex = (promoIndex + 1) % PROMO_ITEMS.length;
      const current = PROMO_ITEMS[promoIndex];

      // 상단 배너 갱신
      if (DOM.promoLink && DOM.promoText) {
        DOM.promoLink.href = current.url;
        DOM.promoText.textContent = current.text;
      }
      // 하단 배너 갱신 (선택 사항)
      if (DOM.promoLinkBottom && DOM.promoTextBottom) {
        const nextPromo = PROMO_ITEMS[(promoIndex + 1) % PROMO_ITEMS.length];
        DOM.promoLinkBottom.href = nextPromo.url;
        DOM.promoTextBottom.textContent = nextPromo.text;
      }
    }

    promoTimer = setInterval(rotateBanner, 5000);
  }

  // ==========================================================================
  // 11. 이벤트 바인딩
  // ==========================================================================
  function bindEvents() {
    DOM.btnStart.addEventListener('click', startQuiz);
    DOM.choiceA.addEventListener('click', handleChoiceClick);
    DOM.choiceB.addEventListener('click', handleChoiceClick);

    DOM.btnRetry.addEventListener('click', () => {
      // 쿼리스트링 제거 후 시작 화면 복귀
      if (window.history.pushState) {
        const url = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState({ path: url }, '', url);
      }
      showScreen('start');
    });

    DOM.btnShare.addEventListener('click', handleShare);
    DOM.btnCopy.addEventListener('click', () => {
      copyToClipboard(getShareUrl());
    });
  }

  // DOM 로드 완료 후 실행
  document.addEventListener('DOMContentLoaded', initApp);
})();