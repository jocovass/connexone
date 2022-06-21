import React from 'react';
import { getTime } from '../services/metrics';
import { usePolling } from '../hooks/usePolling';
import { useInterval } from '../hooks/useInterval';
import { formatTime } from '../utils';

export const Time = () => {
    const [time, setTime] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const getTimeHandler = async () => {
        try {
            setLoading(true);
            const res = await getTime();
            const currentTime = Math.floor(Date.now() / 1000);
            const diff = currentTime - res.epoch;
            const nextTime = {
                serverTime: res.epoch,
                diff,
            };

            setTime(nextTime);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    usePolling(getTimeHandler);
    useInterval(setTime, time);

    return (
        <div>
            {loading && <div className="loader">Loading...</div>}
            {time && (
                <>
                    <p>Server time: {time.serverTime}</p>
                    <p>Difference: {formatTime(time.diff)}</p>
                </>
            )}
        </div>
    );
};
