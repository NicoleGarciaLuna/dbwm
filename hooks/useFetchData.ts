import { useState, useEffect } from "react";

const useFetchData = (fetchDataFunction: () => Promise<any[] | null>) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDataFunction();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [fetchDataFunction]);

  return { loading, data };
};

export default useFetchData;
