import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './app-header-tab.module.css';

function AppHeaderTab({ icon = null, text = '', className = '' }) {
    return (
        <div className={cn(style.header_tab_container, 'pt-5', 'pb-5', 'pl-4', 'pr-4', 'm-b4', 'mt-4', className)}>
            {icon}
            <p className="text text_type_main-default ml-2">{text}</p>
        </div>
    );
}

AppHeaderTab.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default AppHeaderTab;