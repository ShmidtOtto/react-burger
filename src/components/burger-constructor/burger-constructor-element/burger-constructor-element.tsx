import { useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor-element.module.css';

import { removeIngredient, moveIngredients, addIngredient } from '@reducers/constructorIngredientsReducer';
import { IIngredient }  from '@interfaces/index';

interface IBurgerCounstructorElementProps {
    ingredient: IIngredient
}

function BurgerCounstructorElement ({ ingredient }: IBurgerCounstructorElementProps): React.JSX.Element {
    const ref = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    const [{ isDragging }, dragRef] = useDrag<IIngredient, unknown, { isDragging: boolean }>(() => ({
        type: 'ingredient',
        item: ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }));

    const [, dropRef] = useDrop<IIngredient, unknown, unknown>(() => ({
        accept: 'ingredient',
        drop(ingredient: IIngredient) {
            if (!ingredient.uuid) dispatch(addIngredient(ingredient));
        },
        hover(item, monitor) {
            if (!ref.current) return;
            const dragIndex = item.uuid;
            if (!dragIndex) return;
            const hoverIndex = ingredient.uuid;
            if (dragIndex === hoverIndex) return
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            if (clientOffset === null) return; 
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
            dispatch(moveIngredients({ dragIndex: dragIndex, hoverIndex: hoverIndex }));
        },
    }));

    dragRef(dropRef(ref));
    const opacity = isDragging ? 0 : 1;
    return (
        <div style={{ opacity: opacity }} className={style.burger_constructor_ingredient_container} ref={ref}>
            <div className="mr-2"><DragIcon type="primary" /></div>
            <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => dispatch(removeIngredient(ingredient.uuid))}
            />
        </div>
    )
}

export default BurgerCounstructorElement;