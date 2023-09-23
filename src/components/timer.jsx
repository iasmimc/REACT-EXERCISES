import { useTimer } from "../hooks/usetimer";
import "../components/timer.css";

export function Timer(props) {
  const {
    timeElapsedMs,
    timeMissingMs,
    timeOverdueMs,
    timeMs,
    timeElapsedParts,
    timeMissingParts,
    timeOverdueParts,
    timeParts,
    running,

    setTimer,
    startTimer,
    resetTimer,
    pauseTimer,
  } = useTimer();

  const formatTimer = ({ hours, minutes, seconds }) => {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  function aumentarHoras() {
    setTimer({ hours: BigInt(timeParts.hours) + 1n });
  }

  function diminuirHoras() {
    setTimer({ hours: BigInt(timeParts.hours) - 1n });
  }

  function aumentarMinutos() {
    setTimer({ minutes: BigInt(timeParts.minutes) + 1n });
  }

  function diminuirMinutos() {
    setTimer({ minutes: BigInt(timeParts.minutes) - 1n });
  }

  function aumentarSegundos() {
    setTimer({ seconds: BigInt(timeParts.seconds) + 1n });
  }

  function diminuirSegundos() {
    setTimer({ seconds: BigInt(timeParts.seconds) - 1n });
  }

  function reiniciarContador() {
    // setTimer()
    resetTimer();
  }

  return (
    <main>
      <div className="toggle-wrapper">
        <button id="left" onClick={() => aumentarHoras()}>
          {" "}
          {"▲"}{" "}
        </button>
        <button id="left" onClick={() => aumentarMinutos()}>
          {" "}
          {"▲"}{" "}
        </button>
        <button id="left" onClick={() => aumentarSegundos()}>
          {" "}
          {"▲"}{" "}
        </button>
      </div>
      <div className="timer-wrapper">
        <h1>
          {formatTimer(
            timeOverdueParts.seconds > 0 ? timeOverdueParts : timeMissingParts
          )}
        </h1>
      </div>
      <div className="toggle-wrapper">
        <button id="right" onClick={() => diminuirHoras()}>
          {" "}
          {"▼"}
        </button>
        <button id="right" onClick={() => diminuirMinutos()}>
          {" "}
          {"▼"}
        </button>
        <button id="right" onClick={() => diminuirSegundos()}>
          {" "}
          {"▼"}
        </button>
      </div>

      <div class="buttons-wrapper">
        <button onClick={() => startTimer()}>Iniciar</button>{" "}
        {/* alternância de botões: precisa do setRunning() definir para true / false */}
        <button onClick={() => pauseTimer()}>Pause</button>{" "}
        {/* alternância de botões: precisa do setRunning() definir para true / false */}
        <button onClick={() => reiniciarContador()}>Reiniciar</button>
      </div>

      <div class="mensagem">
        <p>Usa os arrows para definir as horas, minutos e segundos.</p>
        {timeOverdueParts.seconds > 0 && (
            <img src="../.././public/assets/explosao.png" />
        )}

        {timeOverdueParts.seconds > 0 && (
          <p id="explodiu">
            A bomba explodiu há...
            <br />
            {timeOverdueParts.hours} horas <br />
            {timeOverdueParts.minutes} minutos <br />
            {timeOverdueParts.seconds} segundos
          </p>
        )}
      </div>
    </main>
  );
}

export default Timer;
