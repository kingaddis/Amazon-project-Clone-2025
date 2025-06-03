

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import DataProvider from './components/DataProvider/DataProvider.jsx';
import {initialState,reducer} from './Utility/reduser.jsx'

createRoot(document.getElementById('root')).render(
  
    <DataProvider reducer={reducer}initialState={initialState}> 
      <App />
    </DataProvider>
  
);


