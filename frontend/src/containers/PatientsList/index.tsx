import { RenderRemoteData } from "aidbox-react/lib/components/RenderRemoteData";
import { extractBundleResources } from "aidbox-react/lib/services/fhir";
import { Button, Spin } from "antd";
import { AppHeader } from "../../components/AppHeader";
import { PatientsListTable } from "../../components/PatientsListTable";
import { usePatientsList } from "./hooks";

export function PatientsList() {
  const { patientsRD } = usePatientsList();

  return (
    <>
      <AppHeader>
        <Button key="create-patient" onClick={console.log} type={"primary"}>
          Create patient
        </Button>
      </AppHeader>
      <RenderRemoteData remoteData={patientsRD} renderLoading={() => <Spin />}>
        {(data) => (
          <PatientsListTable
            patientsList={extractBundleResources(data).Patient}
          />
        )}
      </RenderRemoteData>
    </>
  );
}
