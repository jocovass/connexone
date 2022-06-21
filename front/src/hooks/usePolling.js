import React from 'react';

export const usePolling = (callback, delay = 30) => {
    const savedCallback = React.useRef();

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        let id;
        const tick = async () => {
            try {
                typeof savedCallback.current === 'function' &&
                    (await savedCallback.current());

                id = setTimeout(tick, 1000 * delay);
            } catch (error) {
                console.error(error);
            }
        };
        tick();
        return () => id && clearTimeout(id);
    }, [delay]);
};
