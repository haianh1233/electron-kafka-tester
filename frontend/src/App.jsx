import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from './LoadingPage';
import HomePage from "./HomePage";

const BACKEND_HEALTH_URL = 'http://localhost:8080/api/v1/health';
const INITIAL_DELAY = 2_000;

const App = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkHealth = async (retries = 10, interval = 1000) => {
        let attempts = 0;
        while (attempts < retries) {
            try {
                const response = await axios.get(BACKEND_HEALTH_URL);
                if (response.status === 200) {
                    setLoading(false);
                    return;
                }
            } catch (error) {
                attempts += 1;
                await new Promise(resolve => setTimeout(resolve, interval));
            }
        }

        setError("Backend failed to start after multiple attempts.");
    };

    useEffect(() => {
        const startHealthCheckWithDelay = () => {
            setTimeout(() => {
                checkHealth();
            }, INITIAL_DELAY);
        };

        startHealthCheckWithDelay();
    }, []);

    if (loading) return <LoadingPage />;

    return (
        <HashRouter>
            <div style={{ padding: '0 24px' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
        </HashRouter>
    );
};

export default App;
