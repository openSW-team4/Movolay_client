import React from 'react';
import Loginform from './loginform';

export function Login() {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh", color:"white"}}>
        <div style={{ width: "10000px", textAlign: "center" }}>
          <h2>Login Page</h2>
          <Loginform />
        </div>
      </div>
    );
}