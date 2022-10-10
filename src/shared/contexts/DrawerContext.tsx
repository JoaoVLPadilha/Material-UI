import React from 'react';
const DrawerContext = React.createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
  return React.useContext(DrawerContext);
};

interface IDrawerOption {
  icon: string;
  label: string;
  path: string;
}

interface IDrawerContextData {
  isDrawerOpen: boolean;
  drawerOptions: IDrawerOption[];
  toggleDrawerOpen: () => void;
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}
interface IAppDrawerProviderProps {
  children?: React.ReactNode;
}
export const AppDrawerProvider: React.FC<IAppDrawerProviderProps> = ({
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [drawerOptions, setDrawerOptions] = React.useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = React.useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  const handleSetDrawerOptions = React.useCallback(
    (newDrawerOptions: IDrawerOption[]) => {
      setDrawerOptions(newDrawerOptions);
    },
    [],
  );
  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerOptions,
        toggleDrawerOpen,
        setDrawerOptions: handleSetDrawerOptions,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
