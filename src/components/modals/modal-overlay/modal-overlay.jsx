import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './modal-overlay.module.css';

function ModalOverlay({ onClose }) {
    return (
        <div className={cn(style.modal_overlay_container)} onClick={onClose}></div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;