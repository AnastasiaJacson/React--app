import { createContext, useContext } from "react";
import useDataStorage from "../reducers/data-reducer";
import { dataActions } from "../actions/data-actions";

const DataStorageContext = createContext('');
const useDataStorageContext = () => useContext(DataStorageContext);

const DataStorageProvider = ({children}) => {
  const [state, dispatch] = useDataStorage();

  return (
    <DataStorageContext.Provider
      value={{
        state,
        dispatch,
        dataActions
      }}>
        {children}
    </DataStorageContext.Provider>
  )
};

export default DataStorageProvider;
export {useDataStorageContext};
