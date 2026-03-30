import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext({
  isLoading: true,
  setIsLoading: (val: boolean) => {}
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
