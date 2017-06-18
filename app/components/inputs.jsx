import React from 'react';

const Inputs = (props) => {
  const { grid, rows, cols, spacing, onChange } = props;

  return (
    <div>
      <h2>Define your grid type and size</h2>
      <form>
        <label htmlFor="grid">
        grid type
          <select name="grid" value={grid} onChange={onChange} >
            <option disabled value="" />
            <option value="raster">raster</option>
            <option value="hex">hex</option>
            <option value="radial">radial</option>
          </select>
        </label>
        <label htmlFor="rows">
          rows
          <input type="number" placeholder="rows" name="rows" value={rows} onChange={onChange} />
        </label>
        <label htmlFor="cols">
          cols
          <input type="number" placeholder="cols" name="cols" value={cols} onChange={onChange} />
        </label>
      </form>
    </div>
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
