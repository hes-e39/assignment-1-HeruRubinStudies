import type React from 'react';
import { useEffect, useState } from 'react';
import FormattedTimeDisplay from "../../generic/FormattedTimeDisplay.tsx";

interface CountdownProps {
    milliseconds: number;
    isRunning: boolean;
    initialTime: number; // The initial countdown time in milliseconds
}

const Countdown: React.FC<CountdownProps> = ({
                                                 milliseconds,
                                                 isRunning,
                                                 initialTime,
                                             }) => {
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
            setRemainingTime(initialTime);
            setIsCountdownStopped(false);
        }
    }, [isRunning, milliseconds, initialTime]);


    return (
        <div>
            <h1>Countdown: </h1>
            <FormattedTimeDisplay milliseconds={remainingTime} />
        </div>
    );
};

export default Countdown;
