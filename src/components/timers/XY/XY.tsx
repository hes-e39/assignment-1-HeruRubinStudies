import type React from 'react';
import { useEffect, useState } from 'react';
import styles from '../timer-common.module.scss';
import FormattedTimeDisplay from "../../generic/FormattedTimeDisplay.tsx";
import type {TimerFuncProps} from "../../menus/TimerControls/TimerControls.tsx";

interface XYTimerProps extends TimerFuncProps{
    milliseconds: number;
    isRunning: boolean;
}

const XY: React.FC<XYTimerProps> = ({ milliseconds, isRunning }) => {
    const totalRounds = 6; // Total number of rounds
    const roundDuration = 4000; // Duration of each round in milliseconds (1 minute)

    const [roundsLeft, setRoundsLeft] = useState(totalRounds);
    const [roundStartTime, setRoundStartTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(roundDuration);
    const [isXYStopped, setIsXYStopped] = useState(false);

    // Reset state when the timer is reset
    useEffect(() => {
        if (milliseconds === 0 && !isRunning) {
            setRoundsLeft(totalRounds);
            setRoundStartTime(0);
            setRemainingTime(roundDuration);
            setIsXYStopped(false);
        }
    }, [milliseconds, isRunning ]);

    // Update remaining time and handle round transitions
    useEffect(() => {
        if (!isXYStopped && isRunning && roundsLeft > 0) {
            const elapsedTime = milliseconds - roundStartTime;
            const timeLeft = roundDuration - elapsedTime;

            if (timeLeft <= 0) {
                if (roundsLeft - 1 > 0) {
                    // Start the next round
                    setRoundsLeft(roundsLeft - 1);
                    setRoundStartTime(milliseconds);
                    setRemainingTime(roundDuration);
                } else {
                    // No rounds left; stop the XY timer
                    setRoundsLeft(0);
                    setRemainingTime(0);
                    setIsXYStopped(true);
                }
            } else {
                // Update remaining time for the current round
                setRemainingTime(timeLeft);
            }
        }
    }, [milliseconds, isRunning, isXYStopped, roundsLeft, roundStartTime]);


        return (
            <div className={styles.actionArea}>
                <h2>Rounds Left: {roundsLeft}</h2>
                <FormattedTimeDisplay milliseconds={remainingTime}/>
            </div>
        );
};

export default XY;
