import React from 'react';
import cn from 'classnames';
import style from './app-header-tab.module.css';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

interface IAppHeaderTabProps {
    Icon: ({type} : TIconProps) => React.JSX.Element;
    text: string;
    active: boolean; 
    className?: string;
}

function AppHeaderTab ({ Icon, text = '', active = false, className = '' }: IAppHeaderTabProps): React.JSX.Element {
    return (
        <div className={cn(style.header_tab_container, 'pt-5', 'pb-5', 'pl-4', 'pr-4', 'm-b4', 'mt-4', className)}>
            {< Icon type={active ? "primary" : "secondary"} />}
            <p className={cn('text', 'ml-2', 'text_type_main-default', active ? '' : 'text_color_inactive')}>{text}</p>
        </div>
    );
}

export default AppHeaderTab;