import React, { useEffect, useRef, useState } from "react";

export interface SearchItem {
  label: string;
  value: any;
}

interface SearchComponentProps {
  items: SearchItem[];
  searchLabel: string;
  name: string;
  onClick: (value: any) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ items, name, searchLabel, onClick }) => {
  const [query, setQuery] = useState("");
  const [isListVisible, setIsListVisible] = useState(false);
  const [filteredItems, setFilteredItems] = useState<SearchItem[]>([]);
  const ulRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    const isClickOutside = ulRef?.current && !ulRef.current.contains(event.target as Node);

    if (isClickOutside) {
      setIsListVisible(false);
      setQuery("");
    }
  };

  const handleSearch = (value: string) => {
    setFilteredItems(items.filter(({ label }) => label.toLowerCase().includes(value.toLowerCase())));
    setQuery(value);
    setIsListVisible(true);
  };

  const handleSelectItem = (item: SearchItem) => {
    setIsListVisible(false);
    onClick(item.value);
    setQuery("");
    handleSearch("");
  };

  return (
    <div className="sm:col-span-3" ref={ulRef}>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {searchLabel}
      </label>
      <div className="mt-2 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsListVisible(true)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
        />
        {query && isListVisible && (
          <ul className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg overflow-y-auto max-h-80">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectItem(item)}
                >
                  {item.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2">No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
