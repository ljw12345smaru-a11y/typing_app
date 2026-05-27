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

if (
  value.replace(/\s/g, "").length >=
  anthem.replace(/\s/g, "").length
) {
  setFinished(true);
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

    return Math.round(input.length / time);
  };

  const restart = () => {
    setInput("");
    setStarted(false);
    setFinished(false);
    setStartTime(null);
    setTime(0);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f3f4f6",
      padding: "20px",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        background: "white",
        borderRadius: "20px",
        padding: "20px"
      }}>
        <h1>애국가 타자 연습</h1>

        <p>시간: {time.toFixed(1)}초</p>
        <p>정확도: {getAccuracy()}%</p>
        <p>속도: {getSpeed()} 타/초</p>

        <div style={{
          whiteSpace: "pre-line",
          lineHeight: "2",
          padding: "20px",
          background: "#f9fafb",
          borderRadius: "10px",
          marginBottom: "20px"
        }}>
          {anthem.split("").map((char, index) => {
            let color = "black";

            if (index < input.length) {
              color = input[index] === char ? "green" : "red";
            }

            return (
              <span key={index} style={{ color }}>
                {char}
              </span>
            );
          })}
        </div>

        <textarea
          value={input}
          onChange={handleChange}
          disabled={finished}
          placeholder="여기에 입력하세요"
          style={{
            width: "100%",
            height: "200px",
            fontSize: "18px",
            padding: "10px"
          }}
        />

        <button
          onClick={restart}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px"
          }}
        >
          다시 시작
        </button>

        {finished && (
  <div style={{
    marginTop: "20px",
    padding: "20px",
    background: "#dcfce7",
    borderRadius: "10px",
    textAlign: "center"
  }}>
    <h2>타자 연습 완료!</h2>

    <p>총 입력 타수: {input.length}타</p>

    <p>걸린 시간: {time.toFixed(1)}초</p>

    <p>
      최종 속도:
      {" "}
      {Math.round((input.length / time) * 60)}
      {" "}
      타/분
    </p>

    <p>정확도: {getAccuracy()}%</p>
  </div>
)}
      </div>
    </div>
  );
}
