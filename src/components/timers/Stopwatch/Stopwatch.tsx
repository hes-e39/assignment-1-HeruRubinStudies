import type React from 'react';
import commonStyles from "../../../common-styles/common-styles.module.scss"
import FormattedTimeDisplay from "../../generic/FormattedTimeDisplay.tsx";

interface StopwatchProps {
    milliseconds: number;
}

const Stopwatch: React.FC<StopwatchProps> = ({ milliseconds }) => {


    return (
        <div>
            <div className={commonStyles.flexVert}>
                <ul >
                    <h2>
                        Stopwatch:
                    </h2>
                    <li>
                        <FormattedTimeDisplay milliseconds={milliseconds} />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Stopwatch;
