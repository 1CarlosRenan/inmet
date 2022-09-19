import Layout from "../shared/Layout";
import { useContext } from "react";
import context, { Provider } from "./context";
import FilterForm from "./FilterForm";
import ChartLine from "./ChartLine";
import PlotMapbox from "./PlotMapbox";
import { Grid, GridItem, Skeleton, Spinner } from "@patternfly/react-core";

const PageEstacoes = () => {
  const { estacoesIsLoading } = useContext(context);

  if (estacoesIsLoading) {
    return (
      <Layout>
        <Skeleton
          fontSize="4xl"
          screenreaderText="Carregando..."
          className="pf-c-skeleton"
        />
        <br />
        <div style={{ display: "flex" }}>
          <div
            style={{
              height: "70vh",
              width: "50%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Skeleton height="25%" width="15%" />
            <Skeleton height="33%" width="15%" />
            <Skeleton height="50%" width="15%" />
            <Skeleton height="66%" width="15%" />
            <Skeleton height="75%" width="15%" />
            <Skeleton height="100%" width="15%" />
          </div>
          <div className="pf-u-m-auto">
            <Spinner
              isSVG
              diameter="200px"
              aria-label="Contents of the custom size example"
            />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout filters={<FilterForm />}>
      <Grid>
        <GridItem lg={6}>{<ChartLine />}</GridItem>
        <GridItem lg={6}>{<PlotMapbox />}</GridItem>
      </Grid>
    </Layout>
  );
};

const Estacoes = () => (
  <Provider>
    <PageEstacoes />
  </Provider>
);

export default Estacoes;
