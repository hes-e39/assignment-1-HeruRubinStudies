import type React from "react";
import useTimer from "../hooks/useTimer.tsx";
import Stopwatch from "../components/timers/Stopwatch.tsx";
import Countdown from "../components/timers/Countdown.tsx";
import XY from "../components/timers/XY.tsx";


const Timer: React.FC = () => {

    const { milliseconds, isRunning, start, pause, reset } = useTimer();

    return (
        <div>
            <Stopwatch milliseconds={milliseconds}/>
            <Countdown milliseconds={milliseconds} isRunning={isRunning} initialTime={6000} />
            <XY milliseconds={milliseconds} isRunning={isRunning} />
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
