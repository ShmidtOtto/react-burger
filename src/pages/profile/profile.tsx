import { SyntheticEvent, useEffect, useState } from 'react';
import style from './profile.module.css';
import cn from 'classnames';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { userApi } from '@api/index';

interface IProfileData {
    [key: string]: string;
}

export default function Profile(): React.JSX.Element {
    const [profileData, setProfileData] = useState<IProfileData | null>(null);
    const [initialProfileData, setInitialProfileData] = useState<IProfileData | null>(null);
    const [isProfileDataSchange, setIsProfileDataSchange] = useState(false);

    useEffect(() => {
        const getUserData = async () => {
            let user = await userApi.getUser();
            setProfileData(user);
            setInitialProfileData(user);
        }

        getUserData();
    }, []);

    useEffect(() => {
        if (profileData && initialProfileData) {
            setIsProfileDataSchange(
                profileData.name !== initialProfileData.name ||
                profileData.email !== initialProfileData.email ||
                profileData.password !== initialProfileData.password);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileData])

    const setValue = (e: SyntheticEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setProfileData({ ...profileData, [target.name]: target.value });
    };

    const onReset = (e: SyntheticEvent) => {
        e.preventDefault();
        setProfileData(initialProfileData);
        setIsProfileDataSchange(false);
    }

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (profileData && 'name' in profileData && 'email' in profileData && 'password' in profileData) {
            let { user } = await userApi.updateUser(profileData as {name: string, email: string, password: string});
            if (user) {
                setProfileData(user);
                setInitialProfileData(user);
                setIsProfileDataSchange(false);
            }
        }
    }
    return (
        <div className={cn(style.profile_container, 'ml-15')}>
            <form onSubmit={onSubmit} className={cn(style.profile_form_content)}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    name='name'
                    size={'default'}
                    value={profileData ? profileData.name : ''}
                    onChange={setValue}
                />
                <Input
                    type={'email'}
                    placeholder={'Логин'}
                    name='email'
                    size={'default'}
                    extraClass='mt-6'
                    value={profileData ? profileData.email : ''}
                    onChange={setValue}
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    name='password'
                    size={'default'}
                    extraClass='mt-6'
                    value={profileData ? profileData.password : ''}
                    onChange={setValue}
                />
                {isProfileDataSchange && (
                    <div className={cn(style.profile_form_footer, 'mt-6')}>
                        <Button htmlType="button" type="secondary" size="large" onClick={onReset}>
                            Отменить
                        </Button>
                        <Button htmlType="submit" type="primary" size="large">
                            Сохранить
                        </Button>
                    </div>
                )}
            </form>
        </div>
    )
}