import { RenderRemoteData } from "aidbox-react/lib/components/RenderRemoteData";
import { useService } from "aidbox-react/lib/hooks/service";
import { getFHIRResources } from "aidbox-react/lib/services/fhir";
import { Button, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Observation } from "../../types/aidbox";

export function ObservationsList() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [observationsRD] = useService(async () => {
    const response = await getFHIRResources<Observation>("Observation", {
      _subject: patientId,
    });
    return response;
  });
  return (
    <>
      <Space size="middle" style={{ padding: 10 }}>
        <Button onClick={console.log} type="primary">
          Add observation
        </Button>
        <Button onClick={() => navigate("main")}>Back</Button>
      </Space>
      <RenderRemoteData remoteData={observationsRD}>
        {(data) => <div>{JSON.stringify(data)}</div>}
      </RenderRemoteData>
    </>
  );
}
