import React, { useContext } from "react";
import Plot from "react-plotly.js";
import context from "./context";

const ChartLine = () => {
  const { dataEstacao, atributoFinal, validador, codEstacao, num, title, estacao } =
    useContext(context);

  if (!validador || !dataEstacao || !codEstacao || !title) return null;

  const newData = [
    {
      x: dataEstacao.map((atual) => atual.DT_MEDICAO),
      y: dataEstacao.map((atual) => atual[atributoFinal]),
    },
  ];

  return (
    <>
      <Plot
        key={num}
        data={newData}
        layout={{
          autosize: true,
          title: {
            //text: dataEstacao[0].CD_ESTACAO + ' - ' + dataEstacao[0].DC_NOME,
            text: estacao,
          },
          font: { size: 13 },
          transition: {
            duration: 500,
            easing: "cubic-in-out",
          },
          yaxis: {
            title: atributoFinal,
            autorange: true,
          },
        }}
        config={{ responsive: true }}
        style={{ width: "100%" }}
        useResizeHandler={true}
      />
    </>
  );
};

export default ChartLine;
