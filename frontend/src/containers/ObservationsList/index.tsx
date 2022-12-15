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
  Table,
  Typography,
} from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppHeader } from "../../components/AppHeader";
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
      _sort: "-_lastUpdated",
    });
    return response;
  }, [showModal]);
  const patientObservationsMapRD = sequenceMap({
    patient: patientRD,
    observations: observationsRD,
  });
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
          <ObservationsComponent
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

interface ObservationsComponentProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  patient: Patient;
  observationsList: Observation[];
}

function ObservationsComponent({
  showModal,
  setShowModal,
  patient,
  observationsList,
}: ObservationsComponentProps) {
  const { Text } = Typography;
  return (
    <>
      <AddObservationModalComponent
        showModal={showModal}
        setShowModal={setShowModal}
        patient={patient}
      />
      <Space size="middle" style={{ paddingTop: 10, paddingInline: 10 }}>
        <Text code>patient: {patient.name?.[0].family}</Text>
        <Text code>code: Hemoglobin [Mass/volume] in Blood (LOINC#718-7)</Text>
      </Space>
      <ObservationsListTable observationsList={observationsList} />
    </>
  );
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

interface ObservationsListTableProps {
  observationsList: Observation[];
}

export function ObservationsListTable({
  observationsList,
}: ObservationsListTableProps) {
  const dataSource = observationsList.map((observation) => {
    return {
      key: observation.id,
      observation: observation.value?.Quantity?.value,
      unit: observation.value?.Quantity?.unit,
      dateTime: formatHumanDateTime(observation.effective?.dateTime || ""),
      lastUpdated: formatHumanDateTime(observation.meta?.lastUpdated || ""),
    };
  });

  const columns = [
    {
      title: <b>Value</b>,
      dataIndex: "observation",
      key: "observation",
    },
    {
      title: <b>Unit</b>,
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: <b>Date & Time</b>,
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: <b>Last updated</b>,
      dataIndex: "lastUpdated",
      key: "lastUpdated",
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      bordered
      style={{ padding: 10 }}
    />
  );
}
