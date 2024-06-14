import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import api from '../../../../axiosConfig';
import moment from 'moment';
import { Event } from '../../../interfaces/Event';
import { ColumnsType } from 'antd/es/table';
import { useAuth } from '../../../security/AuthProvider';
import { useNavigate } from 'react-router-dom';

const UserEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const { getEmailFromToken } = useAuth();
    const navigate = useNavigate();

    const userEmail = getEmailFromToken();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get<Event[]>(`/invites/get-invites/${userEmail}`);
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

        fetchEvents();
    }, [userEmail]);

    const handleEnterClick = (event: Event) => {
        navigate(`/user/events/${event.id}/iframe`, { state: { iframe: event.iframe } });
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
            title: 'Ações',
            key: 'actions',
            align: 'center',
            render: (_, record: Event) => (
                <Button type="primary" onClick={() => handleEnterClick(record)}>
                    Entrar
                </Button>
            )
        }
    ];

    return (
        <div className='container'>
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Eventos Convidados</h1>
                <Table dataSource={events} columns={columns} rowKey="id" />
            </div>
        </div>
    );
};

export default UserEvents;
