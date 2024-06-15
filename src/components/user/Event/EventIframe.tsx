import React from 'react';
import { useLocation } from 'react-router-dom';
import { showNotification } from '../../generics/GenericNotification';
import './EventIframe.css';

const EventIframe: React.FC = () => {
    const location = useLocation();
    const { iframe, title } = location.state as { iframe: string; title: string };

    if (!iframe) {
        showNotification("error", "Erro!", "Evento não encontrado. Entre em contato com nossa equipe de desenvolvimento.")
        return <div>Evento não encontrado</div>;
    }

    return (
        <div className='container'>
            <h1>{title}</h1>
            <div className='.iframe-container' dangerouslySetInnerHTML={{ __html: iframe }} />
        </div>
    );
};

export default EventIframe;
