import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import message from '@iso/components/Feedback/Message';
import CustomHttpClient from "@iso/lib/helpers/customHttpClient";
import { Box } from '@iso/pages/Categories/Categories.styles';
import { routeConstants } from '@iso/pages/StockOffice/StockOfficeRoutes';
import { Button, Form, Input } from 'antd';

export default function StockOfficeAdd() {
    let history = useHistory();

    const saveStockOffice = (params) => {
        CustomHttpClient.post(`http://localhost:8080/admin-api/catalog/stock-offices?name=${params.name}`, {})
            .then(data => {
                message.success(`Склад "${data.name}" добавлен!`, 5);
                history.push(routeConstants['list']);
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    const onFinish = (values) => {
        console.log(values);
        saveStockOffice(values);
    };

    const validateMessages = {
        required: '${label} is required!'
    };

    return (
        <LayoutWrapper>
            <PageHeader>
                <IntlMessages id="page.stockoffice.add"/>
            </PageHeader>
            <Box>
                <div className="isoInvoiceTableBtn">
                    <Link to={routeConstants['list']}>
                        <Button type="primary" className="mateAddInvoiceBtn">
                            <IntlMessages id="page.back"/>
                        </Button>
                    </Link>
                </div>

                <Form labelCol={{ span: 4 }}
                      wrapperCol={{ span: 14 }}
                      layout="horizontal"
                      name="stockoffice"
                      onFinish={onFinish}
                      validateMessages={validateMessages}
                >
                    <Form.Item name="name" label={<IntlMessages id="page.stockoffice.form.label.name"/>} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 4, offset: 10 }}>
                        <Button type="primary" htmlType="submit">
                            <IntlMessages id="page.stockoffice.form.save"/>
                        </Button>
                    </Form.Item>
                </Form>
            </Box>
        </LayoutWrapper>
    );
}