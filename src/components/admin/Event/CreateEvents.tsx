import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, TimePicker, ConfigProvider } from 'antd';
import moment from 'moment';
import api from '../../../../axiosConfig';
import './../../../styles/createEvents.css';
import locale from 'antd/lib/locale/pt_BR';
import {EventFormValues} from './../../../interfaces/EventFormValues'
import { Unit } from './../../../interfaces/Unit'; 
import { User } from './../../../interfaces/User'; 



moment.locale('pt-br');

const CreateEvents: React.FC = () => {

    const [units, setUnits] = useState<Unit[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [selectedUnit, setSelectedUnit] = useState([])

    const [loadingUnits, setLoadingUnits] = useState<boolean>(true);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

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
                console.log("Dados do users: ", response.data)
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                setLoadingUsers(false);
            }
        };

        fetchUnits();
        fetchUsers();
    }, []);

    const onFinish = (values: EventFormValues) => {
        const { startDate, startTime, endDate, endTime, title, description, unit, usersEmail, iframe } = values;

        console.log("Valores capturados:", values);

        const startDateTime = moment(startDate).set({
            hour: startTime.hour(),
            minute: startTime.minute(),
        });

        const endDateTime = moment(endDate).set({
            hour: endTime.hour(),
            minute: endTime.minute(),
        });

        const selectedUnitIds = units.filter(u => unit.includes(u.name)).map(u => u.id);


        console.log("Dingue dongue: " + usersEmail)
        const selectedUserEmails =  users.filter(u => usersEmail.includes(u.email)).map(u => u.email);


        const event = {
            title,
            description,
            startDate: startDateTime.toISOString(),
            endDate: endDateTime.toISOString(),
            unitIds: selectedUnitIds,
            usersEmail: selectedUserEmails,
            iframe,
        };

        api.post('/events/create', event)
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
        <ConfigProvider locale={locale}>
            <div className='container'>
                <h1 className='title'>Criar eventos</h1>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Form onFinish={onFinish}>
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
                        <p style={{color: "rgba(0, 0, 0, 0.50)", textAlign: "center"}}>Data de inicio e fim do evento</p>
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
                                rules={[{ required: false, message: '' }]}
                            >
                                <Select 
                                    mode='multiple' 
                                    placeholder="Convidar unidades" 
                                    style={{ width: 308 }}
                                    loading={loadingUnits}
                                >
                                    {units.map(unit => (
                                        <Select.Option key={unit.id} value={unit.name}>
                                            {unit.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="usersEmail"
                                rules={[{ required: false, message: '' }]}
                            >
                                <Select
                                    mode='multiple'
                                    placeholder="Convidar usuários"
                                    style={{ width: 308 }}
                                    showSearch
                                    allowClear
                                    loading={loadingUsers}
                                    filterOption={(input, option) =>
                                        option?.children
                                            ? option.children.toString().toLowerCase().includes(input.toLowerCase())
                                            : false
                                    }
                                >
                                    {users.map(user => (
                                        <Select.Option key={user.id} value={user.email}>
                                            {user.email}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <Form.Item
                            name="iframe"
                            rules={[{ required: true, message: 'Por favor insira o iframe do streamyard.' }]}
                        >
                            <Input.TextArea placeholder="Iframe do streamyard" style={{ width: 626 }} />
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
            </div>
        </ConfigProvider>
    );
};

export default CreateEvents;
