import { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './login.module.css';
import { Link } from 'react-router-dom';

import cn from 'classnames';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components' ;
import Spinner from '../../components/modals/spinner/spinner';
import { ToastContainer, toast } from 'react-toastify';

import { login } from '../../services/reducers/userReducer';

export default function Login() {
    const dispatch = useDispatch();
    const [ loginFormData, setLoginFormData ] = useState({
        email: '',
        password: '',
    });

    const [ loginFormFileds, setLoginFormFileds ] = useState({
        email: {
            error: false,
            errorText: 'Введите корекные данные E-mail',
            validate: (e) => {
                let fieldName = e.target.name;
                setLoginFormFileds({ ...loginFormFileds, [fieldName]: { ...loginFormFileds[fieldName], error: !e.target.value.includes('@') } });
            }
        },
        password: {
            error: false,
            errorText: 'Пароль должен быть не менее 5 символов',
            validate: (e) => {
                let fieldName = e.target.name;
                setLoginFormFileds({ ...loginFormFileds, [fieldName]: { ...loginFormFileds[fieldName], error: e.target.value.length < 5 } });
            }

        },
    });
    const [ isSubmitin, setIsSubmitting ] = useState(false);

    const setValue = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
        loginFormFileds[e.target.name].validate(e);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (loginFormFileds.email.error || loginFormFileds.password.error) {
            return;
        }
        setIsSubmitting(true);
        try {
            await dispatch(login(loginFormData)).unwrap();
        } catch (err) {
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
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={cn(style.login_container_content, 'mt-30')}>
            { isSubmitin ? <Spinner/> : 
            <>
                <h2 className='text text_type_main-large'>Вход</h2>
                <form onSubmit={onSubmit} className={cn(style.login_form_content)}>
                    <Input
                        type={'email'}
                        name={'email'}
                        onChange={setValue}
                        placeholder={'E-mail'}
                        size={'default'}
                        extraClass="mt-6"
                        errorText={loginFormFileds.email.errorText}
                        error={loginFormFileds.email.error}
                        />
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        name={'password'}
                        onChange={setValue}
                        size={'default'}
                        extraClass="mt-6"
                        icon={'ShowIcon'}
                        errorText={loginFormFileds.password.errorText}
                        error={loginFormFileds.password.error}
                        />
                    <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
                        Войти
                    </Button>
                </form>
                <div className={cn("mt-20", style.login_footer_info)}>
                    <p className='text text_type_main-default text_color_inactive mr-2'>Вы - новый пользователь?</p>
                    <Link to="/register" className='text text_type_main-default'>Зарегистрироваться</Link>
                </div>
                <div className={cn("mt-4", style.login_footer_info)}>
                    <p className='text text_type_main-default text_color_inactive mr-2'>Забыли пароль?</p>
                    <Link to="/forgot-password" className='text text_type_main-default'>Восстановить пароль</Link>
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