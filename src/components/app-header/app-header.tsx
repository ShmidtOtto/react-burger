import { FC } from 'react'; 
import { NavLink } from 'react-router-dom'; 

import cn from 'classnames';
import style from './app-header.module.css';

import AppHeaderTab from './app-header-tab/app-header-tab';
import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IAppHeader {
    className?: string;
}

const AppHeader: FC<IAppHeader> = ({ className = '' }) => {
    return (
        <header className={cn(style.header, className)}>
            <nav className={cn(style.header_container)}>
                <div className={style.header_container_navigation}>
                    <NavLink to="/" end>
                        {({ isActive }) => <AppHeaderTab Icon={BurgerIcon} text="Конструктор" className='mr-2' active={isActive} />}
                    </NavLink>
                    <NavLink to="/profile/orders" end>
                        {({ isActive }) => <AppHeaderTab Icon={ListIcon} text="Лента заказов" active={isActive} />}
                    </NavLink>
                </div>
                <NavLink to="/" end>
                    <Logo />
                </NavLink>
                <NavLink to="/profile" end>
                    {({ isActive }) => <AppHeaderTab Icon={ProfileIcon} text="Личный кабинет" active={isActive}/>}
                </NavLink>
            </nav>
        </header>
    );
}

export default AppHeader;