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
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={{ position: 'fixed', left: 0, top: 0, bottom: 0 }}>
                <img src="../../../public/Logo.png" alt="logo" style={{ height: '64px', width: '90px', margin: '16px' }} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
                <Header style={{ position: 'fixed', top: 0, left: collapsed ? 80 : 200, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', zIndex: 1 }}>
                    <div />
                    <Button type="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Header>
                <Content style={{ margin: '64px 16px 0', padding: '24px', overflowY: 'auto', height: 'calc(100vh - 128px)' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center', marginLeft: collapsed ? 80 : 200 }}>
                    Wise To Us {new Date().getFullYear()} Created by Ronaldo
                </Footer>
            </Layout>
        </Layout>
    );
};

export default PainelUser;
