import type React from 'react';

interface StopwatchProps {
    milliseconds: number;
}

const Stopwatch: React.FC<StopwatchProps> = ({ milliseconds }) => {
    // Function to format the time in a "count-up" style
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

    return <div>Stopwatch: {formatTime(milliseconds)}</div>;
};

export default Stopwatch;
