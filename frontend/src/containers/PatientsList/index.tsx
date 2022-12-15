import { RenderRemoteData } from "aidbox-react/lib/components/RenderRemoteData";
import { extractBundleResources } from "aidbox-react/lib/services/fhir";
import { Spin } from "antd";
import { PatientsListTable } from "../../components/PatientsListTable";
import { usePatientsList } from "./hooks";

export function PatientsList() {
  const { patientsRD } = usePatientsList();

  return (
    <RenderRemoteData remoteData={patientsRD} renderLoading={() => <Spin />}>
      {(data) => (
        <PatientsListTable patientList={extractBundleResources(data).Patient} />
      )}
    </RenderRemoteData>
  );
}
