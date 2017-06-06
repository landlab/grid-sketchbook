import React from 'react';

const Inputs = (props) => {
  const { grid, rows, cols, spacing } = props;
  const { onChange } = props;

  return (
    <form onChange={onChange} >
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
      <label htmlFor="rows">
        rows
        <input type="number" placeholder="rows" name="rows" value={rows} />
      </label>
      <div>{rows && rows}</div>
      <label htmlFor="cols">
        <input type="number" placeholder="cols" name="cols" value={cols} />
      </label>
      <div>{cols && cols}</div>
      <label htmlFor="spacing">
        spacing
        <input type="text" placeholder="spacing" name="spacing" value={spacing} />
      </label>
      <div>{spacing && spacing}</div>
    </form>
  );
};

Inputs.propTypes = {
  grid: React.PropTypes.string,
  rows: React.PropTypes.string,
  cols: React.PropTypes.string,
  spacing: React.PropTypes.string,
  onChange: React.PropTypes.func,

};

export default Inputs;
// <button type="submit">submit</button>
