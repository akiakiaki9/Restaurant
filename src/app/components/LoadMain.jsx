'use client';
import React, { useState, useEffect } from 'react';

export default function LoadMain() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Имитация загрузки в течение 3 секунд
        setTimeout(() => {
            setLoading(false);
        }, 300);
    }, []);

    return (
        <div>
            {loading ? (
                <div className="loadermain-container">
                    <div className="loadermain-background"></div>
                    <div className="loadermain">
                        {/* Заменено с текста на CSS спиннер */}
                        <div className="spinner"></div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
