import { Divider } from "antd";
import { AppHeader } from "../../components/AppHeader";
import { PatientsList } from "../PatientsList";
import { useMain } from "./hooks";

export function Main() {
  const { onLogout } = useMain();

  return (
    <div>
      <AppHeader onLogout={onLogout} />
      <Divider />
      <PatientsList />
    </div>
  );
}
