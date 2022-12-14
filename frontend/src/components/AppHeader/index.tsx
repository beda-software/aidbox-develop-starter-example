import { Button, Space } from "antd";

interface AppHeaderProps {
  onLogout: () => void;
}

export function AppHeader({ onLogout }: AppHeaderProps) {
  return (
    <Space size="middle" style={{ margin: 10 }}>
      <Button key="create-patient" onClick={console.log} type={"primary"}>
        Create patient
      </Button>
      <Button key="logout" onClick={onLogout}>
        Logout
      </Button>
    </Space>
  );
}
