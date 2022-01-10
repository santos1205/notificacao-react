import React, { useState } from "react";

import FilterPanel from "./FilterPanel";
import ResultPanel from "./ResultPanel";


const HomePage = props => {

  const [filter, setFilter] = useState({ dtInicial: "", dtFinal: "" });

  return (
    <div>
      <FilterPanel setFilter={ (val) => setFilter(val) } />
      <ResultPanel filter={filter} userInfo={props.userInfo} />
    </div>
  );
};


export default HomePage;
