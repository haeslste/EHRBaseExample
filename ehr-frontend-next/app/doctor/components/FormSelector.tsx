"use client";


// create a Form selector that uses the passed possible forms as options
// the options should be passed as a prop. 
// further, the options should be searchable

import {useState} from "react";
import {Combobox} from "@headlessui/react";
import {useDebounce} from "@/hooks/use-debounce";
import {useEffect} from "react";

const FormSelector = ({options, onSelect}) => {
    const [selected, setSelected] = useState(null);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 300);

    const filteredOptions =
        debouncedQuery === ""
            ? options
            : options.filter((option) =>
                option.name.toLowerCase().includes(debouncedQuery.toLowerCase())
            );

    useEffect(() => {
        if (selected) {
            onSelect(selected);
        }
    }, [selected]);

    return (
        <Combobox value={selected} onChange={setSelected}>
            <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(option) => option.name}
                placeholder="Search for a form"
                className="border border-gray-300 rounded-md p-2 w-full"
            />
            <Combobox.Options>
                {filteredOptions.length === 0 && query !== "" ? (
                    <Combobox.Option value={null} disabled>
                        No results found.
                    </Combobox.Option>
                ) : (
                    filteredOptions.map((option) => (
                        <Combobox.Option key={option.id} value={option}>
                            {option.name}
                        </Combobox.Option>
                    ))
                )}
            </Combobox.Options>
        </Combobox>
    );
}