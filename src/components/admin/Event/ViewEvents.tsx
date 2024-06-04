import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Select, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../../../../axiosConfig';
import GenericModal from '../../generics/GenericModal';
import moment from 'moment';
import { Event } from './../../../interfaces/Event';
import { User } from '../../../interfaces/User';
import { Unit } from '../../../interfaces/Unit';
import { ColumnsType } from 'antd/es/table';

const ViewEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
    const [units, setUnits] = useState<Unit[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
    const { RangePicker } = DatePicker;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get<Event[]>('/events/get-all');
                const formattedEvents: Event[] = response.data.map(event => ({
                    ...event,
                    startDate: moment(event.startDate),
                    endDate: moment(event.endDate)
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            }
        };

        const fetchUnits = async () => {
            try {
                const response = await api.get<Unit[]>('/units/get-all');
                setUnits(response.data);
            } catch (error) {
                console.error('Erro ao buscar unidades:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await api.get<User[]>('/users/get-all');
                setUsers(response.data);
                setLoadingUsers(false);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                setLoadingUsers(false);
            }
        };

        fetchEvents();
        fetchUnits();
        fetchUsers();
    }, []);

    const handleEdit = (event: Event) => {

        console.log(selectedUnits)
        setCurrentEvent({
            ...event,
            id: event.id,
            startDate: moment(event.startDate),
            endDate: moment(event.endDate),
        });

        setSelectedUnits(event.units.map(unit => unit.id));
        setSelectedUsers(event.users.map(user => user.email));
        setModalOpen(true);
    };

    const handleConfirm = async () => {
        if (currentEvent && currentEvent.id) {
            try {
                const response = await api.put(`/events/edit/${currentEvent.id}`, {
                    title: currentEvent.title,
                    description: currentEvent.description,
                    startDate: currentEvent.startDate,
                    endDate: currentEvent.endDate,
                    iframe: currentEvent.iframe,
                    units: selectedUnits.map(id => ({ id })), 
                    users: selectedUsers.map(email => ({ email }))  
                });
                alert("Evento atualizado com sucesso");
                setModalOpen(false);
                setEvents(prevEvents => prevEvents.map(event => event.id === currentEvent.id ? { ...currentEvent, ...response.data } : event));
            } catch (error) {
                alert("Erro ao atualizar o evento");
                console.error('Erro ao atualizar o evento:', error);
            }
        } else {
            alert("Erro: Evento atual não possui um ID válido.");
        }
    };

    const handleFormChange = (changedValues: any, allValues: any) => {
        if (allValues.units) {
            setSelectedUnits(allValues.units);
        }
        if (allValues.users) {
            setSelectedUsers(allValues.users);
        }
        setCurrentEvent(prev => prev ? { ...prev, ...allValues, startDate: moment(allValues.startDate), endDate: moment(allValues.endDate) } : null);
    };

    const columns: ColumnsType<Event> = [
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
            align: 'center'
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
            align: 'center'
        },
        {
            title: 'Início',
            dataIndex: 'startDate',
            key: 'startDate',
            align: 'center',
            render: (startDate: string | number | Date) => {
                return moment(startDate).format('DD/MM/YYYY, HH:mm:ss');
            },
        },
        {
            title: 'Fim',
            dataIndex: 'endDate',
            key: 'endDate',
            align: 'center',
            render: (endDate: string | number | Date) => {
                return moment(endDate).format('DD/MM/YYYY, HH:mm:ss');
            },
        },
        {
            title: 'Unidades',
            dataIndex: 'units',
            key: 'units',
            align: 'center',
            render: (units: { id: number; name: string }[]) => {
                if (!units || units.length === 0) {
                    return <span>Não especificado</span>;
                }
                const displayedUnits = units.slice(0, 3).map(unit => unit.name).join(', ');
                const suffix = units.length > 3 ? '...' : '';
                return <span>{displayedUnits}{suffix}</span>;
            }
        },
        {
            title: 'Pessoas',
            dataIndex: 'users',
            key: 'users',
            align: 'center',
            render: (users: User[]) => {
                if (!users || users.length === 0) {
                    return <span>Não especificado</span>;
                }
                const displayedUsers = users.slice(0, 3).map(user => user.email).join(', ');
                const suffix = users.length > 3 ? '...' : '';
                return <span>{displayedUsers}{suffix}</span>;
            }
        },
        {
            title: 'Editar',
            key: 'edit',
            align: 'center',
            render: (event: Event) => (
                <EditOutlined style={{ color: "blue", cursor: "pointer" }} onClick={() => handleEdit(event)} />
            ),
        },
        {
            title: 'Remover',
            key: 'remove',
            align: 'center',
            render: (event: Event) => (
                <DeleteOutlined style={{ color: "red", cursor: "pointer" }} onClick={() => handleEdit(event)} />
            ),
        }
    ];

    return (
        <div className='container'>
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Visualizar eventos</h1>
                <Table dataSource={events} columns={columns} rowKey="id" />
                {currentEvent && (
                    <GenericModal
                        isOpen={modalOpen}
                        toggle={() => setModalOpen(false)}
                        title="Editar Evento"
                        onConfirm={handleConfirm}
                        confirmText="Salvar"
                        cancelText="Cancelar"
                    >
                        <Form layout="vertical" initialValues={{ ...currentEvent, units: selectedUnits, users: selectedUsers }} onValuesChange={handleFormChange}>
                            <Form.Item label="Título" name="title">
                                <Input />
                            </Form.Item>

                            <Form.Item label="Descrição" name="description">
                                <Input />
                            </Form.Item>

                            <Form.Item label="Início" name="startDate">
                                <DatePicker showTime />
                            </Form.Item>

                            <Form.Item label="Fim" name="endDate">
                                <DatePicker showTime />
                            </Form.Item>

                            <Form.Item label="Unidades" name="units">
                                <Select
                                    mode='multiple'
                                    placeholder="Selecione as unidades"
                                    onChange={setSelectedUnits}
                                >
                                    {units.map(unit => (
                                        <Select.Option key={unit.id} value={unit.id}>
                                            {unit.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Usuários" name="users">
                                <Select
                                    mode='multiple'
                                    placeholder="Selecione os usuários"
                                    onChange={setSelectedUsers}
                                >
                                    {users.map(user => (
                                        <Select.Option key={user.email} value={user.email}>
                                            {user.email}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Iframe Streamyard" name="iframe">
                                <Input.TextArea style={{ width: 626 }} />
                            </Form.Item>
                        </Form>
                    </GenericModal>
                )}
            </div>
        </div>
    );
};

export default ViewEvents;
