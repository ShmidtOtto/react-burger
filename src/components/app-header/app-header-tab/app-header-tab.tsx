import cn from 'classnames';
import style from './app-header-tab.module.css';
import { FC } from 'react';

interface IAppHeaderTab {
    Icon: any;
    text: string;
    active: boolean;
    className?: string;
}

const AppHeaderTab: FC<IAppHeaderTab> = ({ Icon = null, text = '', active = false, className = '' }): JSX.Element => {
    return (
        <div className={cn(style.header_tab_container, 'pt-5', 'pb-5', 'pl-4', 'pr-4', 'm-b4', 'mt-4', className)}>
            {< Icon type={active ? "primary" : "secondary"} />}
            <p className={cn('text', 'ml-2', 'text_type_main-default', active ? '' : 'text_color_inactive')}>{text}</p>
        </div>
    );
}

export default AppHeaderTab;