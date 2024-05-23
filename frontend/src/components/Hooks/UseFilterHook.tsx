import { ChangeEvent, useState } from "react";

export const useFilterHook = () => {
    const [filter, setFilter] = useState<string | null>(null)

    const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>): void => {
        setFilter(e.target.value)
    }

    const shouldFilterInWith = (...properties: (unknown | undefined)[]): boolean => {
        if (!filter) return true

        let anyPropertyMatch = false

        for (const property of properties) {
            if (typeof property === "undefined") {
                continue
            }

            if (String(property).toLowerCase().includes(filter.toLowerCase())) {
                anyPropertyMatch = true
                break
            }
        }

        return anyPropertyMatch
    }

    return {
        handleChangeFilter,
        shouldFilterInWith,
    }
}