import { logout } from '../../services/auth';

export function useAppHeader() {
    const onLogout = () => {
        logout();
        window.location.reload();
    };

    return {
        onLogout,
    };
}
