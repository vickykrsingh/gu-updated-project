import { createContext, useContext, useState } from "react";

const AddressContext = createContext();

const AddressProvider = ({ children }) => {
  const [currentAddress, setCurrentAddress] = useState({});

  return (
    <AddressContext.Provider value={{currentAddress, setCurrentAddress}}>
      {children}
    </AddressContext.Provider>
  );
};

const useAddress = () => useContext(AddressContext);

export { useAddress, AddressProvider };
