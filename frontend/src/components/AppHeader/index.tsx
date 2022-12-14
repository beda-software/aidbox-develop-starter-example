import { Button, Space } from "antd";

import s from "./AppHeader.module.scss";
interface AppHeaderProps {
  onLogout: () => void;
}

export function AppHeader({ onLogout }: AppHeaderProps) {
  return (
    <Space size="middle" className={s.container}>
      <Button key="create-patient" onClick={console.log} type={"primary"}>
        Create patient
      </Button>
      <Button key="logout" onClick={onLogout}>
        Logout
      </Button>
    </Space>
  );
}
