import React from 'react';
import Grid from './grid.jsx';
import Legend from './legend.jsx';
import raster from '../landlab_raster_grid_example.json';
import hex from '../landlab_hex_grid_example.json';

import app from '../theme/app.scss';


const App = () => (
  <div className={app.chart}>
    <Legend onChange={(e) => console.log('yo!', e.currentTarget)}/>
    <Grid data={raster} />
    <Grid data={hex} />
  </div>
);

export default App;
