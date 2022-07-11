import React, { createContext, useEffect, useState } from 'react';
import api from '../../services/api';
import { useQuery } from 'react-query';
import { useParams, useLocation } from "react-router-dom";
import placeholderData from "./placeholderData";

const context = createContext(true)
const arrPlaceHolder = [placeholderData];

export const Provider = ({ children }) => {
  const location = useLocation();
  const [estacaoId] = useState('A301');
  const { atributoId, initialDateId, finalDateId, codEstacaoId } = useParams();
  const [estacao, setEstacao] = useState("A301 - RECIFE");
  const [initialDate, setInitialDate] = useState("01-10-2019");
  const [finalDate, setFinalDate] = useState("31-10-2019");
  const [atributo, setAtributo] = useState("CHUVA");
  const [initialDateFormat, setInitialDateFormat] = useState(initialDateId ? initialDateId : "2019-10-01");
  const [finalDateFormat, setFinalDateFormat] = useState(finalDateId ? finalDateId : "2019-10-31");
  const [codEstacao, setCodEstacao] = useState(codEstacaoId ? codEstacaoId : "A301");
  const [atributoFinal, setAtributoFinal] = useState(atributoId ? atributoId : "CHUVA");
  const [title, setTitle] = useState(codEstacaoId ? codEstacaoId : "A301 - RECIFE");
  const [validador, setValidador] = useState(true);
  const [num, setNum] = useState(0);

  const getEstacaoById = eid => estacoes.find(e => e.CD_ESTACAO === eid);

  const estacoesQuery = useQuery(
    ['estacoes'],
    () => api.get('/estacoes/T').then(r => r.data),
    {
      onError: (error) => {
        console.log(error)
      },
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 3600
    }
  )

  const { data: dataEstacao, isFetching } = useQuery(
    ["dataPlot", initialDateFormat, finalDateFormat, codEstacao],
    () =>
      api
        .get(
          `estacao/diaria/${initialDateFormat}/${finalDateFormat}/${codEstacao}`
        )
        .then((r) => r.data),
    {
      onError: (error) => {
        console.log("erro no fetch dos dados: " + error);
      },
      onSuccess: () => {
        console.log("fetch sucess");
      },
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5,
      placeholderData: arrPlaceHolder.at(-1),
    }
  );

  useEffect(() => {
    if (!dataEstacao) return null;

    arrPlaceHolder.push(dataEstacao);
  });

  const estacoesIsLoading = estacoesQuery.isLoading;
  const estacoes = estacoesQuery.data;

  useEffect(() => {
    if (atributoId) {
      const arrParams = location.pathname.split('/');
      const estacaoObj = estacoes.find(e => e.CD_ESTACAO === arrParams[5]);
      const estacaoName = estacaoObj.CD_ESTACAO + ' - ' + estacaoObj.DC_NOME;

      setAtributoFinal(arrParams[2])
      setInitialDateFormat(arrParams[3]);
      setFinalDateFormat(arrParams[4]);
      setCodEstacao(arrParams[5]);
      setNum(num + 1);
      setEstacao(estacaoName);
    }
  }, [location]);

  const provides = {
    estacao,
    estacoes,
    estacoesIsLoading,
    getEstacaoById,
    estacaoId,
    setEstacao,
    initialDate,
    setInitialDate,
    finalDate,
    setFinalDate,
    dataEstacao,
    initialDateFormat,
    setInitialDateFormat,
    finalDateFormat,
    setFinalDateFormat,
    codEstacao,
    setCodEstacao,
    atributo,
    setAtributo,
    atributoFinal,
    setAtributoFinal,
    validador,
    setValidador,
    isFetching,
    title,
    setTitle,
    num,
    setNum,
    location
  }
  return <context.Provider value={provides}>{children}</context.Provider>
}

export default context
