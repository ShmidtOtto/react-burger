import { Outlet } from 'react-router-dom';
import cn from 'classnames';
import style from './main-layout.module.css';
import AppHeader from '../../components/app-header/app-header';

export default function MainLayout(): JSX.Element {
    return (
        <div className={cn(style.app_container, 'mr-10', 'ml-10')}>
            <AppHeader className='mt-10 mr-10 ml-10' />
            <main className={style.app_container_content}>
                <Outlet />
            </main>
        </div>
    )
}