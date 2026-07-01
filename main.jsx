import React, {useMemo, useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import { CheckCircle2, BookOpen, Brain, RotateCcw, Timer, Home, Sparkles } from 'lucide-react';
import './style.css';

const works = [
  {id:'dove', type:'문학', title:'포스터 속의 비둘기', tags:['현대시','상징','현실비판'], focus:['비둘기의 상징성','시각 이미지','현대 문명 비판 가능성','화자의 태도']},
  {id:'snow', type:'문학', title:'대설주의보', tags:['현대시','풍경','긴장감'], focus:['대설 상황의 분위기','감각적 이미지','화자의 인식 변화','자연과 인간']},
  {id:'summer', type:'문학', title:'그 여름의 끝', tags:['현대시','상실','회상'], focus:['계절 이미지','끝의 의미','화자의 정서','시상 전개']},
  {id:'tree', type:'문학', title:'그 나무', tags:['현대시','존재','성찰'], focus:['나무의 상징','거리감과 응시','내면 성찰','대상과 화자 관계']},
  {id:'primitive', type:'문학', title:'원시', tags:['현대시','본질','생명성'], focus:['원시의 의미','문명과 대비','생명 이미지','화자의 지향']},
  {id:'tea', type:'문학', title:'차심', tags:['현대시','성찰','여백'], focus:['차와 마음의 연결','정적 분위기','여백의 미','자기 성찰']},
  {id:'neungyang', type:'문학', title:'능양시집서', tags:['고전수필','서문','문학론'], focus:['글쓴이의 문학관','시집 서문의 기능','평가 기준','고전 산문의 논리']},
  {id:'bigTree', type:'문학', title:'너무 큰 나무', tags:['현대소설','인물','상징'], focus:['큰 나무의 상징','인물 갈등','서술자의 태도','사회적 의미']},
  {id:'manheung', type:'문학', title:'만흥', tags:['고전시가','강호가도','자연'], focus:['자연 속 흥취','안빈낙도','화자의 삶의 태도','시조 표현']},
  {id:'jangchun', type:'문학', title:'장춘정기', tags:['고전수필','누정기','자연'], focus:['장춘정의 의미','공간 묘사','글쓴이의 가치관','기문의 구성']},
  {id:'stork', type:'문학', title:'황새결송', tags:['고전산문','송사','풍자'], focus:['송사의 전개','황새의 판단','풍자 대상','권선징악']},
  {id:'vanish', type:'문학', title:'모든 사라지는 것들은 뒤에 여백을 남긴다', tags:['현대시','소멸','여백'], focus:['사라짐과 여백','상실의 의미','이미지 연결','철학적 성찰']},
  {id:'apple', type:'문학', title:'사과밭을 지나며', tags:['현대시','생명','감각'], focus:['사과밭 이미지','감각적 표현','삶에 대한 태도','시상 전개']},
  {id:'goldRing', type:'문학', title:'금환기봉', tags:['고전소설','기이성','서사'], focus:['기이한 사건','인물의 운명','갈등 해결','고전소설 특징']},
  {id:'mountain', type:'문학', title:'산이 날 에워싸고', tags:['현대시','자연','위안'], focus:['산의 상징','반복 표현','화자의 정서','자연 친화']},
  {id:'flow', type:'문학', title:'흐름에 대하여', tags:['현대시','시간','성찰'], focus:['흐름의 의미','시간 의식','삶의 태도','추상 개념 형상화']},
  {id:'hanjeong', type:'문학', title:'한정록 서', tags:['고전수필','서문','은거'], focus:['한정의 의미','삶의 태도','서문의 논리','은일의 가치']},
  {id:'embedding', type:'독서', title:'임베딩과 유사도 표현', tags:['과학기술','개념비교','추론'], focus:['원-핫 인코딩','임베딩','워드투벡','유클리드 거리','코사인 유사도']},
  {id:'auction', type:'독서', title:'동시 다중 라운드 경매', tags:['사회/경제','변형출제','추론'], focus:['심사·제비뽑기 한계','뉴질랜드 경매 실패','동시 다중 라운드 경매 절차','정보 공개','입찰 제한 이유']}
];

const baseQuestions = {
  embedding: [
    {q:'원-핫 인코딩의 한계로 가장 적절한 것은?', a:1, choices:['계산에 실수를 사용할 수 없다','단어 간 유사성이나 관계성을 표현하기 어렵다','단어 집합을 만들 수 없다','컴퓨터가 숫자를 처리하지 못한다'], exp:'원-핫 인코딩은 각 단어를 독립적인 벡터로 표현하므로 관계성 표현이 어렵다.'},
    {q:'코사인 유사도에 대한 설명으로 적절한 것은?', a:2, choices:['항상 0 이상이다','두 점 사이의 직선 거리를 의미한다','원점에서 두 점을 이은 선분의 각도와 관련된다','차원이 높아지면 사용할 수 없다'], exp:'코사인 유사도는 방향의 유사성을 보는 값이다.'}
  ],
  auction: [
    {q:'동시 다중 라운드 경매에서 라운드마다 입찰 정보를 공개하는 주된 효과는?', a:0, choices:['참여자가 전략을 수정하게 하여 효율성을 높인다','입찰자가 더 적은 주파수만 사게 한다','정부 수입을 일부러 낮춘다','제비뽑기 요소를 강화한다'], exp:'공개된 정보는 다음 라운드 입찰 전략 수정의 근거가 된다.'},
    {q:'이전 라운드보다 더 많은 주파수에 입찰하지 못하게 한 이유로 적절한 것은?', a:3, choices:['주파수 가격을 고정하기 위해','낙찰자를 운으로 정하기 위해','제비뽑기 참여자를 늘리기 위해','자신의 정보는 감추고 남의 정보만 얻는 행위를 막기 위해'], exp:'입찰 제한은 정보만 얻는 불공정 행위를 예방하기 위한 장치이다.'}
  ]
};

function makeLiteratureQuestion(work){
  const templates = [
    {q:`「${work.title}」에서 가장 먼저 확인해야 할 출제 포인트는?`, choices:[work.focus[0], '작가의 출생지 암기', '작품 제목의 글자 수', '교과서 쪽수'], a:0, exp:`이 작품은 ${work.focus[0]}을 중심으로 작품 전체 의미를 잡는 것이 중요해.`},
    {q:`「${work.title}」의 선지 판단에서 가장 조심해야 할 것은?`, choices:['표현과 정서를 근거 없이 단정하는 선지','제목을 확인하는 선지','작품 갈래를 묻는 선지','작품명을 그대로 읽는 선지'], a:0, exp:'문학 문제는 근거 없는 과잉 해석 선지를 자주 틀리게 만든다.'},
    {q:`「${work.title}」을 <보기>와 연결할 때 우선 볼 기준은?`, choices:[work.focus[1] || work.focus[0], '문제 번호', '글자 크기', '작품이 실린 책 표지'], a:0, exp:'<보기> 문제는 작품 내부 근거와 보기의 관점을 정확히 연결해야 한다.'}
  ];
  return templates[Math.floor(Math.random()*templates.length)];
}

function makeReadingVariant(topic){
  if(topic.id === 'auction'){
    const domains = ['탄소배출권','인공위성 궤도','어업권','광물 채굴권','공항 슬롯'];
    const d = domains[Math.floor(Math.random()*domains.length)];
    return {
      q:`변형 지문: 정부가 ${d}을 여러 사업자에게 배분하려고 한다. 모든 대상에 대해 여러 라운드로 동시에 입찰하고, 매 라운드 최고 입찰가를 공개한다. 이 방식의 장점으로 가장 적절한 것은?`,
      choices:['대상별 정보를 공개해 참여자의 합리적 전략 수정을 돕는다','무조건 두 번째 입찰가만 지불하게 한다','사업 계획서 심사 시간을 늘린다','낙찰자를 운에 맡긴다'],
      a:0,
      exp:'상황이 바뀌어도 핵심 원리는 정보 공개와 동시 진행을 통한 효율성 향상이다.'
    }
  }
  return {
    q:'새 문장 “오늘 기분 매우 좋다”를 단어 집합에 추가하면 생길 수 있는 변화로 적절한 것은?',
    choices:['새 단어가 있으면 단어 집합 크기가 늘 수 있다','원-핫 인코딩이 불가능해진다','코사인 유사도는 문학에서만 쓰인다','임베딩은 0과 1만 사용한다'],
    a:0,
    exp:'새로운 단어가 추가되면 단어 집합과 벡터 차원이 달라질 수 있다.'
  }
}

function App(){
  const [selected, setSelected] = useState(works[0]);
  const [mode, setMode] = useState('home');
  const [answers, setAnswers] = useState(()=>JSON.parse(localStorage.getItem('kfinal')||'{}'));
  const [quiz, setQuiz] = useState([]);
  const progress = Object.keys(answers).length;
  useEffect(()=>localStorage.setItem('kfinal', JSON.stringify(answers)), [answers]);

  const startQuiz = (kind='normal') => {
    const qs = selected.type === '독서'
      ? [...(baseQuestions[selected.id]||[]), makeReadingVariant(selected)]
      : [makeLiteratureQuestion(selected), makeLiteratureQuestion(selected), makeLiteratureQuestion(selected)];
    setQuiz(qs.map((x,i)=>({...x, key:`${selected.id}-${Date.now()}-${i}`, picked:null})));
    setMode(kind === 'exam' ? 'exam' : 'quiz');
  };

  const mark = (qid, idx) => setQuiz(q=>q.map(item=>item.key===qid?{...item,picked:idx}:item));
  const grade = () => {
    const correct = quiz.filter(q=>q.picked===q.a).length;
    setAnswers({...answers, [selected.id]: {title:selected.title, correct, total:quiz.length, date:new Date().toLocaleString()}});
  }

  return <div className="app">
    <aside>
      <h1><Sparkles size={22}/> 소현 국어 Final</h1>
      <div className="progress"><b>{progress}</b> / {works.length} 완료</div>
      <button onClick={()=>setMode('home')} className="home"><Home size={16}/> 홈</button>
      <h3>문학</h3>
      {works.filter(w=>w.type==='문학').map(w=><button key={w.id} onClick={()=>{setSelected(w);setMode('study')}} className={selected.id===w.id?'active':''}>{answers[w.id]?'✅':'□'} {w.title}</button>)}
      <h3>독서</h3>
      {works.filter(w=>w.type==='독서').map(w=><button key={w.id} onClick={()=>{setSelected(w);setMode('study')}} className={selected.id===w.id?'active':''}>{answers[w.id]?'✅':'□'} {w.title}</button>)}
    </aside>
    <main>
      {mode==='home' && <section className="hero">
        <h2>시험범위 전용 문제풀이 사이트</h2>
        <p>작품별 핵심 정리 → EBS형 문제 → 변형 문제 → 자동 채점 → 오답 기록 순서로 공부해.</p>
        <div className="cards"><div><BookOpen/> 작품 {works.length}개 탑재</div><div><Brain/> 변형 문제 생성</div><div><CheckCircle2/> 자동 저장</div></div>
        <button className="primary" onClick={()=>{setSelected(works[0]);setMode('study')}}>공부 시작</button>
      </section>}
      {mode==='study' && <section>
        <span className="pill">{selected.type}</span><h2>{selected.title}</h2>
        <div className="tags">{selected.tags.map(t=><span key={t}>{t}</span>)}</div>
        <h3>핵심 체크</h3>
        <ul className="focus">{selected.focus.map(f=><li key={f}>{f}</li>)}</ul>
        <div className="actions"><button className="primary" onClick={()=>startQuiz()}>문제 풀기</button><button onClick={()=>startQuiz('exam')}><Timer size={16}/> 실전 모드</button></div>
      </section>}
      {(mode==='quiz'||mode==='exam') && <section>
        <h2>{selected.title} 문제</h2>
        {mode==='exam' && <p className="notice">실전 모드: 선지를 빠르게 판단하고 근거를 바로 확인해.</p>}
        {quiz.map((q,n)=><div className="q" key={q.key}>
          <b>{n+1}. {q.q}</b>
          {q.choices.map((c,i)=><button key={i} onClick={()=>mark(q.key,i)} className={q.picked===i?'picked':''}>{i+1}. {c}</button>)}
          {q.picked!==null && <p className={q.picked===q.a?'right':'wrong'}>{q.picked===q.a?'정답':'오답'} · {q.exp}</p>}
        </div>)}
        <div className="actions"><button className="primary" onClick={grade}>채점 저장</button><button onClick={()=>startQuiz()}><RotateCcw size={16}/> 새 문제</button></div>
      </section>}
    </main>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
