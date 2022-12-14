import { RenderRemoteData } from "aidbox-react/lib/components/RenderRemoteData";
import { useService } from "aidbox-react/lib/hooks/service";
import {
  extractBundleResources,
  getFHIRResources,
} from "aidbox-react/lib/services/fhir";
import { Button } from "antd";
import { logout } from "../../services/auth";

export const Main = () => {
  const [patientRD] = useService(async () => {
    const response = await getFHIRResources("Patient", {});
    return response;
  });

  const onLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div>
      <RenderRemoteData remoteData={patientRD}>
        {(data) => <div>{JSON.stringify(extractBundleResources(data))}</div>}
      </RenderRemoteData>
      <Button key="logout" onClick={onLogout}>
        logout
      </Button>
    </div>
  );
};
