import type React from 'react';
import { useState } from 'react';

import Icon from "../../Icons/Icon.tsx";
import styles from './NavMenu.module.scss';

export interface MenuProps {
    children?: React.ReactNode;
}

const NavigationMenu: React.FC<MenuProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={styles.navigationContainer}>
                <button className={styles.menuButton} onClick={toggleMenu}>
                    <Icon iconName="menu" classes={styles.iconContainer}/>
                </button>
                <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
                    {children}
                </div>
            </div>
            <div className={`${styles.menuBG} ${isOpen ? styles.open : ''}`}/>
        </>
    );
};

export default NavigationMenu;
