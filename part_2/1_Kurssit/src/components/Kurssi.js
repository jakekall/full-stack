import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
import Yhteensa from './Yhteensa'

const Kurssi = ({ nimi, osat }) => {
    return (
        <div>
            <Otsikko nimi={nimi} />
            <Sisalto osat={osat} />
            <Yhteensa tehtavia={osat.map(osa => osa.tehtavia)} />
        </div>
    )
}

export default Kurssi