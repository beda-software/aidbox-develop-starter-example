import { AppHeader } from "../../components/AppHeader";
import { PatientsList } from "../PatientsList";
import { useMain } from "./hooks";

export function Main() {
  const { onLogout } = useMain();

  return (
    <>
      <AppHeader onLogout={onLogout} />
      <PatientsList />
    </>
  );
}
