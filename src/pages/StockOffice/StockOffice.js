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
import { routeConstants } from '@iso/pages/StockOffice/StockOfficeRoutes';
import { Button, Table } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;
const confirm = Modals.confirm;

function showConfirm(modalContent, okHandler) {
    confirm({
        title: 'Вы действительно хотите удалить этот склад',
        content: modalContent,
        onOk: okHandler,
        onCancel() {},
        okText: 'Удалить',
        cancelText: 'Отмена',
    });
}

export default function StockOffice() {
    const [so, setSo] = useState([]);
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
            title: <IntlMessages id="page.stockoffice.table.column.name"/>,
            dataIndex: 'name',
            rowKey: 'name',
            width: '20%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: '',
            dataIndex: 'actions',
            rowKey: 'actions',
            width: '10%',
            render: (text, so) => (
                <div className="isoInvoiceBtnView">
                    <Link to={`${routeConstants['edit']}/${so.id}`}>
                        <Button color="primary">
                            <i className="ion-edit" />
                        </Button>
                    </Link>
                    <Button
                        onClick={() => {
                            showConfirm(
                                `Будет удален склад "${so.name}[ID: ${so.id}]"`,
                                () => onDeleteModalConfirm(so.id));
                        }}
                    >
                        <i className="ion-trash-a" />
                    </Button>
                </div>
            ),
        },
    ];

    const onDeleteModalConfirm = (id) => {
        CustomHttpClient.delete(`${API_URL}/catalog/stock-offices/${id}`)
            .then(() => {
                message.success("Склад успешно удален!");
                getStockOffices({...pagination});
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    const handleTableChange = (pagination) => {
        getStockOffices({...pagination});
    };

    const getStockOffices = (params) => {
        setLoading(true);
        CustomHttpClient.get(`${API_URL}/catalog/stock-offices?page=${params.current}&size=${params.pageSize}`)
            .then(data => {
                setPagination({
                    current: params.current,
                    pageSize: params.pageSize,
                    total: data.totalItems
                });
                setSo(data.list.map(so => ({...so, key: so.id})));
                setLoading(false);
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    useEffect(() => {
        getStockOffices({...pagination});
    }, []);

    return (
        <LayoutWrapper>
            <PageHeader>
                <IntlMessages id="page.stockoffice"/>
            </PageHeader>
            <Box>
                <div className="isoInvoiceTableBtn">
                    <Link to={routeConstants['add']}>
                        <Button type="primary">
                            <IntlMessages id="page.stockoffice.add"/>
                        </Button>
                    </Link>
                </div>

                <CardWrapper>
                    {so.length === 0 ? (
                        <HelperText text={<IntlMessages id="page.nodata"/>} />
                    ) : (
                        <div className="isoCategoriesTable">
                            <Table
                                columns={columns}
                                dataSource={so}
                                pagination={pagination}
                                loading={loading}
                                onChange={handleTableChange}
                            />
                        </div>
                    )}
                </CardWrapper>
            </Box>
        </LayoutWrapper>
    )
}
