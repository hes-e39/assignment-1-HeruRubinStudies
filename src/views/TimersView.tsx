import type React from "react";
import useTimer from "../hooks/useTimer.tsx";


const Timer: React.FC = () => {
    const { time, isRunning, start, pause, reset } = useTimer(0);

    return (
        <div>
            <h1>Timer: {time}</h1>
            <button onClick={start} disabled={isRunning}>
                Start
            </button>
            <button onClick={pause} disabled={!isRunning}>
                Pause
            </button>
            <button onClick={reset}>
                Reset
            </button>
        </div>
    );
};

export default Timer;
