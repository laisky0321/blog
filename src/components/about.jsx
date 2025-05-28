import { useState } from 'react';

const About = ({DarkModeinit}) => {
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
                        // Background: Use a slightly less saturated dark/light.
                        // Add a semi-transparent alpha for the backdrop-filter to work effectively.
                        backgroundColor: DarkModeinit ? 'rgba(31, 31, 31, 0.85)' : 'rgba(255, 255, 255, 0.85)',

                        // Border: Make it subtle. Consider removing or making it very faint.
                        // For a premium feel, rely more on shadow and background rather than a hard border.
                        border: DarkModeinit ? '1px solid rgba(68, 68, 68, 0.5)' : '1px solid rgba(220, 220, 220, 0.7)',

                        // Box Shadow: More sophisticated shadows often use multiple layers or softer values.
                        boxShadow: DarkModeinit
                            ? '0 6px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)' // Deeper, layered shadow for dark mode
                            : '0 6px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)', // Lighter, layered shadow for light mode

                        borderRadius: '12px', // Slightly more rounded corners for a softer look
                        padding: '16px 20px', // Slightly increased padding for better spacing and breathing room
                        zIndex: 1000,

                        // Text Color: Ensure good contrast and a pleasant shade.
                        color: DarkModeinit ? '#E0E0E0' : '#333333', // Softer white/dark grey for text

                        // Add the backdrop-filter for the "frosted glass" effect
                        backdropFilter: 'blur(3px)', // Increased blur for a more pronounced effect
                        WebkitBackdropFilter: 'blur(3px)', // For Safari compatibility

                        // Optional: Add a smooth transition for background and shadow on hover/focus if it's interactive
                        // transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                >
                    <h1>About Me</h1>
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
                        src={DarkModeinit ? "/img/down_dark.svg" : "/img/down.svg"} 
                        style={{ width: '24px', height: '24px', transform: "scale(1, -1)", transformOrigin: "center" }}
                    />
                ) : (
                    <img
                        src={DarkModeinit ? "/img/down_dark.svg" : "/img/down.svg"} 
                        style={{ width: '24px', height: '24px' }}
                    />
                )}
            </div>
        </div>
    );
};

export default About;