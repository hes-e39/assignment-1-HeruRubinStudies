import type React from 'react';
import { useEffect, useState } from 'react';
import styles from '../timer-common.module.scss';

interface XYTimerProps {
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
            <div className={styles.actionArea}>
                <h1>XY Time Remaining: {formatTime(remainingTime)}</h1>
                <h2>Rounds Left: {roundsLeft}</h2>
            </div>
        );
};

export default XY;
