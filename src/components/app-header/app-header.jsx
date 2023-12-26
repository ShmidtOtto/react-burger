import { NavLink } from 'react-router-dom'; 
import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './app-header.module.css';

import AppHeaderTab from './app-header-tab/app-header-tab';
import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader({ className = '' }) {
    return (
        <header className={cn(style.header, className)}>
            <nav className={cn(style.header_container)}>
                <div className={style.header_container_navigation}>
                    <NavLink to="/" end>
                        {({ isActive }) => {
                            let icon = isActive ? <BurgerIcon type="primary" /> : <BurgerIcon type="secondary" />;
                            return <AppHeaderTab icon={icon} text="Конструктор" className='mr-2' />
                        }}
                    </NavLink>
                    <NavLink to="/profile/orders" end>
                        {({ isActive }) => {
                            let icon = isActive ? <ListIcon type="primary" /> : <ListIcon type="secondary" />
                            return <AppHeaderTab icon={icon} text="Лента заказов" />
                        }}
                    </NavLink>
                </div>
                <NavLink to="/" end>
                    <Logo />
                </NavLink>
                <NavLink to="/profile" end>
                    {({ isActive }) => {
                        let icon = isActive ? <ProfileIcon type="primary" /> : <ProfileIcon type="secondary" />
                        return <AppHeaderTab icon={icon} text="Личный кабинет" />
                    }}
                </NavLink>
            </nav>
        </header>
    );
}

AppHeader.propTypes = {
    className: PropTypes.string
}

export default AppHeader;