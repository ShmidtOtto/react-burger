import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './modal-overlay.module.css';

function ModalOverlay({ onClose, children }) {
    return (
        <div className={cn(style.modal_overlay_container)} onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default ModalOverlay;