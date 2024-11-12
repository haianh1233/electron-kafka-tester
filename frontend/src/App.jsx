import React from 'react';
import { Button, Space, DatePicker, version } from 'antd';
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom'; // Import HashRouter, Routes, and useNavigate

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Home</h2>
            <Space>
                <DatePicker />
                <Button type="primary">Primary Button</Button>
                <Button onClick={() => navigate('/about')}>Go to About</Button>
            </Space>
        </div>
    );
};

const About = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>About</h2>
            <p>This is the about page.</p>
            <Button onClick={() => navigate('/')}>Go to Home</Button>
        </div>
    );
};

const App = () => (
    <HashRouter>
        <div style={{ padding: '0 24px' }}>
            <h1>antd version: {version}</h1>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    </HashRouter>
);

export default App;
