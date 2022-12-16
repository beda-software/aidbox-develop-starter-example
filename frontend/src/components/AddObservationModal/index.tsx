import { isFailure, isSuccess } from "aidbox-react/lib/libs/remoteData";
import { saveFHIRResource } from "aidbox-react/lib/services/fhir";
import { Button, DatePicker, Form, InputNumber, message, Modal } from "antd";
import { Observation, Patient } from "../../types/aidbox";

interface AddObservationModalProps {
  showObservationModal: boolean;
  setShowObservationModal: (showObservationModal: boolean) => void;
  patient: Patient;
}

export function AddObservationModal({
  showObservationModal,
  setShowObservationModal,
  patient,
}: AddObservationModalProps) {
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
    setShowObservationModal(false);
  };
  
  return (
    <Modal
      title="Add observation"
      open={showObservationModal}
      onCancel={() => setShowObservationModal(false)}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Form
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
