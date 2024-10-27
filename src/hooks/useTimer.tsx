import { useState, useRef, useCallback } from 'react';

const useTimer = (initialTime: number ) => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<number | null>(null);

    // Start or resume the timer
    const start = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
            timerRef.current = window.setInterval(() => {
                setTime((prevTime) => prevTime + 1); // Increment by 1 (which is 1/100th of a second)
            }, 10);
        }
    }, [isRunning]);

    // Pause the timer
    const pause = useCallback(() => {
        if (isRunning) {
            setIsRunning(false);
            if (timerRef.current !== null) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    }, [isRunning]);

    // Reset the timer to the initial state
    const reset = useCallback(() => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setIsRunning(false);
        setTime(initialTime);
    }, [initialTime]);

    // Convert time to formatted string with logic
    const formatTime = useCallback(() => {
        const hundredths = time % 100;
        const seconds = Math.floor(time / 100) % 60;
        const minutes = Math.floor(time / (100 * 60)) % 60;
        const hours = Math.floor(time / (100 * 60 * 60));

        // initially we just show from minutes, if the timer goes over 60 min, then show hours
        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(hundredths).padStart(2, '0')}`;
        } else {
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(hundredths).padStart(2, '0')}`;
        }
    }, [time]);

    return {
        time: formatTime(),
        isRunning,
        start,
        pause,
        reset,
    };
};

export default useTimer;
