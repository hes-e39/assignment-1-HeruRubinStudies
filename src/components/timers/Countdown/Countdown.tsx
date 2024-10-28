import type React from 'react';
import { useEffect, useState } from 'react';

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

    // Function to format the time
    const formatTime = (milliseconds: number): string => {
        const totalHundredths = Math.floor(milliseconds / 10);
        const hundredths = totalHundredths % 100;
        const seconds = Math.floor(totalHundredths / 100) % 60;
        const minutes = Math.floor(totalHundredths / 6000) % 60;
        const hours = Math.floor(totalHundredths / 360000);

        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
                2,
                '0'
            )}:${String(seconds).padStart(2, '0')}:${String(hundredths).padStart(2, '0')}`;
        } else {
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
                2,
                '0'
            )}:${String(hundredths).padStart(2, '0')}`;
        }
    };

    return (
        <div>
            <h1>Countdown: {formatTime(remainingTime)}</h1>
        </div>
    );
};

export default Countdown;
