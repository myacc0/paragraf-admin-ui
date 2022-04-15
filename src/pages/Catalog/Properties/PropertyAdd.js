import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import message from '@iso/components/Feedback/Message';
import CustomHttpClient from "@iso/lib/helpers/customHttpClient";
import { Box } from '@iso/pages/Categories/Categories.styles';
import { routeConstants } from '@iso/pages/Catalog/Properties/PropertyRoutes';
import { Button, Form, Input, Select } from 'antd';

export default function PropertyAdd() {
    let history = useHistory();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCats({page: 1, size: 100});
    }, []);

    const getCats = (params) => {
        let queryParams = `?page=${params.page}&size=${params.size}`;
        if (params.name != null) queryParams += `&name=${params.name}`;
        CustomHttpClient.get(`http://localhost:8080/admin-api/categories?${queryParams}`)
            .then(data => {
                setCategories(data.list.map(cat => ({ key: `cat${cat.id}`, id: cat.id, name: cat.name })));
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    const saveProperty = (params) => {
        CustomHttpClient.post('http://localhost:8080/admin-api/catalog/properties', params)
            .then(data => {
                message.success(`Атрибут "${data.name}" добавлен!`, 5);
                history.push(routeConstants['list']);
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    const onFinish = (values) => {
        console.log(values);
        saveProperty(values);
    };

    const validateMessages = {
        required: '${label} is required!'
    };

    return (
        <LayoutWrapper>
            <PageHeader>
                <IntlMessages id="page.properties.add"/>
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
                      name="property"
                      onFinish={onFinish}
                      validateMessages={validateMessages}
                >
                    <Form.Item name="name" label={<IntlMessages id="page.properties.form.label.name"/>} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="slug" label={<IntlMessages id="page.properties.form.label.slug"/>} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="categoryId" label={<IntlMessages id="page.properties.form.label.category"/>}>
                        <Select
                            showSearch
                            placeholder="Select a category"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {categories.map(c => (<Select.Option key={c.key} value={c.id}>{c.name}</Select.Option>))}
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 4, offset: 10 }}>
                        <Button type="primary" htmlType="submit">
                            <IntlMessages id="page.properties.form.save"/>
                        </Button>
                    </Form.Item>
                </Form>
            </Box>
        </LayoutWrapper>
    );
}