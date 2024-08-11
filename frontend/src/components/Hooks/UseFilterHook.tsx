import { useState } from "react";

export const useFilterHook = () => {
  const [filter, setFilter] = useState<string | null>(null);

  const isFilterFoundInProperties = (...properties: (unknown | undefined)[]): boolean => {
    if (!filter) return true;

    return properties.some((property) => property && String(property).toLowerCase().includes(filter.toLowerCase()));
  };

  return {
    filter,
    setFilter,
    isFilterFoundInProperties,
  };
};
