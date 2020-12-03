import React from 'react'

const FilterForm = ({ persons, filter, handler }) => {

    return (
        <div>
            rajaa näytettäviä: 
            <input
                value={filter}
                onChange={handler}
            />
        </div>
    )
}

export default FilterForm