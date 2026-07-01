import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const works = [
  { title: "포스터 속의 비둘기", group: "현대시", key: ["현대 문명", "상징", "비판적 인식", "이미지 대비"] },
  { title: "대설주의보", group: "현대시", key: ["눈", "공포와 압박", "상황의 긴장", "감각적 이미지"] },
  { title: "그 여름의 끝", group: "현대시", key: ["계절 변화", "상실", "끝과 전환", "정서의 심화"] },
  { title: "그 나무", group: "현대시", key: ["나무", "존재 성찰", "고독", "응시"] },
  { title: "원시", group: "현대시", key: ["근원", "생명성", "문명 이전", "순수성"] },
  { title: "차심", group: "현대시", key: ["차", "마음의 수양", "여백", "내면 성찰"] },
  { title: "능양시집서", group: "고전수필", key: ["문학론", "평가", "서문", "창작 태도"] },
  { title: "너무 큰 나무", group: "현대소설", key: ["인물 갈등", "상징적 소재", "사회 비판", "서술 방식"] },
  { title: "만흥", group: "고전시가", key: ["자연 친화", "안분지족", "강호가도", "화자의 만족"] },
  { title: "장춘정기", group: "고전수필", key: ["공간의 의미", "기문", "자연과 삶", "선비 의식"] },
  { title: "황새결송", group: "고전산문", key: ["송사", "풍자", "판결", "우화적 성격"] },
  { title: "모든 사라지는 것들은 뒤에 여백을 남긴다", group: "현대시", key: ["소멸", "여백", "상실의 의미", "성찰"] },
  { title: "사과밭을 지나며", group: "현대시", key: ["사과밭", "생명", "감각적 이미지", "성숙"] },
  { title: "금환기봉", group: "고전산문", key: ["영웅소설", "기이한 사건", "인물의 시련", "전기성"] },
  { title: "산이 날 애워싸고", group: "현대시", key: ["산", "포용", "자연과 자아", "고립과 위안"] },
  { title: "흐름에 대하여", group: "현대시", key: ["흐름", "시간", "변화", "삶의 태도"] },
  { title: "한정록 서", group: "고전수필", key: ["은거", "한가로움", "삶의 자세", "서문"] },
  { title: "임베딩과 유사도 표현", group: "독서", key: ["원-핫 인코딩", "임베딩", "워드투벡", "코사인 유사도", "유클리드 거리"] },
  { title: "동시 다중 라운드 경매", group: "독서", key: ["주파수 경매", "동시 입찰", "라운드 반복", "정보 공개", "효율적 분배"] },
];

