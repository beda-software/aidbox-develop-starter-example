import { logout } from "../../services/auth";

export function useMain() {
  const onLogout = () => {
    logout();
    window.location.reload();
  };

  return {
    onLogout,
  };
}
