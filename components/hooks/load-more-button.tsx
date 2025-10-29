// useLoadMore.ts - Custom Hook with Static Data Support

"use client";
// hooks/useLoadMore.ts - Enhanced version that resets on data change
import { useState, useEffect } from "react";

interface UseLoadMoreOptions {
  initialCount?: number;
  incrementCount?: number;
  delay?: number;
}

interface UseLoadMoreReturn<T> {
  data: T[];
  displayCount: number;
  handleLoadMore: () => void;
  hasMore: boolean;
  totalItems: number;
  isLoading: boolean;
  resetCount: () => void; // Added reset function
}

export const useLoadMore = <T,>(
  initialData: T[],
  {
    initialCount = 6,
    incrementCount = 3,
    delay = 1000,
  }: UseLoadMoreOptions = {}
): UseLoadMoreReturn<T> => {
  const [displayCount, setDisplayCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  // Reset display count when initialData changes (category filter)
  useEffect(() => {
    setDisplayCount(initialCount);
  }, [initialData, initialCount]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, delay));
    setDisplayCount((prev) =>
      Math.min(prev + incrementCount, initialData.length)
    );
    setIsLoading(false);
  };

  const resetCount = () => {
    setDisplayCount(initialCount);
  };

  const hasMore = displayCount < initialData.length;

  return {
    data: initialData,
    displayCount,
    handleLoadMore,
    hasMore,
    isLoading,
    totalItems: initialData.length,
    resetCount,
  };
};

// FUTURE: When switching to API, just update the hook like this:
/*
// useLoadMoreAPI.ts - API version (for future use)
import { useState, useEffect } from 'react';

export const useLoadMoreAPI = <T,>(
  apiUrl: string,
  options?: UseLoadMoreOptions
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(options?.initialCount || 6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(Array.isArray(result) ? result : result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  const handleLoadMore = () => {
    setDisplayCount((prev) => 
      Math.min(prev + (options?.incrementCount || 3), data.length)
    );
  };

  return {
    data,
    displayCount,
    handleLoadMore,
    hasMore: displayCount < data.length,
    isLoading,
    error,
  };
};

// Then just switch in your component:
// const { data, displayCount, ... } = useLoadMoreAPI("/api/posts");
*/
