import { useState, SyntheticEvent } from 'react';
import { useAppDispatch } from '@reducers/hooks';

import style from './register.module.css'
import { Link } from 'react-router-dom'

import cn from 'classnames';

import { register } from '@reducers/userReducer';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '@components/modals/spinner/spinner';

export default function Register(): React.JSX.Element {
    const dispatch = useAppDispatch();
    const [loginFormData, setLoginFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isSubmitin, setIsSubmitting] = useState(false);

    const setValue = (e: SyntheticEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setLoginFormData({ ...loginFormData, [target.name]: target.value });
    };

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await dispatch(register(loginFormData)).unwrap();
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={cn(style.register_container_content, 'mt-30')}>
            {isSubmitin ? <Spinner /> :
                <>
                    <h2 className='text text_type_main-large'>Регистрация</h2>
                    <form onSubmit={onSubmit} className={cn(style.register_form_content)}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            name='name'
                            value={loginFormData.name}
                            onChange={setValue}
                            size={'default'}
                            extraClass="mt-6"
                        />
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            name='email'
                            value={loginFormData.email}
                            onChange={setValue}
                            size={'default'}
                            extraClass="mt-6"
                        />
                        <Input
                            type={'password'}
                            placeholder={'Пароль'}
                            name='password'
                            value={loginFormData.password}
                            onChange={setValue}
                            size={'default'}
                            extraClass="mt-6"
                            icon={'ShowIcon'}
                        />
                        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
                            Зарегистрироваться
                        </Button>
                    </form>
                    <div className={cn("mt-20", style.register_footer_info)}>
                        <p className='text text_type_main-default text_color_inactive mr-2'>Уже зарегистрированы?</p>
                        <Link to="/login" className='text text_type_main-default'>Войти</Link>
                    </div>
                </>
            }
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}