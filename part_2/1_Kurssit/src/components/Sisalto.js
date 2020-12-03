import React from 'react'
import Osa from './Osa'

const Sisalto = ({ osat }) => {
    return (
        <React.Fragment>
            {osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
        </React.Fragment>
    )
}

export default Sisalto