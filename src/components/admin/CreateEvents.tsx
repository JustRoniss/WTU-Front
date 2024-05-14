import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import { Moment } from 'moment';
import api from '../../config/axiosConfig';

const { RangePicker } = DatePicker;

interface EventFormValues {
    dateRange: [Moment, Moment];
    title: string;
    description: string;
}

const CreateEvents: React.FC = () => {
    const onFinish = (values: EventFormValues) => {
        const [startDate, endDate] = values.dateRange;
        const token = localStorage.getItem('token');

        const event = {
            title: values.title,
            description: values.description,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            unitId: 1,
            userEmails: ['example@example.com']
        };

        api.post('http://localhost:8080/events/create', event, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Evento criado:', response.data);
            alert('Evento criado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao criar evento:', error);
            alert('Erro ao criar evento!');
        });
    };

    return (

        <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <h1>Criar eventos</h1>
            <Form onFinish={onFinish}>
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: 'Por favor insira o título do evento!' }]}
                >
                    <Input placeholder="Título do evento" />
                </Form.Item>
                <Form.Item
                    name="description"
                    rules={[{ required: true, message: 'Por favor insira a descrição do evento!' }]}
                >
                    <Input.TextArea placeholder="Descrição do evento" />
                </Form.Item>
                <Form.Item
                    name="dateRange"
                    rules={[{ required: true, message: 'Por favor selecione o intervalo de datas!' }]}
                >
                    <RangePicker showTime />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Criar Evento
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateEvents;