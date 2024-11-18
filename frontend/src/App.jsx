import React, { useEffect, useState } from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import Loading from './pages/Loading';
import ClusterManagement from "./pages/ClusterManagement";
import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Cluster from "./pages/Cluster";
import ClusterRule from "./pages/ClusterRule";

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

    if (loading) return <Loading />;

    return (
        <BrowserRouter>
            <div style={{ padding: '0 24px' }}>
                <Routes>
                    <Route path="/" element={<Navigate to="/overview" />} />
                    <Route path="/" element={<Home />}>
                        <Route path="overview" element={<Overview />} />
                        <Route path="clusters" element={<ClusterManagement />} />
                        <Route path="clusters/:id" element={<Cluster />} />
                        <Route path="clusters/:id/rules/:ruleId" element={<ClusterRule />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
