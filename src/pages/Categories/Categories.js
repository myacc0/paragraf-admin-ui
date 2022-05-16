import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import HelperText from '@iso/components/utility/helper-text';
import Modals from '@iso/components/Feedback/Modal';
import message from '@iso/components/Feedback/Message';
import CustomHttpClient from "@iso/lib/helpers/customHttpClient";
import { routeConstants } from '@iso/pages/Categories/CategoryRoutes';
import CardWrapper, { Box } from './Categories.styles';
import { Button, Table } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;
const confirm = Modals.confirm;

function showConfirm(modalContent, okHandler) {
    confirm({
        title: 'Вы действительно хотите удалить эту категорию',
        content: modalContent,
        onOk: okHandler,
        onCancel() {},
        okText: 'Удалить',
        cancelText: 'Отмена',
    });
}

export default function Categories() {
    const [categories, setCategories] = useState([]);
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
            title: <IntlMessages id="page.categories.table.column.name"/>,
            dataIndex: 'name',
            rowKey: 'name',
            width: '20%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: <IntlMessages id="page.categories.table.column.slug"/>,
            dataIndex: 'slug',
            rowKey: 'slug',
            width: '20%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: <IntlMessages id="page.categories.table.column.description"/>,
            dataIndex: 'description',
            rowKey: 'description',
            width: '35%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: <IntlMessages id="page.categories.table.column.parent"/>,
            dataIndex: 'parent',
            rowKey: 'parent',
            width: '10%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: '',
            dataIndex: 'actions',
            rowKey: 'actions',
            width: '10%',
            render: (text, category) => (
                <div className="isoInvoiceBtnView">
                    <Link to={`${routeConstants['edit']}/${category.id}`}>
                        <Button color="primary">
                            <i className="ion-edit" />
                        </Button>
                    </Link>
                    <Button
                        onClick={() => {
                            showConfirm(
                                `Будет удалена категория "${category.name}[ID: ${category.id}]"`,
                                () => onDeleteModalConfirm(category.id));
                        }}
                    >
                        <i className="ion-trash-a" />
                    </Button>
                </div>
            ),
        },
    ];

    const onDeleteModalConfirm = (id) => {
        CustomHttpClient.delete(`${API_URL}/categories/${id}`)
            .then(() => {
                message.success("Категория успешно удалена!");
                getCats({...pagination});
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    const handleTableChange = (pagination) => {
        getCats({...pagination});
    };

    const getCats = (params) => {
        setLoading(true);
        CustomHttpClient.get(`${API_URL}/categories?page=${params.current}&size=${params.pageSize}`)
            .then(data => {
                setPagination({
                    current: params.current,
                    pageSize: params.pageSize,
                    total: data.totalItems
                });
                setCategories(mapCategories(data.list));
                setLoading(false);
            });
    };

    const mapCategories = (cats) => {
        return cats.map(cat => ({
            ...cat,
            key: `cat${cat.id}`,
            parent: (cat.parent != null) ? cat.parent.name : ''
        }))
    };

    useEffect(() => {
        getCats({...pagination});
    }, []);

    return (
        <LayoutWrapper>
            <PageHeader>
                <IntlMessages id="page.categories"/>
            </PageHeader>
            <Box>
                <div className="isoInvoiceTableBtn">
                    <Link to={routeConstants['add']}>
                        <Button type="primary">
                            <IntlMessages id="page.categories.add"/>
                        </Button>
                    </Link>
                </div>

                <CardWrapper>
                    {categories.length === 0 ? (
                        <HelperText text={<IntlMessages id="page.nodata"/>} />
                    ) : (
                        <div className="isoCategoriesTable">
                            <Table
                                columns={columns}
                                dataSource={categories}
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
