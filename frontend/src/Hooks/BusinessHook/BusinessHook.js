import { useEffect, useState } from "react";
import { businessApi } from "../../Api/BusinessApi/BusinessApi";

const useBusiness = () => {
  const [business, setBusiness] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      setLoading(true);
      try {
        const response = await businessApi();
        setBusiness(response.data.businesses);
      } catch (error) {
        // Capture only the message or a default message if none exists
        setError(error?.message || "Failed to fetch business data.");
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, []);

  return { business, loading, error };
};

export default useBusiness;
