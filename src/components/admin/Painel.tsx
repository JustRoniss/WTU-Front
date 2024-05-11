import React, { useState } from 'react';
import { Layout, Menu, Input, Button, DatePicker, Form } from 'antd';
import { DesktopOutlined, PieChartOutlined, TeamOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Moment } from 'moment'; 

const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker;

interface EventFormValues {
    dateRange: [Moment, Moment];
    title: string;
    description: string;
}

type MenuItem = {
    key: React.Key;
    icon?: React.ReactNode;
    label: React.ReactNode;
    children?: MenuItem[];
};

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items: MenuItem[] = [
    getItem('Unidades', '2', <DesktopOutlined />),
    getItem('Eventos', 'sub1', <PieChartOutlined />, [
        getItem('Visualizar Eventos', '3'),
        getItem('Criar Eventos', '4'),
        getItem('Excluir Eventos', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
];

const Painel: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onFinish = (values: EventFormValues) => {
        const [startDate, endDate] = values.dateRange;
        const token = localStorage.getItem('token');

        const event = {
            title: values.title,
            description: values.description,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            unitId: 1, 
            userEmails: ['example@example.com'] 
        };

        axios.post('http://localhost:8080/events/create', event, {
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

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }}/>
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                        <Form onFinish={onFinish}>
                            <Form.Item name="title" rules={[{ required: true, message: 'Por favor insira o título do evento!' }]}>
                                <Input placeholder="Título do evento" />
                            </Form.Item>
                            <Form.Item name="description" rules={[{ required: true, message: 'Por favor insira a descrição do evento!' }]}>
                                <Input.TextArea placeholder="Descrição do evento" />
                            </Form.Item>
                            <Form.Item name="dateRange" rules={[{ required: true, message: 'Por favor selecione o intervalo de datas!' }]}>
                                <RangePicker showTime />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Criar Evento
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Wise To Us {new Date().getFullYear()} Created by Ronaldo</Footer>
            </Layout>
        </Layout>
    );
};

export default Painel;
