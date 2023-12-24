import Grid from './Grid';

const GridExample = (): JSX.Element => {
  return (
    <>
      <Grid container className="bg-violet-400 col-span-12">
        <Grid
          item
          className="bg-cyan-200 sm:bg-cyan-300 md:bg-cyan-400 lg:bg-cyan-500"
          lg={4}
          md={7}
          xs={10}
        >
          dynamic col sizes
        </Grid>
      </Grid>
      <Grid container className="bg-violet-400">
        <Grid
          item
          className="bg-cyan-200"
          justifyContent="center"
          rowSpan={6}
          xs={3}
        >
          <Grid
            container
            alignContent="end"
            className="bg-violet-400"
            justifyContent="center"
          >
            <Grid item xs={12}>
              Align Content End
              <br />
              Justify Content Center
            </Grid>
            <Grid item className="bg-cyan-200" xs={4}>
              1
            </Grid>
            <Grid item className="bg-cyan-200" xs={4}>
              2
            </Grid>
            <Grid item className="bg-cyan-200" xs={4}>
              3
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="bg-cyan-200" justifyContent="end" xs={3}>
          Justify Content End
        </Grid>
        <Grid
          item
          className="bg-cyan-200"
          justifyContent="center"
          verticalAlign="center"
          xs={3}
        >
          Vertical Align Center
        </Grid>
        <Grid item className="bg-cyan-200" xs={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Grid>
      </Grid>
    </>
  );
};

export default GridExample;
