import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { RenderRemoteData } from 'aidbox-react/lib/components/RenderRemoteData';
import { SignIn } from '../../components/SignIn';
import { useApp } from './hooks';
import { ObservationsList } from '../ObservationsList';
import { PatientsList } from '../PatientsList';
import { Loader } from '../../components/Loader';
import { AlertFailure } from '../../components/AlertFailure';

export function App() {
    const { userResponse } = useApp();

    return (
        <BrowserRouter>
            <RenderRemoteData
                remoteData={userResponse}
                renderFailure={(error) => <AlertFailure error={error} />}
                renderLoading={() => <Loader />}
            >
                {(user) => (
                    <Routes>
                        {user ? (
                            <>
                                <Route path="patients" element={<PatientsList />} />
                                <Route path="patients/:patientId/" element={<ObservationsList />} />
                                <Route path="*" element={<Navigate to="/patients" />} />
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
