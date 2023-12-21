import Grid from './Grid';

const GridExample = (): JSX.Element => {
  return (
    <>
      <Grid className="bg-violet-400 col-span-12" container>
        <Grid
          className="bg-cyan-200 sm:bg-cyan-300 md:bg-cyan-400 lg:bg-cyan-500"
          item
          lg={4}
          md={7}
          xs={10}
        >
          dynamic col sizes
        </Grid>
      </Grid>
      <Grid className="bg-violet-400" container>
        <Grid
          className="bg-cyan-200"
          item
          justifyContent="center"
          rowSpan={6}
          xs={3}
        >
          <Grid
            alignContent="end"
            className="bg-violet-400"
            container
            justifyContent="center"
          >
            <Grid item xs={12}>
              Align Content End
              <br />
              Justify Content Center
            </Grid>
            <Grid className="bg-cyan-200" item xs={4}>
              1
            </Grid>
            <Grid className="bg-cyan-200" item xs={4}>
              2
            </Grid>
            <Grid className="bg-cyan-200" item xs={4}>
              3
            </Grid>
          </Grid>
        </Grid>
        <Grid className="bg-cyan-200" item justifyContent="end" xs={3}>
          Justify Content End
        </Grid>
        <Grid
          className="bg-cyan-200"
          item
          justifyContent="center"
          verticalAlign="center"
          xs={3}
        >
          Vertical Align Center
        </Grid>
        <Grid className="bg-cyan-200" item xs={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Grid>
      </Grid>
    </>
  );
};

export default GridExample;
