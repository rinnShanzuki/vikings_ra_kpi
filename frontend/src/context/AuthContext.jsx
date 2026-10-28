import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AVAILABLE_ROLES = [
  'Manager',
  'Accounting',
  'Authorized Staff',
  'Administrator'
];

export function AuthProvider({ children }) {
  const [role, setRoleState] = useState(() => {
    return localStorage.getItem('vikings-demo-role') || 'Manager';
  });

  const setRole = (newRole) => {
    if (AVAILABLE_ROLES.includes(newRole)) {
      setRoleState(newRole);
      localStorage.setItem('vikings-demo-role', newRole);
    }
  };

  const isManager = role === 'Manager';
  const isAccounting = role === 'Accounting';
  const isStaff = role === 'Authorized Staff';
  const isAdmin = role === 'Administrator';

  const hasPermission = (...allowedRoles) => {
    return allowedRoles.includes(role);
  };

  const value = {
    role,
    setRole,
    availableRoles: AVAILABLE_ROLES,
    isManager,
    isAccounting,
    isStaff,
    isAdmin,
    hasPermission
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
