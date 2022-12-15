import { Button, Space } from "antd";

import s from "./AppHeader.module.scss";
import { useAppHeader } from "./useAppHeader";
interface AppHeaderProps {
  children?: JSX.Element;
}

export function AppHeader({ children }: AppHeaderProps) {
  const { onLogout } = useAppHeader();
  return (
    <Space size="middle" className={s.container}>
      {children}
      <Button key="logout" onClick={onLogout}>
        Logout
      </Button>
    </Space>
  );
}
