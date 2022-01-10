import React, { useState, useEffect } from "react";
import { Loading } from "cassi-componentes/dist/Loading/Loading";
import WelcomeMessage from "./WelcomeMessage";
import ResultTable from "./ResultTable";
import API from "../../API/API";



const ResultPanel = ({filter, userInfo}) => {
  const [rows, setRows] = useState([]);
  const [totalGeral, setTotalGeral] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clean Screen
    setRows([]);
    setTotalGeral(0);
    setShowResults(false);

    // Show if filter is valid
    if(filter.valid) {
      // Search Api
      setLoading(true);
      API.get(filter).then(
        res => {
          setLoading(false);
          setShowResults(true);
          setRows(res.listaOcorrencias);
          setTotalGeral(res.totalGeral);
        }
      ).catch(err => {
        console.error(err);
        setLoading(false);
        setShowResults(true);
      })
    }
  }, [filter])


  return (
    <div>
      {shouldShowLoading(loading)}
      {showResults && <ResultTable rows={rows} total={totalGeral} /> }
      {!showResults && <WelcomeMessage userInfo={userInfo} /> }
    </div>
  );
};

const shouldShowLoading = (loading) => {
  return (loading && <Loading />)
}



export default ResultPanel;
