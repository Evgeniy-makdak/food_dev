// src/app/store/index.ts
import { RootStore } from './RootStore';
import { createContext } from 'react';

const store = new RootStore();


export const StoreContext = createContext(store);


// declare global {
//   interface Window {
//     store: RootStore;
//   }
// }

// window.store = store;

export default store;