import { Button, Form, Input } from "antd";

import { useSignIn } from "./useSignIn";

export function SignIn() {
  const { onFinish, onFinishFailed } = useSignIn();

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div>Please log in</div>
      <div>Username</div>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="username" />
      </Form.Item>
      <div>Password</div>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
