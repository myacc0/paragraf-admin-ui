import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import { routeConstants } from '@iso/pages/Categories/CategoryRoutes';
import { Box } from './Categories.styles';
import { Button, Form, Input, Select } from 'antd';

export default function CategoryAdd() {
    let history = useHistory();
    const [categories, setCategories] = useState([]);
    const [selectedCat, setSelectedCat] = useState(null);

    useEffect(() => {
        getCats({page: 1, size: 100});
    }, []);

    const getCats = (params) => {
        let queryParams = `?page=${params.page}&size=${params.size}`;
        if (params.name != null) queryParams += `&name=${params.name}`;
        fetch(`http://localhost:8080/admin-api/categories?${queryParams}`)
            .then(res => res.json())
            .then(data => {
                setCategories(data.list.map(cat => ({ key: `cat${cat.id}`, id: cat.id, name: cat.name })));
            });
    };

    const saveCategory = (params) => {
        fetch('http://localhost:8080/admin-api/categories', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(params)
        })
            .then(res => res.json())
            .then(data => {
                history.push(routeConstants['list']);
            });
    };

    function onChange(value) {
        console.log(`selected ${value}`);
        setSelectedCat(value);
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    const onFinish = (values) => {
        values = {...values, parent: selectedCat};
        console.log(values);
        saveCategory(values);
    };

    const validateMessages = {
        required: '${label} is required!'
    };

    return (
        <LayoutWrapper>
            <PageHeader>
                <IntlMessages id="page.categories.add"/>
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

                    <Form.Item label={<IntlMessages id="page.categories.form.label.parent"/>}>
                        <Select
                            showSearch
                            name="parent"
                            placeholder="Select a parent category"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {categories.map(c => (<Select.Option key={c.key} value={c.id}>{c.name}</Select.Option>))}
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