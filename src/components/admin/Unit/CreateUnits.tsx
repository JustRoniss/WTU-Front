import React, { useState } from 'react';
import { Form, Input, Button, ConfigProvider, Select } from 'antd';
import api from '../../../../axiosConfig';
import locale from 'antd/lib/locale/pt_BR';
import { showNotification } from '../../generics/GenericNotification';
import { ApiResponse } from '../../../interfaces/ApiResponse';

const CreateUnits: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = (values: { name: string, endereco: string, franchised: boolean }) => {
        setLoading(true);
        const { name, endereco, franchised } = values;

        const unit = {
            name,
            endereco,
            franchised,
        };

        api.post<ApiResponse<string>>('/units/create', unit)
            .then(response => {
                showNotification("success", "Unidade criada", "Unidade criada com sucesso!");
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao criar unidade:', error);
                showNotification("error", "Erro ao criar unidade", error);
                setLoading(false);
            });
    };

    return (
        <ConfigProvider locale={locale}>
            <div className='container'>
                <h1 className='title'>Criar Unidade</h1>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Form onFinish={onFinish}>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Por favor insira o nome da unidade.' }]}
                        >
                            <Input showCount maxLength={30} placeholder="Nome da unidade" style={{ width: 626 }} />
                        </Form.Item>
                        <Form.Item
                            name="endereco"
                            rules={[{ required: true, message: 'Por favor insira o endereço da unidade.' }]}
                        >
                            <Input showCount maxLength={100} placeholder="Endereço da unidade" style={{ width: 626 }} />
                        </Form.Item>
                        <Form.Item
                            name="franchised"
                            rules={[{ required: true, message: 'Por favor selecione se a unidade é franquia.' }]}
                        >
                            <Select placeholder="É uma franquia?" style={{ width: 626 }}>
                                <Select.Option value={true}>Sim</Select.Option>
                                <Select.Option value={false}>Não</Select.Option>
                            </Select>
                        </Form.Item>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 3 }}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Criar Unidade
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default CreateUnits;