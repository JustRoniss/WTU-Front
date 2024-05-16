import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, TimePicker, ConfigProvider } from 'antd';
import { Moment } from 'moment';
import moment from 'moment';
import api from '../../../config/axiosConfig';
import './../../../styles/createEvents.css'
import {Label} from "reactstrap"
import locale from 'antd/lib/locale/pt_BR';

interface EventFormValues {
    dateRange: [Moment, Moment];
    title: string;
    description: string;
}



moment.locale('pt-br');

const CreateEvents: React.FC = () => {
    <ConfigProvider locale={locale}></ConfigProvider>
    const [users, setUsers] = useState<string[]>([
        'user1@example.com',
        'user2@example.com',
        'user3@example.com',
        'user4@example.com'
    ]);
    const onFinish = (values: EventFormValues) => {
        const [startDate, endDate] = values.dateRange;
        const token = localStorage.getItem('token');

        const event = {
            title: values.title,
            description: values.description,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            unitIds: [1, 2, 3, 4],
            userEmails: ['ronaldo.dev@gmail.com']
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
    const units = ['Unidade 1', 'Unidade 2', 'Unidade 3', 'Unidade 4']; 
        
    return (
        <div className='container'>
            <ConfigProvider locale={locale}>
            <h1 className='title'>Criar eventos</h1>
                <div style={{display: "flex", justifyContent: "center"}}>

                    <Form onFinish={onFinish}>
                        <Form.Item
                            name="title"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input showCount maxLength={30} placeholder="Título do evento" style={{ width: 626 }}  />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input showCount maxLength={30} placeholder="Descrição do evento" style={{ width: 626 }} />
                        </Form.Item>

                        <p style={{color: "rgba(0, 0, 0, 0.50)", textAlign: "center"}}>Data de inicio e fim do evento</p>
                        <div className='input-group-horizontal'>
                            <Form.Item
                                name="startDate"
                                rules={[{ required: true,  message: ''  }]}
                            >
                                <DatePicker placeholder='Data início'  />
                            </Form.Item>

                            <Form.Item
                                name="startTime"
                                rules={[{ required: true, message: '' }]}
                            >
                                <TimePicker placeholder='Hora início' />
                            </Form.Item>

                            <Form.Item
                                name="endDate"
                                rules={[{ required: true,  message: ''  }]}
                            >
                                <DatePicker placeholder='Data fim' />
                            </Form.Item>
                            
                            <Form.Item
                                name="endTime"
                                rules={[{ required: true, message: '' }]}
                            >
                                <TimePicker placeholder='Hora fim' />
                            </Form.Item>
                            
                        </div>

                        <div className='input-group-horizontal'>

                            <Form.Item
                                name="unit"
                                rules={[{ required: false, message: '' }]}
                            >
                                <Select mode='multiple' placeholder="Convidar unidades" style={{ width: 308 }}>
                                    {units.map(unit => (
                                        <Select.Option key={unit} value={unit}>
                                            {unit}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="userEmails"
                                rules={[{ required: false, message: '' }]}
                            >
                                <Select
                                    mode='multiple'
                                    placeholder="Convidar usuários"
                                    style={{ width: 308 }}
                                    showSearch
                                    allowClear
                                    // filterOption={(input, option) =>
                                    //     option?.children.toLowerCase().includes(input.toLowerCase())
                                    // }
                                    filterOption={(input, option) =>
                                        option?.children
                                            ? option.children.toString().toLowerCase().includes(input.toLowerCase())
                                            : false
                                    }
                                >
                                    {users.map(user => (
                                        <Select.Option key={user} value={user}>
                                            {user}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>

                    

                        <Form.Item
                            name="iframe"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input.TextArea placeholder="Iframe do streamyard" style={{ width: 626 }}  />
                        </Form.Item>

                        
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 3}}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Criar Evento
                                </Button>
                            </Form.Item>
                        </div>


                    </Form>
                </div>
            </ConfigProvider>

        </div>
    );
};

export default CreateEvents;