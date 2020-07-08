import React from 'react';

function SearchPanel({ updateSearchValue }) {
    return (
        <input type="text"
            placeholder="Search"
            className="form-control"
            onChange={(event) => {
                updateSearchValue(event.target.value);
            }}/>
    )
}

export default SearchPanel;