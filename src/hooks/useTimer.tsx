import { useState, useRef, useCallback } from 'react';

const useTimer = () => {
    const [milliseconds, setMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<number | null>(null);

    // Start or resume the timer
    const start = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
            timerRef.current = window.setInterval(() => {
                setMilliseconds((prevMilliseconds) => prevMilliseconds + 10);
            }, 10);
        }
    }, [isRunning]);

    // Pause the timer
    const pause = useCallback(() => {
        if (isRunning && timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setIsRunning(false);
        }
    }, [isRunning]);

    // Reset the timer to zero
    const reset = useCallback(() => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setIsRunning(false);
        setMilliseconds(0);
    }, []);

    return {
        milliseconds,
        isRunning,
        start,
        pause,
        reset,
    };
};

export default useTimer;
