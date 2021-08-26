import React, { useState } from 'react';

export default props => {
    const [value, setValue] = useState(0)
    const changeCategoryHandler = event => {
        setValue(event.target.value);
    }

    return (<select className="form-select small mt-3" onChange={changeCategoryHandler} onClick={() => props.onCategoryChange(value)}>
      <option value="0">Все</option>
      {props.categories.map( item =>(
        <option value={item.id}>{item.name}</option>
      ))
      }
      </select>)
}