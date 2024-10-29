import type React from "react";
import {useState} from "react";
import useTimer from "../hooks/useTimer.tsx";
import Stopwatch from "../components/timers/Stopwatch/Stopwatch.tsx";
import Countdown from "../components/timers/Countdown/Countdown.tsx";
import XY from "../components/timers/XY/XY.tsx";
import Tabata from "../components/timers/Tabata/Tabata.tsx";
import TabMenu from "../components/menus/TabMenu.tsx";
import styles from "./TimersView.module.scss";
import commonStyles from "../common-styles/common-styles.module.scss"


type timerType = "XY" | "Stopwatch" | "Countdown" | "Tabata";

const Timer: React.FC = () => {
    const menuItems = [
        {
            label: 'Stopwatch',
            iconName: 'stopwatch',
            onClick: () => setActiveTimer("Stopwatch"),
        },
        {
            label: 'Countdown',
            iconName: 'countdown',
            onClick: () => setActiveTimer("Countdown"),
        },
        {
            label: 'XY',
            iconName: 'xy',
            onClick: () => setActiveTimer("XY"),
        },
        {
            label: 'Tabata',
            iconName: 'tabata',
            onClick: () => setActiveTimer("Tabata"),
        },
    ];
    const { milliseconds, isRunning, start, pause, reset } = useTimer();
    const [activeTimer, setActiveTimer] = useState<timerType>("Countdown");
    return (
        <div className={`${styles.outerContainer} ${commonStyles.flexVert} ${commonStyles.flexVertCenter}`}>
            <div>
                {activeTimer === "Stopwatch" && (
                    <Stopwatch milliseconds={milliseconds} />
                )}
                {activeTimer === "Countdown" && (
                    <Countdown milliseconds={milliseconds} isRunning={isRunning} initialTime={6000} />
                )}
                {activeTimer === "XY" && (
                    <XY milliseconds={milliseconds} isRunning={isRunning} />
                )}
                {activeTimer === "Tabata" && (
                    <Tabata isRunning={isRunning} milliseconds={milliseconds} />
                )}
            </div>

            <div>
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
            <TabMenu classes={styles.tabMenuMain} items={menuItems}  />
        </div>
    );
};

export default Timer;
