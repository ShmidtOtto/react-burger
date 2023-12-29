import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './app-header-tab.module.css';

function AppHeaderTab({ Icon = null, text = '', active = false, className = '' }) {
    return (
        <div className={cn(style.header_tab_container, 'pt-5', 'pb-5', 'pl-4', 'pr-4', 'm-b4', 'mt-4', className)}>
            {< Icon type={active ? "primary" : "secondary"} />}
            <p className={cn('text', 'ml-2', 'text_type_main-default', active ? '' : 'text_color_inactive')}>{text}</p>
        </div>
    );
}

AppHeaderTab.propTypes = {
    Icon: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    className: PropTypes.string
}

export default AppHeaderTab;