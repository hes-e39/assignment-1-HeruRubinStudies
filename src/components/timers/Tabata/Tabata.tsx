import type React from 'react';
import { useEffect, useState } from 'react';
import FormattedTimeDisplay from '../../generic/FormattedTimeDisplay';
import TimerControls from '../../menus/TimerControls/TimerControls';
import type { TimerFuncProps } from '../../menus/TimerControls/TimerControls';
import Rounds from '../../visualization/Rounds/Rounds';
import styles from './Tabata.module.scss';
import commonTimerStyles from '../timer-common.module.scss';
import CompletionMessage from '../../visualization/CompletionMessage/CompletionMessage.tsx';

interface TabataProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
}

const Tabata: React.FC<TabataProps> = ({ milliseconds, isRunning, reset, pause, start }) => {
    const totalRounds = 5;
    const workDuration = 10 * 1000;
    const breakDuration = 0.5 * 10 * 1000;

    const [roundsLeft, setRoundsLeft] = useState(totalRounds);
    const [phase, setPhase] = useState<'Work' | 'Break'>('Work');
    const [phaseStartTime, setPhaseStartTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(workDuration);
    const [isPomodoroStopped, setIsPomodoroStopped] = useState(false);
    const [completedRounds, setCompletedRounds] = useState<number[]>([]);

    useEffect(() => {
        if (milliseconds === 0 && !isRunning) {
            resetTabata();
        }
    }, [milliseconds, isRunning]);

    const resetTabata = () => {
        setRoundsLeft(totalRounds);
        setPhase('Work');
        setPhaseStartTime(0);
        setRemainingTime(workDuration);
        setIsPomodoroStopped(false);
        setCompletedRounds([]);
    };

    useEffect(() => {
        if (!isPomodoroStopped && isRunning && roundsLeft > 0) {
            const elapsedTime = milliseconds - phaseStartTime;
            const currentPhaseDuration = phase === 'Work' ? workDuration : breakDuration;
            const timeLeft = currentPhaseDuration - elapsedTime;

            if (timeLeft <= 0) {
                if (phase === 'Work') {
                    setPhase('Break');
                    setPhaseStartTime(milliseconds);
                    setRemainingTime(breakDuration);
                } else {
                    if (roundsLeft - 1 > 0) {
                        setRoundsLeft(roundsLeft - 1);
                        setCompletedRounds(prev => [...prev, totalRounds - roundsLeft]);
                        setPhase('Work');
                        setPhaseStartTime(milliseconds);
                        setRemainingTime(workDuration);
                    } else {
                        setRoundsLeft(0);
                        setRemainingTime(0);
                        setIsPomodoroStopped(true);
                    }
                }
            } else {
                setRemainingTime(timeLeft);
            }
        }
    }, [milliseconds, isRunning, isPomodoroStopped, roundsLeft, phase, phaseStartTime]);

    return (
        <div className={styles.tabataContainer}>
            {roundsLeft > 0 ? (
                <>
                    <h2>
                        <FormattedTimeDisplay milliseconds={remainingTime} />
                    </h2>
                    <TimerControls reset={reset} isRunning={isRunning} pause={pause} start={start}>
                        <div className={commonTimerStyles.readout}>
                            <h2>Current Phase: {phase}</h2>
                            <h2>Rounds Left: {roundsLeft}</h2>
                            <Rounds
                                completedRounds={completedRounds}
                                roundsLeft={roundsLeft}
                                totalRounds={totalRounds}
                                workDuration={workDuration}
                                remainingTime={remainingTime}
                                breakDuration={breakDuration}
                            />
                        </div>
                    </TimerControls>
                </>
            ) : (
                <CompletionMessage totalRounds={totalRounds} roundDuration={workDuration} onRepeat={resetTabata} />
            )}
        </div>
    );
};

export default Tabata;
