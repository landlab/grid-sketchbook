import React from 'react';
// import classNames from 'classnames';

// import inputs from '../theme/inputs.scss';


class Inputs extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: null,
      cols: null,
      grid: undefined,
    };
  }

  render() {
    return (
      <form>
        <label>
          Choose your grid type and enter the desired number of rows and columns
          <select name="grid" value={this.state.grid} onChange={e => this.setState({ grid: e.currentTarget.value })}>
            <option value="raster">raster</option>
            <option value="hex">hex</option>
            <option value="voronoi">voronoi</option>
          </select>
        </label>
        <input type="text" placeholder="grid type" onChange={e => this.setState({ grid: e.currentTarget.value })} value={this.state.grid} />
        <div>{this.state.grid}</div>
        <input type="text" placeholder="rows" onChange={e => this.setState({ rows: e.currentTarget.value })} value={this.state.rows} />
        <div>{this.state.rows}</div>
        <input type="text" placeholder="cols" onChange={e => this.setState({ cols: e.currentTarget.value })} value={this.state.cols} />
        <div>{this.state.cols}</div>
        <button type="submit">submit</button>
      </form>
    );
  }
}

Inputs.propTypes = {

};

export default Inputs;
