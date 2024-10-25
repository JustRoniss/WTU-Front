import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../../axiosConfig';
import { Spin, Alert } from 'antd';
import { showNotification } from '../../generics/GenericNotification';
import { ApiResponse } from '../../../interfaces/ApiResponse';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './PublicEvent.css'; 

const { Header, Content, Footer, Sider } = Layout;

const PublicEvent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { publicHash } = useParams<{ publicHash: string }>();
  const [eventData, setEventData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!publicHash) {
      setError('Hash inválida.');
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 7000));

        const response = await api.get<ApiResponse<string>>(`/events/public/${publicHash}`);

        if (response.data) {
          setEventData(response.data.data);
        } else {
          setError('Evento público não encontrado ou inválido.');
        }

        setLoading(false);
      } catch (err) {
        setError('Erro ao buscar evento público.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [publicHash]);


  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <img 
          src="../../../../public/Logo.png" 
          alt="Logo da aplicação" 
          style={{ width: '100px', marginTop: '20px' }}
        />
        <Spin />
        <p>Verificando integridade da requisição...</p>
      </div>
    );
  }

  if (error) {
    showNotification("error", "Erro!", error); 
    return <Alert message={error} type="error" />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={{ position: 'fixed', left: 0, top: 0, bottom: 0 }}>
        <img 
          src="../../../public/Logo.png" 
          alt="logo" 
          style={{ height: '64px', width: '90px', margin: '16px' }} 
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header style={{ position: 'fixed', top: 0, left: collapsed ? 80 : 200, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '50px 16px', zIndex: 1, background: '#001529' }}>
        </Header>
        <Content style={{ margin: '64px 16px 0', padding: '24px', overflowY: 'auto', height: 'calc(100vh - 128px)' }}>
          <Outlet />
          <div className='container'>
            <h1 className='h1EventPublic'>Evento Público</h1>
            <div className='iframe-container' dangerouslySetInnerHTML={{ __html: eventData || '' }} />
          </div>                
        </Content>
        <Footer style={{ textAlign: 'center', marginLeft: collapsed ? 80 : 200 }}>
          Wise To Us {new Date().getFullYear()} Created by Ronaldo
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PublicEvent;
