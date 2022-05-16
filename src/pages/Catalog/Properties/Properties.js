import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import HelperText from '@iso/components/utility/helper-text';
import Modals from '@iso/components/Feedback/Modal';
import message from '@iso/components/Feedback/Message';
import CustomHttpClient from "@iso/lib/helpers/customHttpClient";
import CardWrapper, { Box } from '@iso/pages/Categories/Categories.styles';
import { routeConstants } from '@iso/pages/Catalog/Properties/PropertyRoutes';
import { Button, Table } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;
const confirm = Modals.confirm;

function showConfirm(modalContent, okHandler) {
    confirm({
        title: 'Вы действительно хотите удалить этот атрибут',
        content: modalContent,
        onOk: okHandler,
        onCancel() {},
        okText: 'Удалить',
        cancelText: 'Отмена',
    });
}

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [pagination, setPagination] = useState({current: 1, pageSize: 10, total: 0});
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            rowKey: 'id',
            width: '5%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: <IntlMessages id="page.properties.table.column.name"/>,
            dataIndex: 'name',
            rowKey: 'name',
            width: '20%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: <IntlMessages id="page.properties.table.column.slug"/>,
            dataIndex: 'slug',
            rowKey: 'slug',
            width: '20%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: <IntlMessages id="page.properties.table.column.category"/>,
            dataIndex: 'category',
            rowKey: 'category',
            width: '10%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: '',
            dataIndex: 'actions',
            rowKey: 'actions',
            width: '10%',
            render: (text, property) => (
                <div className="isoInvoiceBtnView">
                    <Link to={`${routeConstants['edit']}/${property.id}`}>
                        <Button color="primary">
                            <i className="ion-edit" />
                        </Button>
                    </Link>
                    <Button
                        onClick={() => {
                            showConfirm(
                                `Будет удален атрибут "${property.name}[ID: ${property.id}]"`,
                                () => onDeleteModalConfirm(property.id));
                        }}
                    >
                        <i className="ion-trash-a" />
                    </Button>
                </div>
            ),
        },
    ];

    const onDeleteModalConfirm = (id) => {
        CustomHttpClient.delete(`${API_URL}/catalog/properties/${id}`)
            .then(() => {
                message.success("Аттрибут успешно удален!");
                getProperties({...pagination});
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    const handleTableChange = (pagination) => {
        getProperties({...pagination});
    };

    const getProperties = (params) => {
        setLoading(true);
        CustomHttpClient.get(`${API_URL}/catalog/properties?page=${params.current}&size=${params.pageSize}`)
            .then(data => {
                setPagination({
                    current: params.current,
                    pageSize: params.pageSize,
                    total: data.totalItems
                });
                setProperties(mapProperties(data.list));
                setLoading(false);
            });
    };

    const mapProperties = (propList) => {
        return propList.map(pp => ({
            ...pp,
            key: `pp${pp.id}`,
            category: (pp.category != null) ? pp.category.name : ''
        }))
    };

    useEffect(() => {
        getProperties({...pagination});
    }, []);

    return (
        <LayoutWrapper>
            <PageHeader>
                <IntlMessages id="page.properties"/>
            </PageHeader>
            <Box>
                <div className="isoInvoiceTableBtn">
                    <Link to={routeConstants['add']}>
                        <Button type="primary">
                            <IntlMessages id="page.properties.add"/>
                        </Button>
                    </Link>
                </div>

                <CardWrapper>
                    {properties.length === 0 ? (
                        <HelperText text={<IntlMessages id="page.nodata"/>} />
                    ) : (
                        <div className="isoCategoriesTable">
                            <Table
                                columns={columns}
                                dataSource={properties}
                                pagination={pagination}
                                loading={loading}
                                onChange={handleTableChange}
                            />
                        </div>
                    )}
                </CardWrapper>
            </Box>
        </LayoutWrapper>
    );
}
