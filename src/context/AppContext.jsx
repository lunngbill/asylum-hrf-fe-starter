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


  const getFiscalData = async () => {
    // TODO: Replace this with functionality to retrieve the data from the fiscalSummary endpoint
    const res = await axios.get(`${API_BASE}/fiscalSummary`);
    return res.data?.yearResults ?? []
  };


  const getCitizenshipResults = async () => {
    // TODO: Replace this with functionality to retrieve the data from the citizenshipSummary endpoint
    const res = await axios.get(`${API_BASE}/citizenshipSummary`);
    return Array.isArray(res.data) ? res.data : [];
  };


  const updateQuery = () => {
    setIsDataLoading(true);
  };

  const fetchData = async () => {
    // TODO: fetch all the required data and set it to the graphData state
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
    fetchData();
  }, []);

  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

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