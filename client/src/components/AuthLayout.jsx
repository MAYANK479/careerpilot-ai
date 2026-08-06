import React from 'react';
import { Outlet } from 'react-router-dom';

// Simple Auth Layout using ScoutMind CSS classes
export default function AuthLayout() {
  return (
    <div className="auth-layout-container">
      <div className="auth-card-frame">
        {/* Left panel can hold form, right panel can hold image/illustration */}
        <div className="auth-left-panel">
          <Outlet />
        </div>
        <div className="auth-right-panel">
          {/* Placeholder for image or branding */}
          <div className="auth-image-container">
            {/* Add an illustrative image if desired */}
          </div>
        </div>
      </div>
    </div>
  );
}
