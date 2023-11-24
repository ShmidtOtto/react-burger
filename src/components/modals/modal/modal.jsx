import { createPortal } from 'react-dom';
import cn from 'classnames';
import style from "./modal.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
const modalContainer = document.querySelector('#modals');
function Modal({ modatlTitle, isOpen, close, children, className }) {
    if (!isOpen) return null;
    return createPortal(
        <ModalOverlay>
            <div className={cn(style.modal_layer, className)}>
                <div className={style.modal_container}>
                    <div className={cn(style.modal_header, 'pl-10', 'pt-10', 'pr-10')}>
                        <h2 className='text text_type_main-large'>{modatlTitle}</h2>
                        <CloseIcon type="primary" onClick={close}/>
                    </div>
                    <div className={`${style.modal_content} pl-10 pr-10`}>
                        {children}
                    </div>
                </div>
            </div>
        </ModalOverlay>
        , modalContainer
    )
}

export default Modal;