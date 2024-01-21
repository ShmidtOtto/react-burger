import { TailSpin } from 'react-loader-spinner';
import ModalOverlay from '../modal-overlay/modal-overlay';

import style from './spinner.module.css';
import React from 'react';

export default function Spinner(): React.JSX.Element {
    return (
        <>
            <ModalOverlay className={style.spinner_overlay} />
            <TailSpin
                height="150"
                width="150"
                color="#ffffff"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
            />
        </>
    );
}