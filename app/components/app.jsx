import React from 'react';
import Grid from './grid.jsx';
import raster from '../landlab_raster_grid_example.json';
import hex from '../landlab_hex_grid_example.json';

import app from '../theme/app.scss';


const App = () => (
  <div className={app.chart}>
    <Grid data={raster} />
    <Grid data={hex} />
  </div>
);

export default App;
