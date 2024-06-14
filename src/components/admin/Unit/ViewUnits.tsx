import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import api from '../../../../axiosConfig';
import GenericModal from '../../generics/GenericModal';
import { Unit } from '../../../interfaces/Unit';
import { ColumnsType } from 'antd/es/table';

const ViewUnits: React.FC = () => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);
    const [loadingUnits, setLoadingUnits] = useState<boolean>(true);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await api.get<Unit[]>('/units/get-all');
                setUnits(response.data);
                setLoadingUnits(false);
            } catch (error) {
                console.error('Erro ao buscar unidades:', error);
                setLoadingUnits(false);
            }
        };

       

        fetchUnits();
    }, []);

    const handleEdit = (unit: Unit) => {
        setCurrentUnit(unit);
        setModalOpen(true);
        form.setFieldsValue({
            ...unit
        });
    };

    

    const handleConfirm = async () => {
        if (currentUnit && currentUnit.id){
            try {
                const updatedValues = await form.validateFields();
                
                const updatedUnit = {
                    ...currentUnit,
                    ...updatedValues
                };
                console.log(updatedUnit)
                const response = await api.put(`/units/edit/${updatedUnit.id}`, updatedUnit);
                alert("Unidade atualizada com sucesso");
                setModalOpen(false);
                setUnits(prevUnits => prevUnits.map(unit => unit.id === updatedUnit.id ? { ...updatedUnit, ...response.data } : unit));
            } catch (error) {
                alert("Erro ao atualizar a unidade");
                console.error('Erro ao atualizar a unidade:', error);
            }
        } else {
            alert("Erro: Unidade atual não possui um ID válido.");
        }
    };

    const columns: ColumnsType<Unit>  = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: 'Endereço',
            dataIndex: 'endereco',
            key: 'endereco',
            align: 'center'
        },
        {
            title: 'Franquia',
            dataIndex: 'franchised',
            key: 'franchised',
            align: 'center',
            render: (isFranchised: boolean) => isFranchised ? 'Sim' : 'Não'
        },
        {
            title: 'Editar',
            key: 'edit',
            align: 'center',
            render: (unit: Unit) => (
                <EditOutlined style={{ color: "blue", cursor: "pointer" }} onClick={() => handleEdit(unit)} />
            ),
        },
        
    ];

    return (
        <div className='container'>
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Visualizar Unidades</h1>
                <Table dataSource={units} columns={columns} rowKey="id" loading={loadingUnits} />
                {currentUnit && (
                    <GenericModal
                        isOpen={modalOpen}
                        toggle={() => setModalOpen(false)}
                        title="Editar Unidade"
                        onConfirm={handleConfirm}
                        confirmText="Salvar"
                        cancelText="Cancelar"
                    >
                        <Form layout="vertical" form={form} initialValues={currentUnit}>
                            <Form.Item label="Nome" name="name">
                                <Input />
                            </Form.Item>

                            <Form.Item label="Endereço" name="endereco">
                                <Input />
                            </Form.Item>

                            <Form.Item label="Franquia" name="franchised">
                                <Select>
                                    <Select.Option value={true}>Sim</Select.Option>
                                    <Select.Option value={false}>Não</Select.Option>
                                </Select>
                            </Form.Item>
                    
                        </Form>
                    </GenericModal>
                )}
            </div>
        </div>
    );
};

export default ViewUnits;
