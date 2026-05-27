import React from "react";

export default function App() {
  const anthem = `동해 물과 백두산이 마르고 닳도록
하느님이 보우하사 우리나라 만세
무궁화 삼천리 화려 강산
대한 사람 대한으로 길이 보전하세`;

  const [input, setInput] = React.useState("");
  const [started, setStarted] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const [startTime, setStartTime] = React.useState(null);
  const [time, setTime] = React.useState(0);

  const [nickname, setNickname] = React.useState(
    localStorage.getItem("nickname") || ""
  );

  const [bestScore, setBestScore] = React.useState(
    Number(localStorage.getItem("bestScore")) || 0
  );

  React.useEffect(() => {
    let timer;

    if (started && !finished) {
      timer = setInterval(() => {
        setTime((Date.now() - startTime) / 1000);
      }, 100);
    }

    return () => clearInterval(timer);
  }, [started, finished, startTime]);

  const handleChange = (e) => {
    const value = e.target.value;

    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
    }

    setInput(value);

    // 공백 제거 후 길이 비교
    const cleanValue = value.replace(/\s/g, "");
    const cleanAnthem = anthem.replace(/\s/g, "");

    if (cleanValue.length >= cleanAnthem.length) {
      setFinished(true);

      const finalSpeed = Math.round((value.length / time) * 60);

      // 최고 기록 저장
      if (finalSpeed > bestScore) {
        setBestScore(finalSpeed);

        localStorage.setItem("bestScore", finalSpeed);
        localStorage.setItem("nickname", nickname);
      }
    }
  };

  const getAccuracy = () => {
    let correct = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === anthem[i]) {
        correct++;
      }
    }

    return input.length === 0
      ? 100
      : ((correct / input.length) * 100).toFixed(1);
  };

  const getSpeed = () => {
    if (time === 0) return 0;

    return Math.round((input.length / time) * 60);
  };

  const restart = () => {
    setInput("");
    setStarted(false);
    setFinished(false);
    setStartTime(null);
    setTime(0);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "20px",
        fontFamily: "sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "white",
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          애국가 타자 연습
        </h1>

        {/* 닉네임 입력 */}
        <input
          type="text"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "1px solid #ccc"
          }}
        />

        {/* 정보 표시 */}
        <p>시간: {time.toFixed(1)}초</p>
        <p>정확도: {getAccuracy()}%</p>
        <p>현재 속도: {getSpeed()} 타/분</p>
        <p>최고 기록: {bestScore} 타/분</p>

        {/* 애국가 표시 */}
        <div
          style={{
            whiteSpace: "pre-line",
            lineHeight: "2",
            padding: "20px",
            background: "#f9fafb",
            borderRadius: "10px",
            marginBottom: "20px",
            fontSize: "18px"
          }}
        >
          {anthem.split("").map((char, index) => {
            let color = "black";

            if (index < input.length) {
              color =
                input[index] === char
                  ? "green"
                  : "red";
            }

            return (
              <span
                key={index}
                style={{ color }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* 입력창 */}
        <textarea
          value={input}
          onChange={handleChange}
          disabled={finished}
          placeholder="여기에 입력하세요"
          style={{
            width: "100%",
            height: "200px",
            fontSize: "18px",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc"
          }}
        />

        {/* 다시 시작 버튼 */}
        <button
          onClick={restart}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer"
          }}
        >
          다시 시작
        </button>

        {/* 완료 결과 */}
        {finished && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "#dcfce7",
              borderRadius: "10px",
              textAlign: "center"
            }}
          >
            <h2>타자 연습 완료!</h2>

            <p>
              닉네임: {nickname}
            </p>

            <p>
              총 입력 타수:
              {" "}
              {input.length}타
            </p>

            <p>
              걸린 시간:
              {" "}
              {time.toFixed(1)}초
            </p>

            <p>
              최종 속도:
              {" "}
              {Math.round((input.length / time) * 60)}
              {" "}
              타/분
            </p>

            <p>
              정확도:
              {" "}
              {getAccuracy()}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}