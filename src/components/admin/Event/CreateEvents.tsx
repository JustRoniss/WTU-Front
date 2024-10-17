import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, TimePicker, ConfigProvider, Checkbox, Tooltip, Spin } from 'antd';
import { CopyOutlined} from '@ant-design/icons';
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
import { showNotification } from '../../generics/GenericNotification';
import GenericModal from '../../generics/GenericModal';



moment.locale('pt-br');

const CreateEvents: React.FC = () => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUnits, setLoadingUnits] = useState<boolean>(true);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
    const [form] = Form.useForm();

    const [loadingPublicLink, setLoadingPublicLink] = useState(false); 
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [publicLink, setPublicLink] = useState<string | null>(null);
    const [eventId, setEventId] = useState<number>()
    
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

    const handleCreatePublicLink = async () => {
        try {
            setLoadingPublicLink(true);

            await new Promise(resolve => setTimeout(resolve, 5000)); 

            const response = await api.get(`/events/public/${eventId}/create-public-link`);
            
            const generatedLink = response.data; 
            setPublicLink(generatedLink); 
            setLoadingPublicLink(false);
            showNotification("success", "Link público criado", "O link público foi criado com sucesso!");
        } catch (error: any) {
            setLoadingPublicLink(false);
            showNotification("error", "Erro ao criar link público", error.message || "Erro desconhecido");
        }
    };

    const onFinish = (values: EventFormValues) => {
        const { startDate, startTime, endDate, endTime, title, description, unit, usersEmail, iframe, isPublic } = values;

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
            isPublic
        };

        api.post('/events/create', event)
            .then(response => {
                showNotification("success", "Evento criado", "Evento criado com sucesso!")
                form.resetFields();
                setEventId(response.data)
                if(event.isPublic){
                    setIsModalVisible(true);
                }
            })
            .catch(error => {
                console.error('Erro ao criar evento:', error);
                showNotification("error", "Erro ao criar evento", error)
            });
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
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
                                <DatePicker placeholder='Data início' disabledDate={(current) => current && current < moment().startOf('day')} />
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
                                <DatePicker placeholder='Data fim'  disabledDate={(current) => current && current < moment().startOf('day')}/>
                            </Form.Item>
                            <Form.Item
                                name="endTime"
                                rules={[{ required: true, message: 'Por favor selecione a hora de término.' }]}
                            >
                                <TimePicker placeholder='Hora fim'  />
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
                            <Tooltip title="Essa opção criará um link de acesso para pessoas que não possuem conta na WTU">
                                <Form.Item name="isPublic" valuePropName="checked">
                                    <Checkbox>Acesso público</Checkbox>
                                </Form.Item>
                            </Tooltip>

                        </div> 
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 3 }}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Criar Evento
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>

                <GenericModal
                    isOpen={isModalVisible}
                    toggle={toggleModal}
                    title="Evento público"
                    onConfirm={() => handleCreatePublicLink()} 
                    confirmText="Criar Link"
                    cancelText="Permanecer privado"
                >
                    {loadingPublicLink ? (
                        <div style={{ textAlign: 'center' }}>
                            <Spin />
                            <p>Criando link público para este evento...</p>
                        </div>
                    ) : publicLink ? ( 
                        <div style={{ textAlign: 'center' }}>
                        <p>Link público criado com sucesso:</p>
                        <Input
                            value={publicLink}
                            readOnly
                            addonAfter={
                                <Tooltip title="Copiar link">
                                    <Button
                                        icon={<CopyOutlined />}
                                        onClick={() => {
                                            navigator.clipboard.writeText(publicLink);
                                            showNotification("success", "Link copiado", "O link foi copiado para a área de transferência.");
                                        }}
                                    />
                                </Tooltip>
                            }
                        />
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                            <img 
                                src="../../../../public/Logo.png" 
                                alt="Logo da aplicação" 
                                style={{ width: '100px', marginTop: '20px' }}
                            />
                            <p style={{ marginTop: '10px' }}>Ação não reversível. <br /> Está pronto para isso?</p>
                        </div>
                    )}
                </GenericModal>
            </div>
        </ConfigProvider>
    );
};

export default CreateEvents;