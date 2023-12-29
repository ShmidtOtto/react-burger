import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './modal-overlay.module.css';

function ModalOverlay({ onClose, className }) {
    return (
        <div className={cn(style.modal_overlay_container, className ? className : '')} onClick={onClose}></div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func
}

export default ModalOverlay;