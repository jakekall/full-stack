import React from 'react'

const Yhteensa = ({ tehtavia }) => {
   const yhteensa = tehtavia.reduce((sum, tehtava) => sum + tehtava)
   return (
       <p>Yhteensä {yhteensa} tehtävää</p>
   )
}

export default Yhteensa