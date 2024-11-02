import type React from 'react';
import { useEffect, useState } from 'react';
import FormattedTimeDisplay from '../../generic/FormattedTimeDisplay';
import TimerControls from '../../menus/TimerControls/TimerControls';
import CompletionMessage from "../../visualization/CompletionMessage/CompletionMessage";
import type { TimerFuncProps } from '../../menus/TimerControls/TimerControls';

interface CountdownProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
    initialTime: number; // The initial countdown time in milliseconds
}

const Countdown: React.FC<CountdownProps> = ({ milliseconds, isRunning, initialTime, reset, pause, start }) => {
    const [remainingTime, setRemainingTime] = useState(initialTime);
    const [isCountdownStopped, setIsCountdownStopped] = useState(false);

    // Update the remaining time
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

    // Reset the countdown when the timer is reset
    useEffect(() => {
        if (!isRunning && milliseconds === 0) {
            resetCountdown();
        }
    }, [isRunning, milliseconds]);

    // Reset and start the countdown
    const resetCountdown = () => {
        setRemainingTime(initialTime);
        setIsCountdownStopped(false);
        reset(); // Reset external timer state
    };

    const repeatTimer = ()=>{
        reset(); // Reset external timer state
        start(); // Start the countdown again
    }

    return (
        <div>
            {remainingTime > 0 ? (
                <>
                    <FormattedTimeDisplay milliseconds={remainingTime} />
                    <TimerControls reset={reset} isRunning={isRunning} pause={pause} start={start} />
                </>
            ) : (
                <CompletionMessage
                    totalRounds={1}
                    roundDuration={initialTime}
                    onRepeat={repeatTimer} // Use resetCountdown to reset and start
                />
            )}
        </div>
    );
};

export default Countdown;
