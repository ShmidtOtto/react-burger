import { useAppDispatch } from '@reducers/hooks';
import { Outlet, NavLink } from 'react-router-dom';

import cn from 'classnames';

import { logout } from '@reducers/userReducer';

import style from './profile-layout.module.css';


export default function ProfileLayout(): React.JSX.Element {
    const dispatch = useAppDispatch();
    const onLogout = () => {
        dispatch(logout());
    }
    return (
        <div className={cn(style.profile_layout_container, 'mt-30')}>
            <div className={cn(style.profile_layout_navigation)}>
                <NavLink to="/profile" className={cn('pt-4, pb-4')} end>{({isActive}) =>
                    <p className={cn(isActive ? 'text text_type_main-large' : 'text text_type_main-large text_color_inactive')}>Профиль</p>
                }</NavLink>
                <NavLink to="/profile/orders" className={cn('pt-4, pb-4')} end>{({isActive}) =>
                    <p className={cn(isActive ? 'text text_type_main-large' : 'text text_type_main-large text_color_inactive')}>История заказов</p>
                }</NavLink>
                <NavLink to="/" onClick={onLogout} className={cn('pt-4, pb-4')}>
                    <p className={cn('text text_type_main-large text_color_inactive')}>Выйти</p>
                </NavLink>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}