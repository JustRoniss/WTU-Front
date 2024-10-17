import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../../axiosConfig';
import { Spin, Alert } from 'antd';
import { showNotification } from '../../generics/GenericNotification';


const PublicEvent: React.FC = () => {
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

        const response = await api.get(`/events/public/${publicHash}`);

        if (response.data) {
          setEventData(response.data);
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
    <div className='container'>
      <h1>Evento Público</h1>
      <div className='iframe-container' dangerouslySetInnerHTML={{ __html: eventData || '' }} />
    </div>
  );
};

export default PublicEvent;
