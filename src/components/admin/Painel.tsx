import  { useState } from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, PieChartOutlined, TeamOutlined } from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const items = [
    { label: (<Link to="/admin/unidades">Unidades</Link>), key: 'unidades', icon: <DesktopOutlined /> },
    { label: 'Eventos', key: 'eventos', icon: <PieChartOutlined />, children: [
        { label: (<Link to="/admin/visualizar-eventos">Visualizar Eventos</Link>), key: 'visualizar-eventos' },
        { label: (<Link to="/admin/create-events">Criar Eventos</Link>), key: 'create-events' },
        { label: (<Link to="/admin/excluir-eventos">Excluir Eventos</Link>), key: 'excluir-eventos' },
    ]},
    { label: 'Team', key: 'team', icon: <TeamOutlined />, children: [
        { label: (<Link to="/admin/team-1">Team 1</Link>), key: 'team-1' },
        { label: (<Link to="/admin/team-2">Team 2</Link>), key: 'team-2' },
    ]},
];

const Painel = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Outlet />  
                </Content>
                <Footer style={{ textAlign: 'center' }}>Wise To Us {new Date().getFullYear()} Created by Ronaldo</Footer>
            </Layout>
        </Layout>
    );
};

export default Painel;
