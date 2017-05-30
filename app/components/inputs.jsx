import React from 'react';
import axios from 'axios';
// import classNames from 'classnames';

// import inputs from '../theme/inputs.scss';


class Inputs extends React.Component {
  constructor() {
    super();
    // console.log('in constructor', props);
    // this.state = {
    //   rows: props.rows,
    //   cols: props.cols,
    //   grid: props.grid,
    //   spacing: props.spacing,
    // };
    // this.handleChange = (e) => {
    //   // const { name, value } = e.target;
    //   console.log('handleChange', e.target.value);
    //   // console.log([e.target.name]: e.target.value,);
    //   this.setState({
    //     [e.target.name]: e.target.value
    //   });
    // };
    //
    // this.handleChange = this.handleChange.bind(this);
  }

  render() {
    console.log('in render', this.props);
    const { grid, rows, cols, spacing} = this.props;
    const { onChange } = this.props;
    // const values = {
    //   grid: this.state.grid,
    //   rows: this.state.rows,
    //   cols: this.state.cols,
    //   spacing: this.state.spacing,
    // };

    // const responseData = axios.get(`http://127.0.0.1:8181/graphs/${this.state.grid}?shape=${this.state.rows},${this.state.cols}&spacing=10.,10.`)
    // .then((response) => {
    // console.log('in Input', response.data.graph.data_vars); // ex.: { user: 'Your User'}
    // console.log(response.status); // ex.: 200
    // });

    // responseData.then((response) => {
    //   console.log('stuff!', response.data.graph.data_vars);
    // });

    // handleChange = (e) => {
    //   console.log(e);
    //   this.setState([e.target.name] = e.target.value);
    // };

    return (
      <form onChange={onChange} method='POST'>
        <label htmlFor="grid">
          Choose your grid type
          <select name="grid" value={grid} >
            <option disabled selected value="" />
            <option value="raster">raster</option>
            <option value="hex">hex</option>
            <option value="voronoi">voronoi</option>
          </select>
        </label>
        <div>{grid && grid}</div>
        <input type="number" placeholder="rows" name="rows" value={rows} />
        <div>{rows && rows}</div>
        <input type="number" placeholder="cols" name="cols" value={cols} />
        <div>{cols && cols}</div>
        <input type="text" placeholder="spacing" name="spacing" value={spacing} />
        <div>{spacing && spacing}</div>
        <button type="submit">submit</button>
      </form>
    );
  }
}

// Inputs.propTypes = {
//
// };

export default Inputs;
