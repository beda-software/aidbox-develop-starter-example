import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { RenderRemoteData } from "aidbox-react/lib/components/RenderRemoteData";
import { Main } from "../Main";
import { SignIn } from "../../components/SignIn";
import { useApp } from "./hooks";

function App() {
  const { userResponse } = useApp();

  return (
    <BrowserRouter>
      <RenderRemoteData
        remoteData={userResponse}
        renderFailure={(error) => (
          <div style={{ width: "100%", padding: "2.5%" }}>
            {JSON.stringify(error)}
          </div>
        )}
      >
        {(user) => (
          <Routes>
            {user ? (
              <>
                <Route path="main" element={<Main />} />
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

export default App;