const choiceSets = {
  modernPoem: [
    {
      q: (w) => `「${w.title}」의 변형 문제로 가장 적절한 발문은?`,
      a: "시적 대상이 화자의 내면 정서와 어떻게 연결되는지 묻는다.",
      wrong: [
        "보기의 문단 배열 순서를 바르게 고르는 문제만 출제한다.",
        "글쓴이가 제시한 통계 자료의 신뢰도를 묻는다.",
        "계약 당사자의 법적 책임만을 판단하게 한다.",
        "단어의 사전적 의미만 찾게 한다."
      ],
      explain: "현대시 변형 문제는 핵심 소재, 화자의 정서, 시상 전개, 표현법을 바꾸어 묻는 경우가 많다."
    },
    {
      q: (w) => `「${w.title}」에서 <보기>가 추가될 때 가장 중요하게 확인할 것은?`,
      a: "보기의 관점이 작품의 핵심 정서·상징·시상 전개와 연결되는지이다.",
      wrong: [
        "보기의 길이가 본문보다 긴지이다.",
        "보기 속 인물 이름이 실제 역사 인물인지이다.",
        "보기의 모든 문장이 작품 원문과 같은 표현인지이다.",
        "보기의 첫 문장과 마지막 문장의 글자 수가 같은지이다."
      ],
      explain: "<보기> 문제는 외부 정보를 작품 해석에 적용하는 문제라서, 보기의 관점과 작품의 핵심 요소를 연결해야 한다."
    },
    {
      q: (w) => `「${w.title}」의 선지 판단에서 가장 조심해야 할 오류는?`,
      a: "작품에 드러나지 않은 정서를 단정하거나, 소재의 상징을 과도하게 확대하는 것이다.",
      wrong: [
        "시어를 모두 한자어로 바꾸어 해석하는 것이다.",
        "작품의 제목을 외우지 않는 것이다.",
        "연의 개수를 먼저 세는 것이다.",
        "작가 이름을 문제마다 반복해서 확인하는 것이다."
      ],
      explain: "문학 선지는 그럴듯한 과잉 해석이 자주 함정이 된다."
    },
    {
      q: (w) => `「${w.title}」와 다른 현대시를 비교하는 문제에서 먼저 볼 것은?`,
      a: "두 작품의 공통 소재가 같은 기능을 하는지, 아니면 다른 정서를 형성하는지이다.",
      wrong: [
        "두 작품의 제목 글자 수가 같은지이다.",
        "두 작품이 모두 같은 출판사에 실렸는지이다.",
        "두 작품의 모든 행이 같은 길이인지이다.",
        "두 작품의 작가가 같은 지역 출신인지이다."
      ],
      explain: "비교 문제는 공통점과 차이점을 모두 잡아야 하며, 특히 같은 소재가 다른 의미로 쓰일 수 있음을 봐야 한다."
    },
  ],
  classic: [
    {
      q: (w) => `「${w.title}」의 고전 문학 변형 문제에서 가장 먼저 파악할 것은?`,
      a: "화자·서술자·인물의 처지와 작품이 드러내는 가치관이다.",
      wrong: [
        "모든 어휘의 현대 표준어 발음이다.",
        "작품의 종이 재질이다.",
        "문단마다 쉼표가 몇 개인지이다.",
        "등장인물 이름의 획수이다."
      ],
      explain: "고전 작품은 상황, 인물 관계, 가치관을 잡아야 선지를 정확히 판단할 수 있다."
    },
    {
      q: (w) => `「${w.title}」에 대한 설명으로 적절한 것을 고르는 문제에서 핵심 기준은?`,
      a: "작품의 갈래적 특징과 주제 의식이 선지에 정확히 반영되었는지이다.",
      wrong: [
        "선지가 가장 짧은지이다.",
        "한자어가 많이 포함되어 있는지이다.",
        "작품 제목이 선지에 직접 반복되는지이다.",
        "보기 문장이 어려운 어휘로 쓰였는지이다."
      ],
      explain: "고전시가·고전수필·고전산문은 갈래별 관습과 주제 의식을 함께 봐야 한다."
    },
    {
      q: (w) => `「${w.title}」의 <보기> 적용 문제에서 가장 위험한 판단은?`,
      a: "보기의 설명을 작품 전체에 기계적으로 적용해 모든 내용을 같은 의미로 해석하는 것이다.",
      wrong: [
        "작품 속 인물의 말투를 확인하는 것이다.",
        "핵심 사건의 원인과 결과를 정리하는 것이다.",
        "갈래적 특징을 함께 고려하는 것이다.",
        "표현상의 특징과 주제를 연결하는 것이다."
      ],
      explain: "보기는 해석의 방향을 주지만, 작품의 구체적 맥락에 맞게 제한적으로 적용해야 한다."
    },
  ],
  fiction: [
    {
      q: (w) => `「${w.title}」의 소설 문제에서 가장 중요한 것은?`,
      a: "인물의 말과 행동을 통해 갈등의 원인과 변화를 파악하는 것이다.",
      wrong: [
        "모든 문장의 품사를 분석하는 것이다.",
        "배경 묘사를 모두 생략하고 줄거리만 외우는 것이다.",
        "작가의 출생 연도를 먼저 계산하는 것이다.",
        "제목의 글자 수로 주제를 판단하는 것이다."
      ],
      explain: "소설은 인물, 사건, 갈등, 서술 방식이 핵심이다."
    },
    {
      q: (w) => `「${w.title}」의 서술상 특징 문제에서 확인할 내용은?`,
      a: "서술자가 인물의 내면과 사건을 어떤 거리에서 전달하는지이다.",
      wrong: [
        "본문에 숫자가 몇 번 나오는지이다.",
        "작품의 모든 문장이 현재형인지이다.",
        "등장인물이 몇 살인지 정확히 외우는 것이다.",
        "문단 첫 글자가 무엇인지이다."
      ],
      explain: "서술자, 시점, 거리, 인물 내면 제시 방식은 소설 선지의 핵심 판단 요소다."
    },
  ],
  readingEmbedding: [
    {
      q: () => "원-핫 인코딩과 임베딩의 차이를 묻는 변형 문제에서 적절한 설명은?",
      a: "원-핫 인코딩은 단어 간 유사성을 표현하기 어렵고, 임베딩은 낮은 차원의 실수 벡터로 관계를 표현할 수 있다.",
      wrong: [
        "원-핫 인코딩은 모든 실수를 사용하고, 임베딩은 0과 1만 사용한다.",
        "임베딩은 단어 집합을 만들지 않아도 항상 가능하다.",
        "워드투벡은 임베딩과 무관한 압축 프로그램이다.",
        "코사인 유사도는 두 점 사이의 직선거리만을 뜻한다."
      ],
      explain: "이 지문은 원-핫 인코딩의 한계와 임베딩의 개선점을 대비하는 구조다."
    },
    {
      q: () => "코사인 유사도와 유클리드 거리 문제에서 주의할 점은?",
      a: "코사인 유사도는 방향의 유사성을, 유클리드 거리는 두 점 사이의 거리를 중심으로 판단한다.",
      wrong: [
        "둘 다 항상 같은 값을 가진다.",
        "코사인 유사도는 단어 집합의 크기만 뜻한다.",
        "유클리드 거리는 각도가 0도인지 판단하는 값이다.",
        "둘 다 원-핫 인코딩에서만 사용된다."
      ],
      explain: "변형 문제에서는 숫자 예시가 바뀌어도 두 개념의 기준을 구별해야 한다."
    },
  ],
  readingAuction: [
    {
      q: () => "동시 다중 라운드 경매가 기존 방식의 문제를 해결하는 핵심 원리는?",
      a: "모든 대상에 대해 동시에 여러 라운드 입찰을 진행하고, 라운드마다 최고 입찰 정보가 공개된다.",
      wrong: [
        "모든 입찰자가 한 번만 비밀리에 입찰한다.",
        "낙찰자는 항상 두 번째로 높은 가격만 지불한다.",
        "입찰 정보는 끝까지 공개되지 않는다.",
        "제비뽑기로 낙찰자를 정하되 재판매만 금지한다."
      ],
      explain: "동시성, 반복 라운드, 정보 공개가 지문 구조의 핵심이다."
    },
    {
      q: () => "경매 지문이 탄소배출권·광물채굴권·어업권으로 변형될 때 그대로 유지되는 구조는?",
      a: "여러 권리를 동시에 배분해야 하고, 참여자들이 정보를 반영해 다음 라운드 전략을 수정한다는 점이다.",
      wrong: [
        "반드시 통신 주파수라는 소재가 유지되어야 한다.",
        "제비뽑기 방식이 가장 효율적이라는 결론이다.",
        "입찰자는 이전 라운드 정보를 전혀 알 수 없다는 점이다.",
        "정부 수입은 고려하지 않는다는 점이다."
      ],
      explain: "학교 변형 지문은 소재를 바꾸지만 원리와 인과 구조는 유지하는 경우가 많다."
    },
    {
      q: () => "뉴질랜드식 주파수 경매의 한계를 묻는 문제에서 적절한 설명은?",
      a: "입찰자들이 다른 입찰 정보를 알기 어려워 가치에 맞는 적절한 입찰이 어려웠다.",
      wrong: [
        "모든 라운드마다 최고가 정보가 공개되어 경쟁이 지나치게 치열했다.",
        "입찰자가 이전보다 많은 대상에 입찰하지 못하게 한 것이 핵심 문제였다.",
        "정부가 처음부터 동시 다중 라운드 경매를 사용했기 때문이다.",
        "사업 계획서 심사 과정이 지나치게 오래 걸렸기 때문이다."
      ],
      explain: "뉴질랜드 사례는 기존 경매 방식의 한계를 보여 주는 비교 사례다."
    },
  ]
};

