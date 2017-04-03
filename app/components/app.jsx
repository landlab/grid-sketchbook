import React from 'react';
import Grid from './grid.jsx';
import Legend from './legend.jsx';
import Inputs from './inputs.jsx';
import raster from '../landlab_raster_grid_example.json';
import hex from '../landlab_hex_grid_example.json';

import app from '../theme/app.scss';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showCells: true,
      showCellLabels: false,
      showPatches: true,
      showPatchLabels: false,
      showLinks: true,
      showLinkLabels: false,
      showFaces: true,
      showFaceLabels: false,
      showNodes: true,
      showNodeLabels: false,
      showCorners: true,
      showCornerLabels: false,
    };
  }

  render() {
    const activeLayers = {
      cells: this.state.showCells,
      cellLabels: this.state.showCellLabels,
      patches: this.state.showPatches,
      patchLabels: this.state.showPatchLabels,
      links: this.state.showLinks,
      linkLabels: this.state.showLinkLabels,
      faces: this.state.showFaces,
      faceLabels: this.state.showFaceLabels,
      nodes: this.state.showNodes,
      nodeLabels: this.state.showNodeLabels,
      corners: this.state.showCorners,
      cornerLabels: this.state.showCornerLabels,
    };
    return (
      <div className={app.chart}>
        <Inputs />
        <Legend active={activeLayers} onChange={e => this.setState({ [e.target.value]: !this.state[e.target.value] })} />
        <h2>Raster Grid</h2>
        <Grid data={raster} show={activeLayers} />
        <h2>Hex Grid</h2>
        <Grid data={hex} show={activeLayers} />
      </div>
    );
  }
}

export default App;
