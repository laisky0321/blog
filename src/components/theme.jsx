import React, { useState, useEffect } from 'react';

const DarkModeToggle = ({ DarkModeinit }) => {
    const [isDarkMode, setIsDarkMode] = useState(DarkModeinit);

    const toggleDarkMode = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode); // 使用 setState 更新状态

        // 更新 cookie
        document.cookie = `theme=${newTheme}; path=/; max-age=31536000`; // 设置 cookie 有效期为 1 年
        window.location.reload();
    
    };

    return (
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginRight: '10px' }}>
            <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                style={{ display: 'none' }}
            />
            <span
                style={{
                    width: '50px',
                    height: '25px',
                    background: isDarkMode ? '#1f1f1f' : '#ccc',
                    borderRadius: '25px',
                    position: 'relative',
                    transition: 'background 0.3s',
                }}
            >
                <span
                    style={{
                        position: 'absolute',
                        top: '2px',
                        left: isDarkMode ? '26px' : '2px',
                        width: '21px',
                        height: '21px',
                        background: '#fff',
                        borderRadius: '50%',
                        transition: 'left 0.3s',
                    }}
                ></span>
            </span>
        </label>
    );
};

export default DarkModeToggle;