function getTemplates(work) {
  if (work.title.includes("임베딩")) return choiceSets.readingEmbedding;
  if (work.title.includes("경매")) return choiceSets.readingAuction;
  if (work.group.includes("소설")) return choiceSets.fiction;
  if (work.group.includes("고전")) return choiceSets.classic;
  return choiceSets.modernPoem;
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeProblem(work, idx) {
  const templates = getTemplates(work);
  const t = templates[idx % templates.length];
  const choices = shuffle([t.a, ...t.wrong]);
  return {
    q: t.q(work),
    choices,
    answer: choices.indexOf(t.a),
    explain: t.explain,
    key: work.key
  };
}

function App() {
  const [selected, setSelected] = useState(works[0]);
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState({});
  const problems = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => makeProblem(selected, i + round));
  }, [selected, round]);

  const score = problems.reduce((sum, p, i) => sum + (picked[i] === p.answer ? 1 : 0), 0);
  const done = Object.keys(picked).length === problems.length;

  function resetFor(work) {
    setSelected(work);
    setPicked({});
    setRound(0);
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>소현 국어 Final</h1>
        <p>문학 작품별 변형 문제 + 독서 지문 변형 문제</p>
        <button onClick={() => { setPicked({}); setRound(r => r + 7); }}>
          새 변형 문제 만들기
        </button>
      </header>

      <main className="layout">
        <aside className="sidebar">
          <h2>시험 범위</h2>
          {["현대시", "고전시가", "고전수필", "고전산문", "현대소설", "독서"].map(g => (
            <section key={g}>
              <h3>{g}</h3>
              {works.filter(w => w.group === g).map(w => (
                <button
                  key={w.title}
                  className={selected.title === w.title ? "active work" : "work"}
                  onClick={() => resetFor(w)}
                >
                  {w.title}
                </button>
              ))}
            </section>
          ))}
        </aside>

        <section className="content">
          <div className="card">
            <h2>{selected.title}</h2>
            <p className="tag">{selected.group}</p>
            <p><b>핵심 키워드:</b> {selected.key.join(" · ")}</p>
            <p className="notice">
              단순 “보기에서 중요한 것” 문제가 아니라, 작품별로 시어·상징·표현법·시상 전개·비교·보기 적용을 묻는 변형형으로 구성됨.
            </p>
          </div>

          {problems.map((p, i) => (
            <div className="card problem" key={i}>
              <h3>{i + 1}. {p.q}</h3>
              <div className="choices">
                {p.choices.map((c, j) => {
                  const chosen = picked[i] === j;
                  const show = picked[i] !== undefined;
                  const correct = j === p.answer;
                  let cls = "choice";
                  if (show && correct) cls += " correct";
                  if (show && chosen && !correct) cls += " wrong";
                  return (
                    <button className={cls} key={j} onClick={() => setPicked({ ...picked, [i]: j })}>
                      {j + 1}. {c}
                    </button>
                  );
                })}
              </div>
              {picked[i] !== undefined && (
                <p className="explain">해설: {p.explain}</p>
              )}
            </div>
          ))}

          {done && (
            <div className="card result">
              <h2>점수: {score} / {problems.length}</h2>
              <p>{score >= 8 ? "좋아. 이제 헷갈린 선지만 다시 보면 돼." : "틀린 문제 해설을 먼저 보고 새 변형 문제를 다시 풀어봐."}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
