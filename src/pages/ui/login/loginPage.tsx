import { type FC, useEffect } from "react"
import { useNavigate } from "react-router";
import { Form, Alert, Button, Input } from "antd"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from "../../../app/providers";
import type { AuthData } from "../../../entities";
import { APP_ROUTE } from "../../../app";


const LoginPage: FC = () => {
    const { clear, currentUser, login, errors } = useAuth()
    const navigate = useNavigate()

      useEffect(() => {
        clear()
      }, [])

    useEffect(() => {
        if (currentUser)
            navigate(APP_ROUTE.root)
    }, [currentUser])

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            onFinish={(values) => login(values)}
            initialValues={{email: 'user@mail.com'}}
        >
            <Form.Item<AuthData>
                label='Адрес эл. почты'
                name='email'
                rules={[{ required: true, message: 'Введите адрес эл. почты' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="e-mail" />
            </Form.Item>

            <Form.Item<AuthData>
                label='Пароль'
                name='password'
                rules={[
                    { required: true, message: 'Введите пароль' },
                    { min: 6, message: 'Минимальная длина пароля должна быть 6 символов' }
                ]}
            >
                <Input.Password prefix={<LockOutlined />} type="password" placeholder="password" />
            </Form.Item>

            {(errors.length > 0) &&
                <Alert message={errors} type="error" style={{marginBottom: 20}} />
            }
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Вход
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginPage