import React, {useEffect, useState} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import message from '@iso/components/Feedback/Message';
import CustomHttpClient from "@iso/lib/helpers/customHttpClient";
import { routeConstants } from '@iso/pages/Categories/CategoryRoutes';
import { Box } from './Categories.styles';
import { Button, Form, Input, Select } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;

export default function CategoryEdit() {
    let history = useHistory();
    let { id } = useParams();
    const form = Form.useForm()[0];

    const [category, setCategory] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (id) getCategoryById(id);
    }, [id]);

    useEffect(() => {
        getCategories({page: 1, size: 100});
    }, []);

    useEffect(() => {
        form.setFieldsValue(category);
    }, [category, categories, form]);

    const getCategoryById = (id) => {
        CustomHttpClient.get(`${API_URL}/categories/${id}`)
            .then(data => {
                setCategory({
                    name: data.name,
                    slug: data.slug,
                    description: data.description,
                    parent: data.parent != null ? data.parent.id : null
                });
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    const getCategories = (params) => {
        let queryParams = `?page=${params.page}&size=${params.size}`;
        if (params.name != null) queryParams += `&name=${params.name}`;
        CustomHttpClient.get(`${API_URL}/categories?${queryParams}`)
            .then(data => {
                setCategories(data.list.map(cat => ({ key: `cat${cat.id}`, id: cat.id, name: cat.name })));
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    const saveCategory = (params) => {
        CustomHttpClient.post(`${API_URL}/categories/${id}`, params)
            .then(data => {
                message.success(`Категория "${data.name}" изменена!`, 5);
                history.push(routeConstants['list']);
            })
            .catch(error => message.error(`Ошибка: ${error}`));
    };

    const onFinish = (values) => {
        console.log(values);
        saveCategory(values);
    };

    const validateMessages = {
        required: '${label} is required!'
    };

    return (
        <LayoutWrapper>
            <PageHeader>
                <IntlMessages id="page.categories.edit"/>
            </PageHeader>
            <Box>
                <div className="isoInvoiceTableBtn">
                    <Link to={routeConstants['list']}>
                        <Button type="primary" className="mateAddInvoiceBtn">
                            <IntlMessages id="page.back"/>
                        </Button>
                    </Link>
                </div>

                <Form form={form}
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 14 }}
                      layout="horizontal"
                      name="category"
                      onFinish={onFinish}
                      validateMessages={validateMessages}
                >
                    <Form.Item name="name" label={<IntlMessages id="page.categories.form.label.name"/>} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="slug" label={<IntlMessages id="page.categories.form.label.slug"/>} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="parent" label={<IntlMessages id="page.categories.form.label.parent"/>}>
                        <Select
                            showSearch
                            placeholder="Select a parent category"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {categories.map(c => (
                                <Select.Option key={c.key} value={c.id}>
                                    {c.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="description" label={<IntlMessages id="page.categories.form.label.description"/>}>
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 4, offset: 10 }}>
                        <Button type="primary" htmlType="submit">
                            <IntlMessages id="page.categories.form.save"/>
                        </Button>
                    </Form.Item>
                </Form>
            </Box>
        </LayoutWrapper>
    );
}