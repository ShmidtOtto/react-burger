import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import cn from 'classnames';
import style from "./modal.module.css";

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
const modalContainer: HTMLDivElement | null = document.querySelector('#modals');

interface ModalProps {
    modalTitle?: string;
    close: () => void;
    children: React.JSX.Element;
    className?: string;
}

function Modal({ modalTitle, close, children, className }: ModalProps): React.JSX.Element {
    useEffect(() => {
        const listen = (e: KeyboardEvent) => e.key === 'Escape' && close();
        document.addEventListener('keydown', listen);
        return () => document.removeEventListener('keydown', listen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!modalContainer) return <></>;

    return createPortal(
        <>
            <ModalOverlay onClose={close}/>
            <div className={cn(style.modal_container, className)}>
                <div className={style.modal_wrapper}>
                    <div className={cn(style.modal_header, 'pl-10', 'pt-10', 'pr-10')}>
                        <h2 className='text text_type_main-large'>{modalTitle}</h2>
                        <div className={style.modal_icon_close}>
                            <CloseIcon type="primary" onClick={close}/>
                        </div>
                    </div>
                    <div className={`${style.modal_content} pl-10 pr-10`}>
                        {children}
                    </div>
                </div>
            </div>
        </>
        , modalContainer
    )
}

export default Modal;