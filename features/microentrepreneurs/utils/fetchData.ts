import { useState, useEffect } from "react";
import { fetchPersonasConDatos } from "./fetchTable";
import { MicroentrepreneurTableProps } from "@/features/microentrepreneurs/types";

const useFetchPersonas = () => {
  const [data, setData] = useState<MicroentrepreneurTableProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const formattedData = await fetchPersonasConDatos();
        if (formattedData) {
          setData(formattedData);
          setError(null);
        }
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return { data, isLoading, error };
};

export default useFetchPersonas;
