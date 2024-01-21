import cn from 'classnames';
import style from './modal-overlay.module.css';

interface ModalOverlayProps {
    onClose?: () => void;
    className?: string;
}
function ModalOverlay({ onClose, className }: ModalOverlayProps): React.JSX.Element {
    return (
        <div className={cn(style.modal_overlay_container, className ? className : '')} onClick={onClose}></div>
    )
}

export default ModalOverlay;