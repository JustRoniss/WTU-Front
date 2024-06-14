import React from 'react';
import { useLocation } from 'react-router-dom';

const EventIframe: React.FC = () => {
    const location = useLocation();
    const { iframe } = location.state as { iframe: string };

    if (!iframe) {
        return <div>Evento não encontrado</div>;
    }

    return (
        <div className='container'>
            <h1>Evento</h1>
            <div dangerouslySetInnerHTML={{ __html: iframe }} />
        </div>
    );
};

export default EventIframe;