import { Button, Divider } from "antd";

interface AppHeaderProps {
  onLogout: () => void;
}

export function AppHeader({ onLogout }: AppHeaderProps) {
  return (
    <>
      <Divider />
      <h1>Hemolyzer</h1>
      <Button key="create-patient" onClick={console.log} type={"primary"}>
        Create patient
      </Button>
      <Button key="logout" onClick={onLogout}>
        Logout
      </Button>
      <Divider />
    </>
  );
}
