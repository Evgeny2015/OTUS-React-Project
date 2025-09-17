import { useEffect, type FC } from 'react'
import { useNavigate } from 'react-router'
import { Form, Alert, Button, Input } from "antd"
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { useAuth } from "../../../app/providers";
import { type RegisterModel } from "../../../entities";
import { APP_ROUTE } from "../../../app";

const RegisterPage: FC = () => {
    const { clear, register, errors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
    clear()
    }, [])

    const handleSubmit = (data: RegisterModel) => {
        register({
            email: data.email,
            password: data.password
        }, handleSuccess)
    }

    const handleSuccess = () => {
        // пользователь успешно зарегистрирован
        // переходим на страницу аутентификации
        navigate(APP_ROUTE.login)
    }

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            onFinish={(values) => handleSubmit(values)}
        >
            <Form.Item<RegisterModel>
                label="Адрес эл. почты"
                name='email'
                rules={[{ required: true, message: 'Введите адрес эл. почты' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="e-mail" />
            </Form.Item>

            <Form.Item<RegisterModel>
                label='Пароль'
                name='password'
                rules={[
                    { required: true, message: 'Введите пароль' },
                    { min: 6, message: 'Минимальная длина пароля должна быть 6 символов' }
                ]}
            >
                <Input.Password prefix={<LockOutlined />} type="password" placeholder="password" />
            </Form.Item>

            <Form.Item<RegisterModel>
                label='Пароль'
                name='confirm_password'
                rules={[
                    { required: true, message: 'Введите подтверждение пароля' },
                    { min: 6, message: 'Минимальная длина пароля должна быть 6 символов' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли должны совпадать'));
                        },
                    }),
                ]}
            >
                <Input.Password prefix={<LockOutlined />} type="password" placeholder="confirm" />
            </Form.Item>

            {(errors.length > 0) &&
                <Alert message={errors} type="error" style={{marginBottom: 20}} />
            }
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Регистрация
                </Button>
            </Form.Item>
        </Form>
    )
}

export default RegisterPage