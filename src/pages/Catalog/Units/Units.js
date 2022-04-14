import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import HelperText from '@iso/components/utility/helper-text';
import Modals from '@iso/components/Feedback/Modal';
import message from '@iso/components/Feedback/Message';
import { routeConstants } from '@iso/pages/Catalog/Units/UnitRoutes';
import CardWrapper, { Box } from '@iso/pages/Categories/Categories.styles';
import CustomHttpClient from "@iso/lib/helpers/customHttpClient";
import { Button, Table } from 'antd';

const confirm = Modals.confirm;

function showConfirm(modalContent, okHandler) {
    confirm({
        title: 'Вы действительно хотите удалить эту единицу измерения',
        content: modalContent,
        onOk: okHandler,
        onCancel() {},
        okText: 'Удалить',
        cancelText: 'Отмена',
    });
}

export default function Units() {
    const [units, setUnits] = useState([]);
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
            title: <IntlMessages id="page.units.table.column.name"/>,
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
            render: (text, unit) => (
                <div className="isoInvoiceBtnView">
                    <Link to={`${routeConstants['edit']}/${unit.id}`}>
                        <Button color="primary">
                            <i className="ion-edit" />
                        </Button>
                    </Link>
                    <Button
                        onClick={() => {
                            showConfirm(
                                `Будет удалена единица измерения "${unit.name}[ID: ${unit.id}]"`,
                                () => onDeleteModalConfirm(unit.id));
                        }}
                    >
                        <i className="ion-trash-a" />
                    </Button>
                </div>
            ),
        },
    ];

    const onDeleteModalConfirm = (id) => {
        CustomHttpClient.delete(`http://localhost:8080/admin-api/catalog/product-units/${id}`)
            .then(() => {
                message.success("Единица измерения успешно удалена!");
                getUnits({...pagination});
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    const handleTableChange = (pagination) => {
        getUnits({...pagination});
    };

    const getUnits = (params) => {
        setLoading(true);
        CustomHttpClient.get(`http://localhost:8080/admin-api/catalog/product-units?page=${params.current}&size=${params.pageSize}`)
            .then(data => {
                setPagination({
                    current: params.current,
                    pageSize: params.pageSize,
                    total: data.totalItems
                });
                setUnits(data.list.map(unit => ({...unit, key: unit.id})));
                setLoading(false);
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    useEffect(() => {
        getUnits({...pagination});
    }, []);

    return (
        <LayoutWrapper>
            <PageHeader>
                <IntlMessages id="page.units"/>
            </PageHeader>
            <Box>
                <div className="isoInvoiceTableBtn">
                    <Link to={routeConstants['add']}>
                        <Button type="primary">
                            <IntlMessages id="page.units.add"/>
                        </Button>
                    </Link>
                </div>

                <CardWrapper>
                    {units.length === 0 ? (
                        <HelperText text={<IntlMessages id="page.nodata"/>} />
                    ) : (
                        <div className="isoCategoriesTable">
                            <Table
                                columns={columns}
                                dataSource={units}
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
