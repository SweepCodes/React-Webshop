import React from "react";
import "./Searchbar.css";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search products..." className="search-input" onChange={(e) => onSearch(e.target.value)} />
        </div>
    );
};
