import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'antd';
import api from '../../../../axiosConfig';
import moment from 'moment';
import { useAuth } from '../../../security/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { ApiResponse } from '../../../interfaces/ApiResponse';
import { Invite } from '../../../interfaces/Invite';
import './../../../styles/UserEvents.css';
import { CalendarOutlined} from '@ant-design/icons';

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
        <div className="container principal" >
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
  
                <Row gutter={[32, 16]}>
                    {invites.map((invite) => {
                        const now = moment();
                        const buttonText = invite.endDate.isAfter(now) ? 'Entrar' : 'Assistir gravação';
                        return (
                            <Col xs={24} sm={12} md={8} lg={6} key={invite.eventId}>
                                <Card className="card-modern">
                                    <div className="card-modern-title">{invite.title}</div>
                                    <div className="card-modern-description">{invite.description}</div>
                                    <div className="card-modern-icons">
                                        <div className="card-modern-icon">
                                            <span role="img" aria-label="Data"><CalendarOutlined /></span>
                                        </div>
                                    </div>
                                    <div className="card-modern-icons">
                                    <div style={{display: "block"}}>
                                        <p className='card-modern-icon-text'><strong>Início:</strong> {moment(invite.startDate).format('DD/MM/YYYY, HH:mm:ss')}</p>
                                        <p className='card-modern-icon-text'><strong>Fim:</strong> {moment(invite.endDate).format('DD/MM/YYYY, HH:mm:ss')}</p>
                                    </div>

                                    </div>
                                    <Button 
                                        className="custom-button"
                                        onClick={() => handleEnterClick(invite)} 
                                        style={{ marginTop: '20px' }}
                                        size="large"
                                    >
                                        {buttonText}
                                    </Button>

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
