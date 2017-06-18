import React from 'react';

const Inputs = (props) => {
  const { grid, rows, cols, spacing, onChange } = props;

  return (
    <form >
      <label htmlFor="grid">
        Choose your grid type
        <select name="grid" value={grid} onChange={onChange} >
          <option disabled value="" />
          <option value="raster">raster</option>
          <option value="hex">hex</option>
          <option value="voronoi">voronoi</option>
        </select>
      </label>
      <div>{grid && grid}</div>
      <label htmlFor="rows">
        rows
        <input type="number" placeholder="rows" name="rows" value={rows} onChange={onChange} />
      </label>
      <div>{rows && rows}</div>
      <label htmlFor="cols">
        <input type="number" placeholder="cols" name="cols" value={cols} onChange={onChange} />
      </label>
      <div>{cols && cols}</div>
      <label htmlFor="spacing">
        spacing
        <input type="text" placeholder="spacing" name="spacing" value={spacing} onChange={onChange} />
      </label>
      <div>{spacing && spacing}</div>
    </form>
  );
};

Inputs.propTypes = {
  grid: React.PropTypes.string,
  rows: React.PropTypes.number,
  cols: React.PropTypes.number,
  spacing: React.PropTypes.number,
  onChange: React.PropTypes.func,

};

export default Inputs;
// <button type="submit">submit</button>
