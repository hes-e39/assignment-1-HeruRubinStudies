import type React from 'react';
import commonStyles from '../../../common-styles/common-styles.module.scss';
import FormattedTimeDisplay from '../../generic/FormattedTimeDisplay.tsx';
import TimerControls from '../../menus/TimerControls/TimerControls.tsx';
import type { TimerFuncProps } from '../../menus/TimerControls/TimerControls.tsx';

interface StopwatchProps extends TimerFuncProps {
    milliseconds: number;
}

const Stopwatch: React.FC<StopwatchProps> = ({ milliseconds, isRunning, start, pause, reset }) => {
    return (
        <div>
            <div className={commonStyles.flexVert}>
                <FormattedTimeDisplay milliseconds={milliseconds} />
                <TimerControls reset={reset} isRunning={isRunning} pause={pause} start={start} />
            </div>
        </div>
    );
};

export default Stopwatch;
