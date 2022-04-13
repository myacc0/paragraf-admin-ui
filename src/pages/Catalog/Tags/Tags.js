import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import HelperText from '@iso/components/utility/helper-text';
import Modals from '@iso/components/Feedback/Modal';
import message from '@iso/components/Feedback/Message';
import { routeConstants } from '@iso/pages/Catalog/Tags/TagRoutes';
import CardWrapper, { Box } from '@iso/pages/Categories/Categories.styles';
import { Button, Table } from 'antd';

const confirm = Modals.confirm;

function showConfirm(modalContent, okHandler) {
    confirm({
        title: 'Вы действительно хотите удалить этот тег',
        content: modalContent,
        onOk: okHandler,
        onCancel() {},
        okText: 'Удалить',
        cancelText: 'Отмена',
    });
}

export default function Tags() {
    const [tags, setTags] = useState([]);
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
            title: <IntlMessages id="page.tags.table.column.name"/>,
            dataIndex: 'name',
            rowKey: 'name',
            width: '20%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: <IntlMessages id="page.tags.table.column.slug"/>,
            dataIndex: 'slug',
            rowKey: 'slug',
            width: '20%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: '',
            dataIndex: 'actions',
            rowKey: 'actions',
            width: '10%',
            render: (text, tag) => (
                <div className="isoInvoiceBtnView">
                    <Link to={`${routeConstants['edit']}/${tag.id}`}>
                        <Button color="primary">
                            <i className="ion-edit" />
                        </Button>
                    </Link>
                    <Button
                        onClick={() => {
                            showConfirm(
                                `Будет удален тег "${tag.name}[ID: ${tag.id}]"`,
                                () => onDeleteModalConfirm(tag.id));
                        }}
                    >
                        <i className="ion-trash-a" />
                    </Button>
                </div>
            ),
        },
    ];

    const onDeleteModalConfirm = (id) => {
        fetch(`http://localhost:8080/admin-api/catalog/tags/${id}`, { method: 'DELETE' })
            .then(() => {
                message.success("Тег успешно удален!");
                getTags({...pagination});
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    const handleTableChange = (pagination) => {
        getTags({...pagination});
    };

    const getTags = (params) => {
        setLoading(true);
        fetch(`http://localhost:8080/admin-api/catalog/tags?page=${params.current}&size=${params.pageSize}`)
            .then(res => res.json())
            .then(data => {
                setPagination({
                    current: params.current,
                    pageSize: params.pageSize,
                    total: data.totalItems
                });
                setTags(data.list.map(tag => ({...tag, key: tag.id})));
                setLoading(false);
            });
    };

    useEffect(() => {
        getTags({...pagination});
    }, []);

    return (
        <LayoutWrapper>
            <PageHeader>
                <IntlMessages id="page.tags"/>
            </PageHeader>
            <Box>
                <div className="isoInvoiceTableBtn">
                    <Link to={routeConstants['add']}>
                        <Button type="primary">
                            <IntlMessages id="page.tags.add"/>
                        </Button>
                    </Link>
                </div>

                <CardWrapper>
                    {tags.length === 0 ? (
                        <HelperText text={<IntlMessages id="page.nodata"/>} />
                    ) : (
                        <div className="isoCategoriesTable">
                            <Table
                                columns={columns}
                                dataSource={tags}
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
