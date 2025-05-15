import { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(''); // 👉 Bot 응답 저장

  // 질문 전송 함수
  const handleSend = async () => {
    if (!question.trim()) return;

    try {
      const res = await fetch("https://webapp-lgit-databricks-hq-03-gjach6fpbjh4eqc9.koreacentral-01.azurewebsites.net/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "message",
          text: question,
          from: {
            id: "genie-ui",
            name: "Genie UI"
          }
        })
      });

      const data = await res.text(); // 또는 res.json() 사용 가능
      console.log("✅ 응답:", data);
      setAnswer(data);
    } catch (err) {
      console.error("❌ 질문 전송 실패:", err);
      setAnswer("❗ 질문 처리 중 오류가 발생했어요.");
    }
  };

  // 키워드 클릭 시 입력값 설정 + 질문 전송
  const handleKeywordClick = (text) => {
    setQuestion(text);
    setTimeout(() => {
      handleSend();
    }, 100); // setQuestion 적용 후 전송
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      height: '100vh', fontFamily: 'sans-serif',
      backgroundColor: '#ffffff'
    }}>
      <h1 style={{ marginBottom: '18px' }}>경영정보Bot에게 질문해 주세요!</h1>


    <div style={{ display: 'flex', marginBottom: '20px' }}>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        placeholder="여기에 입력하세요"
        style={{
          padding: '10px 15px',
          fontSize: '16px',
          width: '300px',
          borderRadius: '8px 0 0 8px',
          border: '1px solid #ccc',
          borderRight: 'none'
        }}
      />

      <button
        onClick={handleSend}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0078D4',
          color: '#fff',
          border: '1px solid #0078D4',
          borderRadius: '0 8px 8px 0',
          cursor: 'pointer'
        }}
      >
        ENTER
      </button>
    </div>



    
      {/* 키워드 버튼 리스트 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
        {[
          "24년 1월부터 25년 2월까지 사무직과 현장직 인원수를 월별로 알려줘",
          "25년 2월 기준 국내 사무직 부서별 인원수 Top5 부서명과 이 부서들의 인원수를 알려줘",
          "25년 2월 기준 국내 사무직 직급별 인원수는 몇 명이고 각각 비중은 어떻게 돼?",
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

      {/* 답변 출력 */}
      {answer && (
        <div style={{
          maxWidth: '600px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <strong>📎 봇 응답:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;