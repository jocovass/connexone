import React from 'react';
import { getMetrics } from '../services/metrics';
import { usePolling } from '../hooks/usePolling';

export const Metrics = () => {
    const [metrics, setMetrics] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const getMetricsHandler = async () => {
        try {
            setLoading(true);
            const res = await getMetrics();
            setMetrics(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    usePolling(getMetricsHandler);

    return (
        <div>
            {loading && <div className="loader">Loading...</div>}
            <pre>{metrics}</pre>
        </div>
    );
};
