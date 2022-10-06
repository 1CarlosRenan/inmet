import React, { useContext } from "react";
import Plot from "react-plotly.js";
import context from "./context";

const PlotMapbox = () => {
  const { estacoes, dataEstacao } = useContext(context);

  const formatText = (e) => {
    return `Código:${e.CD_ESTACAO} Situação:${e.CD_SITUACAO}`;
  };

  if (!estacoes || !dataEstacao) return null;

  const estacoesOperante = estacoes.filter(
    (e) => e.CD_SITUACAO === "Operante"
  );
  const estacoesInoperante = estacoes.filter(
    (e) => e.CD_SITUACAO !== "Operante"
  );

  const data = [
    {
      name: "",
      type: "scattermapbox",
      text: estacoesOperante.map(formatText),
      lon: estacoesOperante.map((e) => e.VL_LONGITUDE),
      lat: estacoesOperante.map((e) => e.VL_LATITUDE),
    },
    {
      name: "",
      type: "scattermapbox",
      text: estacoesInoperante.map(formatText),
      lon: estacoesInoperante.map((e) => e.VL_LONGITUDE),
      lat: estacoesInoperante.map((e) => e.VL_LATITUDE),
    },
    {
      name: "Estação escolhida",
      type: "scattermapbox",
      text: [formatText(dataEstacao[0])],
      lon: [dataEstacao[0].VL_LONGITUDE],
      lat: [dataEstacao[0].VL_LATITUDE],
      marker: { color: "red", size: 20 },
    },
  ];

  const layout = {
    autosize: true,
    showlegend: false,
    dragmode: "zoom",
    mapbox: {
      style: "open-street-map",
      center: { lat: -16, lon: -60 },
      zoom: 3,
    },
    margin: { r: 0, t: 0, b: 0, l: 0 },
  };

  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: "100%" }}
      config={{ responsive: true }}
      useResizeHandler={true}
      onSelected={e => console.log(e)}
    />
  );
};

export default PlotMapbox;
