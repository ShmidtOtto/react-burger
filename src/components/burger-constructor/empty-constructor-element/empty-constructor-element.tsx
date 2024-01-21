import style from './empty-constructor-element.module.css';
import cn from 'classnames';

interface IEmptyConstructorElementProps {
    type?: string
}

export function EmptyConstructorElement ({ type }: IEmptyConstructorElementProps): React.JSX.Element {
    const className = cn('constructor-element', type ? `constructor-element_pos_${type}` : '', style.constructor_element_min_width);
    return (
        <div className={className}>
            <span className='constructor-element__row'></span>
        </div>
    );
};