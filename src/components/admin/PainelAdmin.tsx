import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { DesktopOutlined, TeamOutlined, EyeOutlined, FileAddOutlined } from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../security/AuthProvider'; 

const { Header, Content, Footer, Sider } = Layout;

const items = [
    { label: "Unidades", key: 'unidades', icon: <DesktopOutlined />, children: [
        { label: (<Link to="/admin/view-units">Visualizar</Link>), icon: <EyeOutlined />, key: 'visualizar-unidades' },
        { label: (<Link to="/admin/create-units">Criar</Link>), icon: <FileAddOutlined />, key: 'criar-unidades' }
    ]},
    { label: 'Eventos', key: 'eventos', icon: <TeamOutlined />, children: [
        { label: (<Link to="/admin/view-events">Visualizar</Link>), icon: <EyeOutlined />, key: 'visualizar-eventos' },
        { label: (<Link to="/admin/create-events">Criar</Link>), icon: <FileAddOutlined />, key: 'criar-events' },
    ]},
];

const PainelAdmin: React.FC = () => {
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

export default PainelAdmin;
