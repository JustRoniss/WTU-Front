import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, TimePicker, ConfigProvider } from 'antd';
import moment from 'moment';
import api from '../../../../axiosConfig';
import './../../../styles/createEvents.css';
import locale from 'antd/lib/locale/pt_BR';
import { EventFormValues } from './../../../interfaces/EventFormValues';
import { Unit } from './../../../interfaces/Unit';
import { User } from './../../../interfaces/User';
import { UnitDTO } from '../../../interfaces/dto/UnitDTO';
import { UserDTO } from '../../../interfaces/dto/UserDTO';
import { length } from 'localforage';


moment.locale('pt-br');

const CreateEvents: React.FC = () => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUnits, setLoadingUnits] = useState<boolean>(true);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
    const [form] = Form.useForm();


    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await api.get('/units/get-all');
                setUnits(response.data);
                setLoadingUnits(false);
            } catch (error) {
                console.error('Erro ao buscar unidades:', error);
                setLoadingUnits(false);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await api.get('/users/get-all');
                setUsers(response.data);
                setLoadingUsers(false);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                setLoadingUsers(false);
            }
        };

        fetchUnits();
        fetchUsers();
    }, []);

    const validateFinish = (value: any) => {
        const unit = form.getFieldValue("unit");
        const usersEmail = form.getFieldValue("users");
        if((!unit || unit.length === 0) && (!usersEmail || usersEmail.length === 0)){
            return Promise.reject("Informe pelo menos uma unidade ou um usuário");
        }
        return Promise.resolve();
    }

    const onFinish = (values: EventFormValues) => {
        const { startDate, startTime, endDate, endTime, title, description, unit, usersEmail, iframe } = values;

        const startDateTime = moment(startDate).set({
            hour: startTime.hour(),
            minute: startTime.minute(),
        });

        const endDateTime = moment(endDate).set({
            hour: endTime.hour(),
            minute: endTime.minute(),
        });

        
        
        const selectedUnits: UnitDTO[] = units.filter(u => unit && unit.includes(u.id)).map(u => ({ id: u.id }));
       
        
        const selectedUsers: UserDTO[] = users.filter(u =>usersEmail && usersEmail.includes(u.email)).map(u => ({ email: u.email }));
        
            

        const event = {
            title,
            description,
            startDate: startDateTime.toISOString(),
            endDate: endDateTime.toISOString(),
            units: selectedUnits,
            users: selectedUsers,
            iframe,
        };

        api.post('/events/create', event)
            .then(response => {
                console.log('Evento criado:', response.data);
                alert('Evento criado com sucesso!');
                form.resetFields();
            })
            .catch(error => {
                console.error('Erro ao criar evento:', error);
                alert('Erro ao criar evento!');
            });
    };

    return (
        <ConfigProvider locale={locale}>
            <div className='container'>
                <h1 className='title'>Criar eventos</h1>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Form onFinish={onFinish} form={form}>
                        <Form.Item
                            name="title"
                            rules={[{ required: true, message: 'Por favor insira o título do evento.' }]}
                        >
                            <Input showCount maxLength={30} placeholder="Título do evento" style={{ width: 626 }} />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[{ required: true, message: 'Por favor insira a descrição do evento.' }]}
                        >
                            <Input showCount maxLength={30} placeholder="Descrição do evento" style={{ width: 626 }} />
                        </Form.Item>
                        <p style={{ color: "rgba(0, 0, 0, 0.50)", textAlign: "center" }}>Data de inicio e fim do evento</p>
                        <div className='input-group-horizontal'>
                            <Form.Item
                                name="startDate"
                                rules={[{ required: true, message: 'Por favor selecione a data de início.' }]}
                            >
                                <DatePicker placeholder='Data início' />
                            </Form.Item>
                            <Form.Item
                                name="startTime"
                                rules={[{ required: true, message: 'Por favor selecione a hora de início.' }]}
                            >
                                <TimePicker placeholder='Hora início' />
                            </Form.Item>
                            <Form.Item
                                name="endDate"
                                rules={[{ required: true, message: 'Por favor selecione a data de término.' }]}
                            >
                                <DatePicker placeholder='Data fim' />
                            </Form.Item>
                            <Form.Item
                                name="endTime"
                                rules={[{ required: true, message: 'Por favor selecione a hora de término.' }]}
                            >
                                <TimePicker placeholder='Hora fim' />
                            </Form.Item>
                        </div>
                        <div className='input-group-horizontal'>
                            <Form.Item
                                name="unit"
                                rules={[
                                    {required: false},
                                    {validator: async (_, value) => validateFinish}
                                ]}
                            >
                                <Select
                                    mode='multiple'
                                    placeholder="Convidar unidades"
                                    style={{ width: 308 }}
                                    loading={loadingUnits}
                                    options={units.map(unit => ({
                                        label: unit.name,
                                        value: unit.id
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item
                                name="usersEmail"
                                rules={[
                                    {required: false},
                                    {validator: async (_, value) => validateFinish}
                                ]}
                            >
                                <Select
                                    mode='multiple'
                                    placeholder="Convidar usuários"
                                    style={{ width: 308 }}
                                    showSearch
                                    allowClear
                                    loading={loadingUsers}
                                    filterOption={(input, option) =>
                                        option?.label
                                            ? option.label.toLowerCase().includes(input.toLowerCase())
                                            : false
                                    }
                                    options={users.map(user => ({
                                        label: user.email,
                                        value: user.email
                                    }))}

                                />
                            </Form.Item>
                        </div>
                        <Form.Item
                            name="iframe"
                            rules={[{ required: true, message: 'Por favor insira o iframe do streamyard.' }]}
                        >
                            <Input.TextArea placeholder="Iframe do streamyard" style={{ width: 626 }} />
                        </Form.Item>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 3 }}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Criar Evento
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default CreateEvents;