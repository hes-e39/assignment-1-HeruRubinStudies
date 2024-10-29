

import type React from 'react';
import { useState } from 'react';
import styles from './TabMenu.module.scss';

interface MenuItem {
    label: string;
    iconName: string; // This will be passed to an Icon component later
    onClick: () => void; // Function to control content visibility or other logic externally
}

interface TabMenuProps {
    items: MenuItem[];
    classes? : string;
}

const TabMenu: React.FC<TabMenuProps> = ({ items, classes }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleItemClick = (index: number, onClick: () => void) => {
        setSelectedIndex(index); // Update internal selected index state
        onClick(); // Execute the item's external onClick function
    };

    return (
        <div className={`${styles.tabMenuContainer} ${classes}`}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`${styles.tabItem} ${
                        selectedIndex === index ? styles.active : ''
                    }`}
                    onClick={() => handleItemClick(index, item.onClick)}
                >
                    {/* You can replace this with an Icon component later */}
                    <span className={styles.iconPlaceholder}>{item.iconName}</span>
                    <span className={styles.tabLabel}>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default TabMenu;
