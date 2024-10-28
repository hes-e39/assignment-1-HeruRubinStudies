import type React from 'react';
import { useEffect, useState } from 'react';

interface PomodoroTimerProps {
    milliseconds: number;
    isRunning: boolean;
}

const Tabata: React.FC<PomodoroTimerProps> = ({ milliseconds, isRunning }) => {
    // Constants for the Pomodoro timer
    const totalRounds = 12; // Total number of Pomodoro sessions
    const workDuration = 1 * 60 * 1000; // Work phase duration in milliseconds (25 minutes)
    const breakDuration = 0.5 * 60 * 1000; // Break phase duration in milliseconds (5 minutes)

    // State variables
    const [roundsLeft, setRoundsLeft] = useState(totalRounds);
    const [phase, setPhase] = useState<'Work' | 'Break'>('Work');
    const [phaseStartTime, setPhaseStartTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(workDuration);
    const [isPomodoroStopped, setIsPomodoroStopped] = useState(false);

    // Reset state when the timer is reset
    useEffect(() => {
        if (milliseconds === 0 && !isRunning) {
            setRoundsLeft(totalRounds);
            setPhase('Work');
            setPhaseStartTime(0);
            setRemainingTime(workDuration);
            setIsPomodoroStopped(false);
        }
    }, [milliseconds, isRunning]);

    // Update remaining time and handle phase transitions
    useEffect(() => {
        if (!isPomodoroStopped && isRunning && roundsLeft > 0) {
            const elapsedTime = milliseconds - phaseStartTime;
            const currentPhaseDuration = phase === 'Work' ? workDuration : breakDuration;
            const timeLeft = currentPhaseDuration - elapsedTime;

            if (timeLeft <= 0) {
                if (phase === 'Work') {
                    // Transition to Break Phase
                    setPhase('Break');
                    setPhaseStartTime(milliseconds);
                    setRemainingTime(breakDuration);
                } else {
                    // Completed Break Phase
                    if (roundsLeft - 1 > 0) {
                        // Start next Work Phase
                        setRoundsLeft(roundsLeft - 1);
                        setPhase('Work');
                        setPhaseStartTime(milliseconds);
                        setRemainingTime(workDuration);
                    } else {
                        // No rounds left; stop the Pomodoro timer
                        setRoundsLeft(0);
                        setRemainingTime(0);
                        setIsPomodoroStopped(true);
                    }
                }
            } else {
                // Update remaining time for the current phase
                setRemainingTime(timeLeft);
            }
        }
    }, [
        milliseconds,
        isRunning,
        isPomodoroStopped,
        roundsLeft,
        phase,
        phaseStartTime
    ]);

    // Function to format the time
    const formatTime = (milliseconds: number): string => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const hours = Math.floor(totalSeconds / 3600);

        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
                2,
                '0'
            )}:${String(seconds).padStart(2, '0')}`;
        } else {
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    };

    return (
        <div>
            <h1>Pomodoro Timer</h1>
            <h2>Current Phase: {phase}</h2>
            <h2>Time Remaining: {formatTime(remainingTime)}</h2>
            <h2>Rounds Left: {roundsLeft}</h2>
        </div>
    );
};

export default Tabata;
