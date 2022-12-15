import { RenderRemoteData } from "aidbox-react/lib/components/RenderRemoteData";
import { useService } from "aidbox-react/lib/hooks/service";
import { isFailure, isSuccess } from "aidbox-react/lib/libs/remoteData";
import {
  extractBundleResources,
  getFHIRResource,
  getFHIRResources,
  saveFHIRResource,
} from "aidbox-react/lib/services/fhir";
import { sequenceMap } from "aidbox-react/lib/services/service";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  message,
  Modal,
  Space,
  Spin,
} from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Observation, Patient } from "../../types/aidbox";
import { formatHumanDateTime } from "../../utils/date";

export function ObservationsList() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [patientRD] = useService(async () => {
    const response = await getFHIRResource<Patient>({
      resourceType: "Patient",
      id: patientId,
    });
    return response;
  });
  const [observationsRD] = useService(async () => {
    const response = await getFHIRResources<Observation>("Observation", {
      _subject: patientId,
    });
    return response;
  }, [showModal]);
  const patientObservationsMapRD = sequenceMap({
    patient: patientRD,
    observations: observationsRD,
  });
  return (
    <>
      <Space size="middle" style={{ padding: 10 }}>
        <Button onClick={() => setShowModal(true)} type="primary">
          Add observation
        </Button>
        <Button onClick={() => navigate("main")}>Back</Button>
      </Space>
      <RenderRemoteData remoteData={patientObservationsMapRD} renderLoading={() => <Spin />}>
        {(data) => (
          <ObservationsComponent
            showModal={showModal}
            setShowModal={setShowModal}
            patient={data.patient}
            observationArray={
              extractBundleResources(data.observations).Observation
            }
          />
        )}
      </RenderRemoteData>
    </>
  );
}

interface ObservationsComponentProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  patient: Patient;
  observationArray: Observation[];
}

function ObservationsComponent({
  showModal,
  setShowModal,
  patient,
  observationArray,
}: ObservationsComponentProps) {
  return (
    <div>
      <AddObservationModalComponent
        showModal={showModal}
        setShowModal={setShowModal}
        patient={patient}
      />
      <PatientComponent patient={patient} />
      {observationArray.map((observation) => (
        <div>
          <div>{observation.value?.Quantity?.value}</div>
          <div>{observation.value?.Quantity?.unit}</div>
          <div>{formatHumanDateTime(observation.effective?.dateTime || '')}</div>
        </div>
      ))}
    </div>
  );
}

interface PatientComponentProps {
  patient: Patient;
}

function PatientComponent({ patient }: PatientComponentProps) {
  return <div>Patient name: {patient.name?.[0].family}</div>;
}

interface AddObservationModalComponentProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  patient: Patient;
}

function AddObservationModalComponent({
  showModal,
  setShowModal,
  patient,
}: AddObservationModalComponentProps) {
  const [form] = Form.useForm();
  const onFinish = async (values: { dateTime: Date; value: number }) => {
    const observation = {
      status: "final",
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "718-7",
            display: "Hemoglobin [Mass/volume] in Blood",
          },
        ],
      },
      effective: {
        dateTime: new Date(values.dateTime).toISOString(),
      },
      value: {
        Quantity: {
          value: values.value,
          unit: "g/dL",
        },
      },
      subject: {
        id: `${patient.id}`,
        display: `${patient.name?.[0].family}`,
        resourceType: "Patient" as "Patient",
      },
      resourceType: "Observation" as "Observation",
    };
    const response = await saveFHIRResource<Observation>(observation);
    if (isFailure(response)) {
      message.error(response.error);
    }
    if (isSuccess(response)) {
      message.success("Observation added");
    }
    setShowModal(false);
  };
  return (
    <Modal
      title="Add observation"
      open={showModal}
      onCancel={() => setShowModal(false)}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item
          name="value"
          label="Value"
          rules={[{ required: true, message: "Please enter a value" }]}
        >
          <InputNumber addonAfter="g/dL" />
        </Form.Item>
        <Form.Item
          name="dateTime"
          label="Date"
          rules={[{ required: true, message: "Please enter a date and time" }]}
        >
          <DatePicker showTime format="MM-DD-YYYY HH:mm" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
