import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SystemConfig {
  theme: 'light' | 'dark';
  language: 'en' | 'id';
  refreshInterval: number;
  mapProvider: 'openstreetmap' | 'google';
}

interface SystemConfigContextType {
  config: SystemConfig;
  updateConfig: (updates: Partial<SystemConfig>) => void;
}

const SystemConfigContext = createContext<SystemConfigContextType | undefined>(undefined);

const defaultConfig: SystemConfig = {
  theme: 'light',
  language: 'en',
  refreshInterval: 5000,
  mapProvider: 'openstreetmap'
};

export function SystemConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SystemConfig>(defaultConfig);

  const updateConfig = (updates: Partial<SystemConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  return (
    <SystemConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </SystemConfigContext.Provider>
  );
}

export function useSystemConfig() {
  const context = useContext(SystemConfigContext);
  if (context === undefined) {
    throw new Error('useSystemConfig must be used within a SystemConfigProvider');
  }
  return context;
}