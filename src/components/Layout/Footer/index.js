import React from 'react';
import { Layout } from 'antd';
import './Footer.scss'

const { Footer: LayoutFooter } = Layout;

const Footer = () => {
    return (
        <LayoutFooter className="layout-footer">
            React后台管理系统 版权所有 © 2018 由 Jouryu 支持
        </LayoutFooter>
    )
};

export default Footer;