import React from 'react';
import axios from 'axios';
import Grid from './grid';
import Legend from './legend';
import Inputs from './inputs';
import { graph } from '../landlab_raster_grid_example.json';
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
      // graph: {
        grid: 'hex',
        rows: '2',
        cols: '2',
        spacing: '10',
      // },
    };
  }

  componentWillMount() {
    console.log('in componentWillMount');
    const APIurl = `http://127.0.0.1:8181/graphs/${this.state.grid}?shape=${this.state.rows},${this.state.cols}&spacing=${this.state.spacing}`;
    console.log('url', APIurl);

    axios.get(APIurl)
    .then((response) => {
      console.log(`response for ${this.state.grid}`, response.data.graph.data_vars); // ex.: { user: 'Your User'}
      console.log(response.status); // ex.: 200
      this.setState({ graph: response.data.graph.data_vars });
    });
  }

  render() {
    console.log('state', this.state.graph);
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

    const newRequest = (attrs) => {
      // console.log('grid?', attrs);
      // for (attr in attrs) {
        // this.setState({ graph: attrs });
      // }
      // const newGraph = {
      //   grid: attrs.grid,
      //   rows: attrs.rows,
      //   cols: attrs.cols,
      //   spacing: attrs.spacing,
      // };
      // console.log('new graph', newGraph);
      // this.setState({
      //   graph: newGraph,
      // });
    };
    // console.log('after setState', this.state.graph);

    // const APIurl = `http://127.0.0.1:8181/graphs/${this.state.grid}?shape=${this.state.rows},${this.state.cols}&spacing=${this.state.spacing}`;
    // console.log('url', APIurl);
    //
    // const getData = axios.get(APIurl)
    // .then((response) => {
    //   console.log(`response for ${this.state.grid}`, response.data.graph.data_vars); // ex.: { user: 'Your User'}
    //   console.log(response.status); // ex.: 200
    //   this.setState({ graph: response.data.graph.data_vars });
    // });
    console.log('state', this.state.graph);

    return this.state.graph ? (
      <div className={app.chart}>
        <Inputs grid={this.state.grid} rows={this.state.rows} cols={this.state.cols} spacing={this.state.spacing} onChange={e => this.setState({ [e.target.name]: typeof e.target.value === 'number' ? e.target.value * 1 : e.target.value })} />
        <Legend active={activeLayers} onChange={e => this.setState({ [e.target.value]: !this.state[e.target.value] })} />
        <h2>Raster Grid</h2>
        <Grid nodeX={this.state.graph.x_of_node.data} nodeY={this.state.graph.y_of_node.data} nodeArea={this.state.graph.nodes_at_patch.data} linkLine={this.state.graph.nodes_at_link.data} show={activeLayers} spacing={10} />
      </div>
    ) : null;
  }
}

export default App;

// <Inputs grid={this.state.grid} rows={this.state.rows} cols={this.state.cols} spacing={this.state.spacing} onChange={e => this.setState({ [e.target.name]: e.target.value * 1 })} />
