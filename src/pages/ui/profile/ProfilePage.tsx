import { useEffect, type FC } from "react"
import { useSelector } from "react-redux";
import { Form, Alert, Button, Input } from "antd"

import { type Profile } from "../../../entities";
import { useAuth } from "../../../app/providers";
import { profileSelectors } from "../../../app/store";

const ProfilePage: FC = () => {
  const { clear, saveProfile, errors } = useAuth()
  const profile = useSelector(profileSelectors.get)

  useEffect(() => {
    clear()
  }, [])

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      onFinish={(values) => saveProfile(values)}
      initialValues={profile ?? {}}
    >
      <Form.Item<Profile>
        label='Идентификатор пользователя'
        name='id'
      >
        <Input disabled />
      </Form.Item>

      <Form.Item<Profile>
        label='Имя пользователя'
        name='name'
      >
        <Input />
      </Form.Item>

      <Form.Item<Profile>
        label='Адрес эл. почты'
        name='email'
      >
        <Input disabled />
      </Form.Item>

      <Form.Item<Profile>
        label='Дата регистрации'
        name='signUpDate'
      >
        <Input disabled />
      </Form.Item>

      <Form.Item<Profile>
        label='Идентификатор команды'
        name='commandId'
      >
        <Input disabled />
      </Form.Item>

      {(errors.length > 0) &&
        <Alert message={errors} type="error" style={{ marginBottom: 20 }} />
      }
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ProfilePage