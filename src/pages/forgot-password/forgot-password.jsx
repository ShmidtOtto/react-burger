import { useState } from 'react'
import style from './forgot-password.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import cn from 'classnames'

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Spinner from '../../components/modals/spinner/spinner';
import { ToastContainer, toast } from 'react-toastify';

import { userApi } from '../../utils/api';

export default function ForgotPassword() {
    const [forgotFormData, setForgotFormData] = useState({
        email: '',
    });
    const [isSubmitin, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const setValue = (e) => {
        setForgotFormData({ ...forgotFormData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        setIsSubmitting(true);
        e.preventDefault();
        try {
            await userApi.forgotPassword(forgotFormData.email);
            debugger;
            navigate('/reset-password', { state: { where: '/forgot-password' } });
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
        <div className={cn(style.forgot_password_container_content, 'mt-30')}>
            {isSubmitin ? <Spinner /> :
                <>
                    <h2 className='text text_type_main-large'>Восстановление пароля</h2>
                    <form onSubmit={onSubmit} className={cn(style.forgot_password_form_content)}>
                        <Input
                            type={'email'}
                            placeholder={'Укажите e-meil'}
                            name='email'
                            onChange={setValue}
                            value={forgotFormData.email}
                            size={'default'}
                            extraClass="mt-6"
                        />
                        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
                            Восстановить
                        </Button>
                    </form>
                    <div className={cn("mt-20", style.forgot_password_footer_info)}>
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
    );
}