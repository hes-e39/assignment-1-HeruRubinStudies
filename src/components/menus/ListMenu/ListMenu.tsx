import type React from 'react';
import styles from './ListMenu.module.scss';
import type {iconGraphic} from "../../Icons/Icon.tsx";
import Icon from "../../Icons/Icon.tsx";
import {Link} from "react-router-dom";


interface MenuItem {
    label: string;
    link: string;
    iconName?: iconGraphic; // Optional icon name
}

interface GenericListMenuProps {
    menuItems: MenuItem[];
}

const GenericListMenu: React.FC<GenericListMenuProps> = ({ menuItems }) => {
    return (
        <ul className={styles.listContainer}>
            {menuItems.map((item, index) => (
                <li key={index} className={styles.listItem}>
                    <Link to={item.link} className={styles.link}>
                        {item.iconName && (
                            <Icon iconName={item.iconName} classes={styles.iconContainer} />
                        )}
                        {item.label}
                    </Link>

                </li>
            ))}
        </ul>
    );
};

export default GenericListMenu;
