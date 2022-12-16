import { RenderRemoteData } from "aidbox-react/lib/components/RenderRemoteData";
import { extractBundleResources } from "aidbox-react/lib/services/fhir";
import { Button, Space, Spin } from "antd";
import { AppHeader } from "../../components/AppHeader";
import { ObservationsDetails } from "../../components/ObservationsDetails";
import { useObservationsList } from "./hooks";

export function ObservationsList() {
  const { navigate, showModal, setShowModal, patientObservationsMapRD } =
    useObservationsList();

  return (
    <>
      <AppHeader>
        <Space size="middle">
          <Button onClick={() => setShowModal(true)} type="primary">
            Add observation
          </Button>
          <Button onClick={() => navigate("main")}>Back</Button>
        </Space>
      </AppHeader>
      <RenderRemoteData
        remoteData={patientObservationsMapRD}
        renderLoading={() => <Spin />}
      >
        {(data) => (
          <ObservationsDetails
            showModal={showModal}
            setShowModal={setShowModal}
            patient={data.patient}
            observationsList={
              extractBundleResources(data.observations).Observation
            }
          />
        )}
      </RenderRemoteData>
    </>
  );
}
