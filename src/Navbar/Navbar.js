import React from 'react';
import { useState, useEffect } from 'react'
import { Collapse } from 'bootstrap';
const fs = require('fs');

export default props => {
    var [toggle, setToggle] = useState(false);
    
    useEffect(() => {
        var myCollapse = document.getElementById('collapseTarget')
        var bsCollapse = new Collapse(myCollapse, {toggle: false})
        toggle ? bsCollapse.show() : bsCollapse.hide()
    })

  return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="py-2">
              <button className="btn btn-outline-success" onClick={() => setToggle(toggle => !toggle)}>
                  Экспорт базы
              </button>
              <div className="collapse py-2" id="collapseTarget">
                  <a href={`${props.API_URL}exportExcel`}><button className="btn btn-outline-success " type="button" onClick={() => console.log('База экспортирована')}>Excel</button></a>
                  <a href={`${props.API_URL}exportWord`}><button className="btn btn-outline-primary " type="button" onClick={() => console.log('База экспортирована')}>Word</button></a>
              </div>
          </div>
        </nav>
  )
}