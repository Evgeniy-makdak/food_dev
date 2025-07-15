// src/app/providers/StoreProvider.tsx

import React from 'react';
import { RootStore } from '../../shared/store/RootStore';
import { StoreContext } from '../../shared/store';

const store = new RootStore();

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StoreContext.Provider value= { store } >
  { children }
  </StoreContext.Provider>
);