import type React from "react";
import commonIconStyles from "./commonIcons.module.scss";
import StopwatchIcon from "./IconGraphics/StopwatchIcon/StopwatchIcon.tsx";
import XYicon from "./IconGraphics/XYicon/XYicon.tsx";
import TabataIcon from "./IconGraphics/TabataIcon/TabataIcon.tsx";
import CountdownIcon from "./IconGraphics/CountdownIcon/CountdownIcon.tsx";
import CheckmarkIcon from "./IconGraphics/Checkmark/CheckmarkIcon.tsx";
import type {StylingBase} from "../DataInterfaces/CommonInterfaces.tsx";
import DocumentationIcon from "./IconGraphics/DocumentationIcon/DocumentationIcon.tsx";
import TimersIcon from "./IconGraphics/TimersIcon/TimersIcon.tsx";

export type iconGraphic = "countdown" | "stopwatch" | "xy" | "tabata" | "menu" | "timers" | "checkmark" | "documentation";

export interface IconProps extends StylingBase {
    iconName : iconGraphic;
}

const Icon : React.FC<IconProps> =({iconName, classes})=>{
    const getIcon =()=>{
        switch (iconName){
            case "stopwatch":
                return <StopwatchIcon/>;
            case "xy":
                return <XYicon/>;
            case "tabata":
                return <TabataIcon />;
            case "countdown":
                return <CountdownIcon/>;
            case "checkmark":
                return <CheckmarkIcon/>;
            case "documentation":
                return <DocumentationIcon/>;
            case "timers":
                return <TimersIcon />
        }
    }

    return(
        <div className={`${commonIconStyles.icon} ${classes ?? ''}` }>
            {getIcon()}
        </div>
    )
}

export default Icon