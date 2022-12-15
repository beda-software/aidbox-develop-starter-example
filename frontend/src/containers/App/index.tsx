import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { RenderRemoteData } from "aidbox-react/lib/components/RenderRemoteData";
import { Main } from "../Main";
import { SignIn } from "../../components/SignIn";
import { useApp } from "./hooks";
import { ObservationsList } from "../ObservationsList";
import { Spin } from "antd";

export function App() {
  const { userResponse } = useApp();

  return (
    <BrowserRouter>
      <RenderRemoteData
        remoteData={userResponse}
        renderFailure={(error) => <div>{JSON.stringify(error)}</div>} // TODO Show error message
        renderLoading={() => <Spin />}
      >
        {(user) => (
          <Routes>
            {user ? (
              <>
                <Route path="main" element={<Main />} />
                <Route path="patients/:patientId/" element={<ObservationsList />} />
                <Route path="*" element={<Navigate to="/main" />} />
              </>
            ) : (
              <>
                <Route path="signin" element={<SignIn />} />
                <Route path="*" element={<Navigate to="/signin" />} />
              </>
            )}
          </Routes>
        )}
      </RenderRemoteData>
    </BrowserRouter>
  );
}
