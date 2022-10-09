import React from 'react';
interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}
const DrawerContext = React.createContext({} as IDrawerContextData);

export const useAppDrawerContext = () =>{
  return React.useContext(DrawerContext)
}

interface IAppDrawerProviderProps {
  children?: React.ReactNode;
}
export const AppDrawerProvider: React.FC<IAppDrawerProviderProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

  const toggleDrawerOpen = React.useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);
  return (
    <DrawerContext.Provider value={{isDrawerOpen,toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
