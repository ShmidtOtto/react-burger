import React from "react";
import style from "./app-header-tab.module.css";
import PropTypes from 'prop-types';

function AppHeaderTab({ icon, text, className }) {
    className = className ? className : '';
    return (
        <nav className={`${style.header_tab_container} pt-5 pb-5 pl-4 pr-4 ${className}`}>
            {icon}
            <p className='text text_type_main-default ml-2'>{text}</p>
        </nav>
    );
}
AppHeaderTab.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default AppHeaderTab;