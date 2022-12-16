import { Button, Form, Input, Space, Typography } from 'antd';
import { useSignIn } from './useSignIn';
import s from './SignIn.module.scss';

export function SignIn() {
    const { onFinish, onFinishFailed } = useSignIn();

    const { Text } = Typography;

    return (
        <Space>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={s.form}
            >
                <Text>Username</Text>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="username" />
                </Form.Item>
                <Text>Password</Text>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Space>
    );
}
