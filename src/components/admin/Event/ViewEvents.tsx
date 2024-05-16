import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../../../config/axiosConfig';
import GenericModal from '../../generics/GenericModal';
import moment from 'moment';
import { MomentInput } from 'moment';


const ViewEvents: React.FC  = () => {
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const { RangePicker } = DatePicker;
    

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/events/get-all');  
                const formattedEvents = response.data.map((event: { startDate: MomentInput; endDate: MomentInput; }) => ({
                    ...event,
                    startDate: moment(event.startDate),
                    endDate: moment(event.endDate)
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleEdit = (event: any) => {
        setCurrentEvent(event);
        setModalOpen(true);
    };

    const handleConfirm = () => {
        console.log("Dados para submissão:", currentEvent);
        setModalOpen(false);
    };

    const handleFormChange = (changedValues: any, allValues: any) => {
        setCurrentEvent(allValues);
    };

    const columns = [
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
                return new Date(startDate).toLocaleString('pt-BR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
            },
        },
        {
            title: 'Fim',
            dataIndex: 'endDate',
            key: 'endDate',
            align: 'center',
            render: (endDate: string | number | Date) => {
                return new Date(endDate).toLocaleString('pt-BR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
            },
        },
        {
            title: 'Unidade',
            dataIndex: 'unit',
            key: 'unit',
            align: 'center',
            render: (unit: { name: any; }) => unit?.name || 'Não especificado',  
        },
        {
            title: 'Editar',
            key: 'edit',
            align: 'center',
            render: (event: any) => (
                <EditOutlined style={{color: "blue", cursor: "pointer",}} onClick={() => handleEdit(event)} />
            ),  
        },
        {
            title: 'Remover',
            key: 'remove',
            align: 'center',
            render: (event: any) => (
                <DeleteOutlined style={{color: "red", cursor: "pointer",}} onClick={() => handleEdit(event)} />
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
                        <Form layout="vertical" initialValues={currentEvent} onValuesChange={handleFormChange}>
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


                        </Form>
                    </GenericModal>
                )}
            </div>
        </div>

    );
};

export default ViewEvents;