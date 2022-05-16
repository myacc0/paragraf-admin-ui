import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import message from '@iso/components/Feedback/Message';
import CustomHttpClient from "@iso/lib/helpers/customHttpClient";
import { Box } from '@iso/pages/Categories/Categories.styles';
import { routeConstants } from '@iso/pages/Catalog/Units/UnitRoutes';
import { Button, Form, Input } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;

export default function UnitAdd() {
    let history = useHistory();

    const saveUnits = (params) => {
        CustomHttpClient.post(`${API_URL}/catalog/product-units`, params)
            .then(data => {
                message.success(`Единица измерения "${data.name}" добавлена!`, 5);
                history.push(routeConstants['list']);
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    const onFinish = (values) => {
        console.log(values);
        saveUnits(values);
    };

    const validateMessages = {
        required: '${label} is required!'
    };

    return (
        <LayoutWrapper>
            <PageHeader>
                <IntlMessages id="page.units.add"/>
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
                      name="units"
                      onFinish={onFinish}
                      validateMessages={validateMessages}
                >
                    <Form.Item name="name" label={<IntlMessages id="page.units.form.label.name"/>} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 4, offset: 10 }}>
                        <Button type="primary" htmlType="submit">
                            <IntlMessages id="page.units.form.save"/>
                        </Button>
                    </Form.Item>
                </Form>
            </Box>
        </LayoutWrapper>
    );
}