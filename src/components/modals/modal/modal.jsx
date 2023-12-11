import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import cn from 'classnames';
import style from "./modal.module.css";

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
const modalContainer = document.querySelector('#modals');

function Modal({ modalTitle, isOpen, close, children, className }) {
    useEffect(() => {
        if (isOpen) {
            const listen = (e) => e.key === 'Escape' && close();
            document.addEventListener('keydown', listen);
            return () => document.removeEventListener('keydown', listen);
        }
    }, [isOpen, close]);

    if (!isOpen) return null;

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

Modal.propTypes = {
    modalTitle: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

export default Modal;