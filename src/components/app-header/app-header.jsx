import React from 'react';
import style from './app-header.module.css';
import PropTypes from 'prop-types';
import AppHeaderTab from './app-header-tab/app-header-tab';
import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function AppHeader({ className }) {
    className = className ? className : '';
    return (
        <header className={`${style.header_container} ${className}`}>
            <div className={style.header_container_navigation}>
                <AppHeaderTab icon={<BurgerIcon type="primary" />} text="Конструктор" className='mr-2'/>
                <AppHeaderTab icon={<ListIcon type="secondary" />} text="Лента заказов"/>
            </div>
            <Logo />
            <AppHeaderTab icon={<ProfileIcon type="secondary" />} text="Личный кабинет" />
        </header>
    );
}

AppHeader.propTypes = {
    className: PropTypes.string
}

export default AppHeader;