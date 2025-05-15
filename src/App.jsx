import { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');

  // 키워드 클릭 시 실행되는 함수
  const handleKeywordClick = (text) => {
    setQuestion(text);
    // 👉 여기서 즉시 처리할 수도 있음 (API 호출 등)
    console.log('질문 전송:', text);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      height: '100vh', fontFamily: 'sans-serif',
      backgroundColor: '#f9f9f9'
    }}>
      <h1 style={{ marginBottom: '20px' }}>경영정보Bot에게 질문해 주세요!</h1>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="여기에 입력하세요"
        style={{
          padding: '10px 15px',
          fontSize: '16px',
          width: '300px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          marginBottom: '20px'
        }}
      />

      {/* 키워드 버튼 리스트 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
        {[
          "📊 24년 1월부터 25년 2월까지 사무직과 현장직 인원수를 월별로 알려줘",
          "📦 25년 2월 기준 국내 사무직 부서별 인원수 Top5 부서명과 이 부서들의 인원수를 알려줘",
          "🔍 25년 2월 기준 국내 사무직 직급별 인원수는 몇 명이고 각각 비중은 어떻게 돼?",
        ].map((text, index) => (
          <button
            key={index}
            onClick={() => handleKeywordClick(text)}
            style={{
              padding: '8px 12px',
              borderRadius: '20px',
              border: '1px solid #888',
              backgroundColor: '#fff',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
