// DataProvider.jsx
import  { createContext, useReducer } from 'react';
import { reducer, initialState } from '../../Utility/reduser';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;



