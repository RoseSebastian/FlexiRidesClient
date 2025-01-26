import React, { useState } from 'react';
import '../styles/ThemeToggle.css';

const ThemeToggle = ({handleChange, isChecked}) => {

    return (
        <div className="toggle-container">
            <label className="switch">
                <input type="checkbox" checked={isChecked} onChange={handleChange} />
                <span className="slider round"></span>
            </label>
            <label className="toggle-label">Dark Mode</label>
        </div>
    );
};

export default ThemeToggle;