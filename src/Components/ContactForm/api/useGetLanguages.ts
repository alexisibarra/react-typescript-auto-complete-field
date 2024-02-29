import { Option } from "../../Types/Option";
import { options } from "./Options";

export const getLanguages = async (searchTerm: string): Promise<Option[]> => {
  // Simulate a network request that returns a promise (replace with actual logic)
  return new Promise<Option[]>((resolve) => {
    setTimeout(() => {
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );

      resolve(filteredOptions);
    }, 1 * 1000); // Delay for 1 second
  });
};
