import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'antd';
import api from '../../../../axiosConfig';
import moment from 'moment';
import { useAuth } from '../../../security/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { ApiResponse } from '../../../interfaces/ApiResponse';
import { Invite } from '../../../interfaces/Invite';
import './../../../styles/UserEvents.css'; 

const UserEvents: React.FC = () => {
    const [invites, setInvites] = useState<Invite[]>([]);
    const { getEmailFromToken } = useAuth();
    const navigate = useNavigate();

    const userEmail = getEmailFromToken();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get<ApiResponse<Invite[]>>(`/invites/get-invites/${userEmail}`);
                const formattedInvites: Invite[] = response.data.data
                    .map(event => ({
                        ...event,
                        startDate: moment(event.startDate),
                        endDate: moment(event.endDate),
                        creationDate: moment(event.creationDate)
                    }))
                    .sort((a, b) => b.creationDate.diff(a.creationDate));
                setInvites(formattedInvites);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            }
        };

        fetchEvents();
    }, [userEmail]);

    const handleEnterClick = (invite: Invite) => {
        navigate(`/user/events/${invite.eventId}/iframe`, { state: { iframe: invite.iframe, title: invite.title } });
    };

    return (
        <div className="container">
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Eventos Convidados</h1>
                <Row gutter={[16, 16]}>
                    {invites.map((invite) => {
                        const now = moment();
                        const buttonText = invite.endDate.isAfter(now) ? 'Entrar' : 'Assistir gravação';
                        return (
                            <Col xs={24} sm={12} md={8} lg={6} key={invite.eventId}>
                                <Card
                                    className="card-hover" // Adiciona a classe de hover
                                    title={invite.title}
                                    bordered={true}
                                    style={{ width: '100%' }}
                                    actions={[
                                        <Button type="primary" onClick={() => handleEnterClick(invite)}>
                                            {buttonText}
                                        </Button>
                                    ]}
                                >
                                    <p><strong>Descrição:</strong> {invite.description}</p>
                                    <p><strong>Início:</strong> {moment(invite.startDate).format('DD/MM/YYYY, HH:mm:ss')}</p>
                                    <p><strong>Fim:</strong> {moment(invite.endDate).format('DD/MM/YYYY, HH:mm:ss')}</p>
                                    <p><strong>Criado em:</strong> {moment(invite.creationDate).format('DD/MM/YYYY, HH:mm:ss')}</p>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};

export default UserEvents;
