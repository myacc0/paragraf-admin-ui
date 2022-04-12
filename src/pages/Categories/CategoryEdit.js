import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import HelperText from '@iso/components/utility/helper-text';
import CardWrapper, { Box } from './Categories.styles';
import { Button, Table } from 'antd';

export default function CategoryEdit() {
    return (
        <LayoutWrapper>
            <PageHeader>
                <IntlMessages id="page.categories.edit"/>
            </PageHeader>
            <Box>
            </Box>
        </LayoutWrapper>
    );
}