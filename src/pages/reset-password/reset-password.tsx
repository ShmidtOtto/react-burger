import { useState, useEffect, SyntheticEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import style from './reset-password.module.css'
import { Link } from 'react-router-dom'

import cn from 'classnames'

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Spinner from '@components/modals/spinner/spinner';
import { ToastContainer, toast } from 'react-toastify';
import { userApi } from '@api/index';

export default function ResetPassword(): React.JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    const [resetFormData, setResetFormData] = useState({
        password: '',
        token: ''
    });

    const [isSubmitin, setIsSubmitting] = useState(false);

    useEffect(() => {
        const where = location.state && location.state.where;
        if (!where || where !== '/forgot-password') {
            navigate('/forgot-password');
        }
    }, [location, navigate])

    const setValue = (e: SyntheticEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setResetFormData({ ...resetFormData, [target.name]: target.value });
    };

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        setIsSubmitting(true)
        e.preventDefault();
        try {
            let { success } = await userApi.resetPassword(resetFormData.password, resetFormData.token);
            if (success) navigate('/login');
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
        <div className={cn(style.reset_password_container_content, 'mt-30')}>
            {isSubmitin ? <Spinner /> :
                <>
                    <h2 className='text text_type_main-large'>Восстановление пароля</h2>
                    <form onSubmit={onSubmit} className={cn(style.reset_password_form_content)}>
                        <Input
                            type={'password'}
                            placeholder={'Введите новый пароль'}
                            name={'password'}
                            value={resetFormData.password}
                            onChange={setValue}
                            size={'default'}
                            extraClass="mt-6"
                            icon={'ShowIcon'}
                        />
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            name={'token'}
                            value={resetFormData.token}
                            onChange={setValue}
                            size={'default'}
                            extraClass="mt-6"
                        />
                        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
                            Сохранить
                        </Button>
                    </form>
                    <div className={cn("mt-20", style.reset_password_footer_info)}>
                        <p className='text text_type_main-default text_color_inactive mr-2'>Вспомнили пароль?</p>
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