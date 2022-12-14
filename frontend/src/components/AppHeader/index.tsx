import { Button } from "antd";

interface AppHeaderProps {
  onLogout: () => void;
}

export function AppHeader({ onLogout }: AppHeaderProps) {
  return (
    <>
      <h1>Hemolyzer</h1>
      <Button key="create-patient" onClick={console.log} type={"primary"}>
        Create patient
      </Button>
      <Button key="logout" onClick={onLogout}>
        Logout
      </Button>
    </>
  );
}
