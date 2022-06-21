import React from 'react';

export function useInterval(setTime, time, delay = 1000) {
    const savedCallback = React.useRef();

    React.useEffect(() => {
        savedCallback.current = setTime;
    }, [setTime]);

    React.useEffect(() => {
        function tick() {
            const updatedTime = {
                ...time,
                diff: time.diff + 1,
            };

            setTime(updatedTime);
        }

        if (delay !== null && time) {
            let id = setInterval(tick, delay);
            return () => {
                clearInterval(id);
            };
        }
    }, [delay, time]);
}
