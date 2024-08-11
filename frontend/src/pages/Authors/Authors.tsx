import React, { useMemo } from "react";
import ManagementService from "services/managementService";
import { useFilterHook } from "components/Hooks/UseFilterHook";
import { Author } from "types/author";
import useSWR from "swr";

const managementService = new ManagementService();

const Authors: React.FC = () => {
  const { filter, setFilter, isFilterFoundInProperties } = useFilterHook();
  const { data: authorsData, isLoading } = useSWR("authors", () => managementService.getAuthors());

  const filteredAuthors = useMemo(() => {
    if (!filter) return authorsData;

    return authorsData?.filter(({ name, nationality, birthDate, email, id }: Author) =>
      isFilterFoundInProperties(name, nationality, birthDate, email, id),
    );
  }, [authorsData, filter]);

  return (
    <>
      <div className="flex items-center py-2 justify-between">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            onChange={(e) => setFilter(e.target.value)}
            className="block py-3 ps-10 text-sm border rounded-lg w-80 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search for items"
          />
        </div>
        <a
          href="/authors/create"
          className="max-sm:w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + Add author
        </a>
      </div>
      <hr />
      <div className="block max-h-[78dvh] overflow-y-auto">
        {filteredAuthors && filteredAuthors.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs uppercase ">
              <tr>
                <th scope="col" className="px-1 py-3">
                  Author
                </th>
                <th scope="col" className="px-1 py-3">
                  Nationality
                </th>
                <th scope="col" className="px-1 py-3">
                  Birth date
                </th>
                <th scope="col" className="px-1 py-3">
                  E-mail
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAuthors.map(({ id, name, nationality, birthDate, email }) => (
                <>
                  <tr key={id} className="border-b hover:bg-gray-50">
                    <th scope="row" className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {name}
                    </th>
                    <td className="px-1 py-4">{nationality}</td>
                    <td className="px-1 py-4">{birthDate}</td>
                    <td className="px-1 py-4">{email}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        ) : isLoading ? (
          <span>Loading...</span>
        ) : (
          <span className="pt-5">No authors registered</span>
        )}
      </div>
    </>
  );
};

export default Authors;
