import type React from "react";
import styles from "./Modal.module.scss";
import TButton from "../Button/TButton.tsx";

export interface ModalProps{
    children : React.ReactNode;
    hasCloseBtn?: boolean;
    closeFunc?: () => void;
}

const Modal : React.FC<ModalProps> = ({children, hasCloseBtn, closeFunc}) => {
    return(
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {
                    hasCloseBtn &&
                    <div className={styles.titleBar}>
                        <TButton actionFunc={closeFunc} btnType="round-small" icon="close-x" hoverAni="grow" />
                    </div>
                }
                {children}
            </div>
        </div>
    )
}

export default Modal;