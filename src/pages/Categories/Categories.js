import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import HelperText from '@iso/components/utility/helper-text';
import { routeConstants } from '@iso/pages/Categories/CategoryRoutes';
import CardWrapper, { Box } from './Categories.styles';
import { Button, Table } from 'antd';

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
            width: '25%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: <IntlMessages id="page.categories.table.column.slug"/>,
            dataIndex: 'slug',
            rowKey: 'slug',
            width: '22%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: <IntlMessages id="page.categories.table.column.description"/>,
            dataIndex: 'desc',
            rowKey: 'desc',
            width: '35%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: <IntlMessages id="page.categories.table.column.parent"/>,
            dataIndex: 'parent',
            rowKey: 'parent',
            width: '13%',
            render: (text) => <span>{text}</span>,
        },
        // {
        //     title: '',
        //     dataIndex: 'view',
        //     rowKey: 'view',
        //     width: '10%',
        //     render: (text, invoice) => (
        //         <div className="isoInvoiceBtnView">
        //             <Link to={`${match.path}/${invoice.id}`}>
        //                 <Button color="primary" className="invoiceViewBtn">
        //                     View
        //                 </Button>
        //             </Link>{' '}
        //             <Button
        //                 className="invoiceDltBtn"
        //                 // icon="delete"
        //                 onClick={() => {
        //                     notification('error', '1 invoice deleted');
        //                     dispatch(deleteInvoice([invoice.key]));
        //                     setSelected([]);
        //                 }}
        //             >
        //                 <i className="ion-android-delete" />
        //             </Button>
        //         </div>
        //     ),
        // },
    ];

    const handleTableChange = (pagination) => {
        getCats({...pagination});
    };

    const getCats = (params) => {
        setLoading(true);
        fetch(`http://localhost:8080/admin-api/categories?page=${params.current}&size=${params.pageSize}`)
            .then(res => res.json())
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
                        <Button type="primary" className="mateAddInvoiceBtn">
                            <IntlMessages id="page.categories.add"/>
                        </Button>
                    </Link>
                </div>

                <CardWrapper title="Categories">
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
