import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});

const API_BASE = 'https://asylum-be.onrender.com';

/**
 * TODO: Ticket 2:
 * - Use axios to fetch the data
 * - Store the data
 * - Populate the graphs with the stored data
 */
const useAppContextProvider = () => {
  const [graphData, setGraphData] = useState({
    yearResults: [],
    citizenshipResults: [],
  });

  const [isDataLoading, setIsDataLoading] = useState(false);

  useLocalStorage({ graphData, setGraphData });

  // 🔹 PRESERVED FUNCTION
  const getFiscalData = async () => {
    const res = await axios.get(`${API_BASE}/fiscalSummary`);
    return Array.isArray(res.data) ? (res.data) : [];
  };

  // 🔹 PRESERVED FUNCTION
  const getCitizenshipResults = async () => {
    const res = await axios.get(`${API_BASE}/citizenshipSummary`);
    return Array.isArray(res.data) ? res.data : [];
  };

  // 🔹 PRESERVED FUNCTION
  const updateQuery = () => {
    setIsDataLoading(true);
  };

  // 🔹 PRESERVED FUNCTION
  const fetchData = async () => {
    try {
      const [yearResults, citizenshipResults] = await Promise.all([
        getFiscalData(),
        getCitizenshipResults(),
      ]);

      setGraphData({
        yearResults,
        citizenshipResults,
      });
    } catch (error) {
      console.error('Error fetching API data', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const clearQuery = () => {
    setGraphData({
      yearResults: [],
      citizenshipResults: [],
    });
  };

  const getYears =
    () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  // Initial load (replaces test_data.json behavior)
  useEffect(() => {
    fetchData();
  }, []);

  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}