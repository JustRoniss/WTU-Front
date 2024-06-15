import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { TeamOutlined, EyeOutlined } from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../security/AuthProvider'; 

const { Header, Content, Footer, Sider } = Layout;

const items = [
    { label: 'Eventos', key: 'eventos', icon: <TeamOutlined />, children: [
        { label: (<Link to="/user/view-events">Meus eventos</Link>), icon: <EyeOutlined />, key: 'visualizar-eventos' },
    ]},
];

const PainelUser: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut();
        navigate('/login'); 
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <img src="../../../public/Logo.png" alt="logo" style={{ height: '64px', width: '90px' }} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
                    <div />
                    <Button type="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Header>
                <Content style={{ margin: '0 12px' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Wise To Us {new Date().getFullYear()} Created by Ronaldo</Footer>
            </Layout>
        </Layout>
    );
};

export default PainelUser;
