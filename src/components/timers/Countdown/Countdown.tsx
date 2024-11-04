import type React from 'react';
import { useEffect, useState } from 'react';
import FormattedTimeDisplay from '../../generic/FormattedTimeDisplay';
import TimerControls from '../../menus/TimerControls/TimerControls';
import CompletionMessage from "../../visualization/CompletionMessage/CompletionMessage";
import type { TimerFuncProps } from '../../menus/TimerControls/TimerControls';
import styles from './Countdown.module.scss';

interface CountdownProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
    initialTime: number; // The initial countdown time in milliseconds
}

const Countdown: React.FC<CountdownProps> = ({ milliseconds, isRunning, initialTime, reset, pause, start }) => {
    const [remainingTime, setRemainingTime] = useState(initialTime);
    const [isCountdownStopped, setIsCountdownStopped] = useState(false);

    // Calculate the progress as a percentage
    const progressPercentage = (remainingTime / initialTime) * 100;

    // Update the remaining time based on elapsed milliseconds
    useEffect(() => {
        if (!isCountdownStopped) {
            const timeLeft = initialTime - milliseconds;
            if (timeLeft <= 0) {
                setRemainingTime(0);
                setIsCountdownStopped(true);
            } else {
                setRemainingTime(timeLeft);
            }
        }
    }, [milliseconds, initialTime, isCountdownStopped]);

    // Reset the countdown without starting it automatically
    const resetCountdown = () => {
        setRemainingTime(initialTime);
        setIsCountdownStopped(false);
        reset(); // Reset external timer state without starting
    };

    return (
        <div className={styles.countdownContainer}>
            {
                remainingTime > 0 &&
                <>
                    <FormattedTimeDisplay milliseconds={remainingTime} />
                    <TimerControls reset={resetCountdown} isRunning={isRunning} pause={pause} start={start}>
                        <div className={styles.progressBarContainer}>
                            <div
                                className={styles.progressBar}
                                style={{width: `${progressPercentage}%`}}
                            />
                        </div>
                    </TimerControls>
                </>
            }

            {/* Show Completion Message when time is up */}
            {remainingTime === 0 && (
                <CompletionMessage
                    totalRounds={1}
                    roundDuration={initialTime}
                    onRepeat={() => {
                        resetCountdown();
                        start(); // Start the countdown only on explicit user action
                    }}
                />
            )}
        </div>
    );
};

export default Countdown;
