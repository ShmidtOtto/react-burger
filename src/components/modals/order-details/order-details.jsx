import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './order-details.module.css';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import frame from './frame.svg';
import frame2 from './frame2.svg';
import frame3 from './frame3.svg';

function OrderDetails({ className }) {
    return (
        <div className={cn(style.order_details_container, className)}>
            <h2 className={cn('text', 'text_type_digits-large', 'mt-20')}>034536</h2>
            <p className={cn('text', 'text_type_main-medium', 'mt-8')}>идентификатор заказа</p>
            <div className={cn(style.ok_container, 'mt-15')}>
                <img src={frame} alt="" className={style.frame} />
                <img src={frame2} alt="" className={style.frame} />
                <img src={frame3} alt="" className={style.frame} />
                <div className={style.frame}>
                    <CheckMarkIcon type="primary" />
                </div>
            </div>
            <p className={cn('text', 'text_type_main-medium', 'mt-15')}>Вашь заказ начали готовить</p>
            <p className={cn('text', 'text_type_main-medium', 'text_color_inactive', 'mt-2', 'mb-30')}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    className: PropTypes.string
}
export default OrderDetails;