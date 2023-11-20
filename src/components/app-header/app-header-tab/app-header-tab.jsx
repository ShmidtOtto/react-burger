import React from "react";
import style from "./app-header-tab.module.css";

function AppHeaderTab({ icon, text, className }) {
    let extraClass = className ? className : '';
    return (
        <nav className={`${style.header_tab_container} pt-5 pb-5 pl-4 pr-4 ${extraClass}`}>
            {icon}
            <p className='text text_type_main-default ml-2'>{text}</p>
        </nav>
    );
}

export default AppHeaderTab;