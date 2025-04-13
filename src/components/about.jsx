import { useState } from 'react';

const About = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
            {isDropdownOpen ? (
                <div
                    className="dropdown"
                    style={{
                        position: 'absolute', 
                        top: '50px',
                        right: '5px', 
                        backgroundColor: 'white',
                        border: '1px solid #ccc', 
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px',
                        padding: '10px',
                        zIndex: 1000,
                    }}
                >
                    <h3>About Me</h3>
                    <p>山川是不卷收的画卷，日月为你掌灯伴读。</p>
                    <hr />
                    <p>Email: laiweimin0321@gmail.com</p>
                    <p>GitHub: <a href="https://github.com/laisky0321" target="_blank" rel="noopener noreferrer">laisky0321</a></p>
                </div>
            ) : null}
            <div className="about" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                <img
                    src="/img/avatar.webp" 
                    alt="Avatar"
                    style={{ borderRadius: '50%', width: '36px', height: '36px', marginRight: '5px' }}
                />
                {isDropdownOpen ? (
                    <img
                        src="/img/down.svg" 
                        style={{ width: '24px', height: '24px', transform: "scale(1, -1)", transformOrigin: "center" }}
                    />
                ) : (
                    <img
                        src="/img/down.svg" 
                        style={{ width: '24px', height: '24px' }}
                    />
                )}
            </div>
        </div>
    );
};

export default About;