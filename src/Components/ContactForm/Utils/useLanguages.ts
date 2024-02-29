import { useCallback, useEffect, useState } from "react";
import { Option } from "../../Types/Option";
import { getLanguages } from "../api/useGetLanguages";

export const useLanguages = (
  searchTerm: string
): {
  isLoading: boolean;
  options: Option[] | undefined;
  error: Error | undefined;
  fetch: (searchTerm: string) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [error, setError] = useState<Error>();

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(undefined); // Clear any previous error

    try {
      const fetchedOptions = await getLanguages(searchTerm);
      setOptions(fetchedOptions);
      setIsLoading(false);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm !== undefined) {
      fetch();
    }
  }, [fetch, searchTerm]); // Fetch options when the component mounts

  return { isLoading, options, error, fetch };
};
