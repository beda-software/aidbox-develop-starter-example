import { isFailure, isSuccess } from 'aidbox-react/lib/libs/remoteData';
import { saveFHIRResource } from 'aidbox-react/lib/services/fhir';
import { Button, DatePicker, Form, Input, message, Modal, Select } from 'antd';
import { Patient } from '../../types/aidbox';
import { formatHumanDate } from '../../utils/date';

interface AddPatientModalProps {
    showPatientModal: boolean;
    setShowPatientModal: (showPatientModal: boolean) => void;
    reloadPatientsList: () => void;
}

export function AddPatientModal({
    showPatientModal,
    setShowPatientModal,
    reloadPatientsList,
}: AddPatientModalProps) {
    const onFinish = async (values: { family: string; birthDate: string; gender: string }) => {
        const patient = {
            name: [
                {
                    use: 'official',
                    family: values.family,
                },
            ],
            birthDate: values.birthDate && formatHumanDate(values.birthDate),
            resourceType: 'Patient' as 'Patient',
            gender: values.gender,
        };
        const response = await saveFHIRResource<Patient>(patient);
        if (isFailure(response)) {
            message.error(response.error);
        }
        if (isSuccess(response)) {
            message.success('Patient created');
        }
        reloadPatientsList();
        setShowPatientModal(false);
    };

    return (
        <Modal
            title="Create patient"
            open={showPatientModal}
            onCancel={() => setShowPatientModal(false)}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            <Form onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 20 }}>
                <Form.Item
                    required
                    name="family"
                    label="Name"
                    rules={[{ message: 'Please enter a name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="birthDate" label="Date of Birth">
                    <DatePicker format="MM-DD-YYYY" />
                </Form.Item>
                <Form.Item name="gender" label="Gender">
                    <Select>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 20 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
