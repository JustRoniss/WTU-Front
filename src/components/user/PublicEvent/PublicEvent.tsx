import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../../axiosConfig';
import { Spin, Alert } from 'antd';
import { showNotification } from '../../generics/GenericNotification';


const PublicEvent: React.FC = () => {
  const { publicHash } = useParams<{ publicHash: string }>(); // Pegando o hash da URL
  const [eventData, setEventData] = useState<string | null>(null); // Dados do evento
  const [loading, setLoading] = useState(true); // Indicador de loading
  const [error, setError] = useState<string | null>(null); // Mensagem de erro, se houver

  useEffect(() => {
    // Verificar se o hash está disponível antes de fazer a chamada
    if (!publicHash) {
      setError('Hash inválida.');
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        // Simular atraso de 7 segundos para verificar a integridade
        await new Promise(resolve => setTimeout(resolve, 7000));

        // Chamar a API para buscar o evento público com base no hash
        const response = await api.get(`/events/public/${publicHash}`);
        
        // Checar se os dados foram corretamente recebidos
        if (response.data) {
          setEventData(response.data); // O iframe está sendo retornado diretamente pela API
        } else {
          setError('Evento público não encontrado ou inválido.');
        }

        setLoading(false); // Encerrar o loading
      } catch (err) {
        setError('Erro ao buscar evento público.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [publicHash]); // Executa o useEffect somente quando publicHash muda

  // Exibir um spinner enquanto está carregando
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

  // Exibir a mensagem de erro caso ocorra
  if (error) {
    showNotification("error", "Erro!", error); // Exibe uma notificação de erro
    return <Alert message={error} type="error" />;
  }

  // Exibir o iframe com os dados do evento, caso tenha sucesso
  return (
    <div className='container'>
      <h1>Evento Público</h1>
      <div className='iframe-container' dangerouslySetInnerHTML={{ __html: eventData || '' }} />
    </div>
  );
};

export default PublicEvent;
