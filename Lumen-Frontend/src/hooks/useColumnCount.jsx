import { CircularProgress } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

function useColumnCount() {

    const getColumnCount = (() => {
        if (window.matchMedia("(min-width: 1024px)").matches) return 3
        if (window.matchMedia("(min-width: 640px)").matches) return 2
        else return 1
    });
    const [colCount, setColCount] = useState(getColumnCount)



    useEffect(() => {
        const handler = () => setColCount(getColumnCount())
        const desktop = window.matchMedia("(min-width: 1024px)");
        const tablet = window.matchMedia("(min-width: 640px)");

        desktop.addEventListener('change', handler);
        tablet.addEventListener('change', handler);
        return () => {
            desktop.removeEventListener('change', handler);
            tablet.removeEventListener('change', handler);
        };

    }, []);

    return colCount;
}

export default useColumnCount;