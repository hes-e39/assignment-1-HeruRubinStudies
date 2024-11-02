import type React from 'react';
import { useEffect, useState } from 'react';
import styles from '../timer-common.module.scss';
import FormattedTimeDisplay from "../../generic/FormattedTimeDisplay";
import TimerControls from "../../menus/TimerControls/TimerControls";
import type { TimerFuncProps } from "../../menus/TimerControls/TimerControls";
import Rounds from "../../visualization/Rounds/Rounds";
import CompletionMessage from "../../visualization/CompletionMessage/CompletionMessage.tsx";

interface XYTimerProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
}

const XY: React.FC<XYTimerProps> = ({ milliseconds, isRunning, reset, pause, start }) => {
    const totalRounds = 6;
    const roundDuration = 4000;

    const [roundsLeft, setRoundsLeft] = useState(totalRounds);
    const [roundStartTime, setRoundStartTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(roundDuration);
    const [isXYStopped, setIsXYStopped] = useState(false);
    const [completedRounds, setCompletedRounds] = useState<number[]>([]);

    useEffect(() => {
        if (milliseconds === 0 && !isRunning) {
            resetXY();
        }
    }, [milliseconds, isRunning]);

    const resetXY = () => {
        setRoundsLeft(totalRounds);
        setRoundStartTime(0);
        setRemainingTime(roundDuration);
        setIsXYStopped(false);
        setCompletedRounds([]);
    };

    useEffect(() => {
        if (!isXYStopped && isRunning && roundsLeft > 0) {
            const elapsedTime = milliseconds - roundStartTime;
            const timeLeft = roundDuration - elapsedTime;

            if (timeLeft <= 0) {
                if (roundsLeft - 1 > 0) {
                    setRoundsLeft(roundsLeft - 1);
                    setCompletedRounds((prev) => [...prev, totalRounds - roundsLeft]);
                    setRoundStartTime(milliseconds);
                    setRemainingTime(roundDuration);
                } else {
                    setRoundsLeft(0);
                    setRemainingTime(0);
                    setIsXYStopped(true);
                }
            } else {
                setRemainingTime(timeLeft);
            }
        }
    }, [milliseconds, isRunning, isXYStopped, roundsLeft, roundStartTime]);

    return (
        <div className={styles.actionArea}>
            {roundsLeft > 0 ? (
                <>
                    <FormattedTimeDisplay milliseconds={remainingTime} />
                    <TimerControls reset={reset} isRunning={isRunning} pause={pause} start={start}>
                        <h2>Rounds Left: {roundsLeft}</h2>
                        <Rounds
                            completedRounds={completedRounds}
                            roundsLeft={roundsLeft}
                            totalRounds={totalRounds}
                            workDuration={roundDuration}
                            remainingTime={remainingTime}
                        />
                    </TimerControls>
                </>
            ) : (
                <CompletionMessage
                    totalRounds={totalRounds}
                    roundDuration={roundDuration}
                    onRepeat={resetXY}
                />
            )}
        </div>
    );
};

export default XY;
