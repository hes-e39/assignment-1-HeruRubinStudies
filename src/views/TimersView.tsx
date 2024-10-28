import type React from "react";
import useTimer from "../hooks/useTimer.tsx";
import Stopwatch from "../components/timers/Stopwatch/Stopwatch.tsx";
import Countdown from "../components/timers/Countdown/Countdown.tsx";
import XY from "../components/timers/XY/XY.tsx";
import Tabata from "../components/timers/Tabata/Tabata.tsx";
import "./TimersView.module.css";

const Timer: React.FC = () => {

    const { milliseconds, isRunning, start, pause, reset } = useTimer();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 outerContainer">
            <Stopwatch milliseconds={milliseconds}/>
            <Countdown milliseconds={milliseconds} isRunning={isRunning} initialTime={6000} />
            <XY milliseconds={milliseconds} isRunning={isRunning} />
            <Tabata isRunning={isRunning} milliseconds={milliseconds}  />
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
