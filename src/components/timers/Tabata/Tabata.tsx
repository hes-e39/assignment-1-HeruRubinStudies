import type React from 'react';
import { useEffect, useState } from 'react';
import FormattedTimeDisplay from "../../generic/FormattedTimeDisplay";
import Icon from "../../Icons/Icon";
import styles from "./Tabata.module.scss";
import commonIconStyles from "../../Icons/commonIcons.module.scss";
import TimerControls from "../../menus/TimerControls/TimerControls.tsx";
import type {TimerFuncProps} from "../../menus/TimerControls/TimerControls.tsx";

interface TabataProps extends TimerFuncProps{
    milliseconds: number;
    isRunning: boolean;
}

const Tabata: React.FC<TabataProps> = ({ milliseconds, isRunning, reset, pause, start }) => {
    const totalRounds = 5;
    const workDuration = 1 * 60 * 1000;
    const breakDuration = 0.5 * 60 * 1000;

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
                        setCompletedRounds((prev) => [...prev, totalRounds - roundsLeft]);
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
                        Time Remaining: <FormattedTimeDisplay milliseconds={remainingTime} />
                    </h2>
                    <TimerControls reset={reset} isRunning={isRunning} pause={pause} start={start}>
                        <div>
                            <h2>Current Phase: {phase}</h2>
                            <h2>Rounds Left: {roundsLeft}</h2>
                            <div className={styles.roundsDisplay}>
                                {Array.from({length: totalRounds}).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.roundSquare} ${
                                            completedRounds.includes(index) ? styles.completedRound : ''
                                        }`}
                                    >
                                        {completedRounds.includes(index) ? (
                                            <Icon iconName="checkmark"
                                                  classes={`${styles.iconContainer} ${commonIconStyles.selectedIcon} ${commonIconStyles.strokedHeavy}`}/>
                                        ) : (
                                            <div
                                                className={styles.roundIndicator}
                                                style={{
                                                    height:
                                                        index === totalRounds - roundsLeft
                                                            ? `${(remainingTime / workDuration) * 100}%`
                                                            : '100%',
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TimerControls>

                </>
            ) : (
                <div className={styles.completeMessage}>
                    <p>
                        Complete! {totalRounds} rounds, {workDuration / 60000} minutes each, total time:{' '}
                        {(totalRounds * workDuration) / 60000} minutes
                    </p>
                    <button className={styles.repeatButton} onClick={resetTabata}>
                        Repeat Tabata
                    </button>
                </div>
            )}
        </div>
    );
};

export default Tabata;
