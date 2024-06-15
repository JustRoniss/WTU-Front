import React, { useEffect } from 'react';
import { notification } from 'antd';

interface NotificationProps {
    type: 'success' | 'info' | 'warning' | 'error';
    title: string;
    description: string;
}

const GenericNotification: React.FC<NotificationProps> = ({ type, title, description }) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = () => {
        api[type]({
            message: title,
            description: description
        });
    };

    useEffect(() => {
        openNotificationWithIcon();
    }, []);

    return <>{contextHolder}</>;
};

export const showNotification = (type: 'success' | 'info' | 'warning' | 'error', title: string, description: string) => {
    notification[type]({
        message: title,
        description: description,
        placement: "bottomRight"
    });
};

export default GenericNotification;
