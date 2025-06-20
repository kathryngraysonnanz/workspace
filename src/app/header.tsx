'use client'

import React from 'react';
import { AppBar } from '@progress/kendo-react-layout';

const Header = () => {
    return (
        <AppBar style={{ backgroundColor: '#0072B8', padding: '10px' }}>
            <div style={{ color: '#ffffff', fontSize: '20px', textAlign: 'center' }}>
                Welcome to Your Workspace!
            </div>
        </AppBar>
    );
}

export default Header;