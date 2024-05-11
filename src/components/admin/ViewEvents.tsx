import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import api from '../../config/axiosConfig';

const ViewEvents: React.FC  = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/events/get-all');  
                setEvents(response.data);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            }
        };

        fetchEvents();
    }, []);

    const columns = [
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Início',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (startDate: string | number | Date) => new Date(startDate).toLocaleString(),
        },
        {
            title: 'Fim',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (endDate: string | number | Date) => new Date(endDate).toLocaleString(),
        },
        {
            title: 'Unidade',
            dataIndex: 'unit',
            key: 'unit',
            render: (unit: { name: any; }) => unit?.name || 'Não especificado',  
        },
    ];

    return (
        <div>
            <h1>Eventos</h1>
            <Table dataSource={events} columns={columns} rowKey="id" />
        </div>
    );
};

export default ViewEvents;