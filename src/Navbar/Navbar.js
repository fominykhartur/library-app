import React from 'react';
import { useState, useEffect } from 'react'
import { Collapse } from 'bootstrap';
import { Navbar, Nav, Row, Col, NavDropdown, Container, Button, ButtonGroup } from 'react-bootstrap';

export default props => {
    const [showExport, setShowExport] = useState(false);


    var [toggle, setToggle] = useState({toggle: false, elemID: 'Export'});
    var {elemID, toggle} = toggle;
    console.log(elemID, toggle)
    
    useEffect(() => {
        var myCollapse = document.getElementById(elemID)
        var bsCollapse = new Collapse(myCollapse, {toggle : false})
        toggle ? bsCollapse.show() : bsCollapse.hide()
    })

  return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="py-2">
              <button className="btn btn-outline-success" onClick={() => setToggle({toggle:!toggle, elemID: 'Export'})}>
                  Экспорт базы
              </button>
              <div className="collapse py-2" id="Export">
                  <a href={`${props.API_URL}exportExcel`}><button className="btn btn-outline-success " type="button" onClick={() => console.log('База экспортирована')}>Excel</button></a>
                  <a href={`${props.API_URL}exportWord`}><button className="btn btn-outline-primary " type="button" onClick={() => console.log('База экспортирована')}>Word</button></a>
              </div>
          </div>
          <div className="py-2">
            <a href={`${props.API_URL}importBooks`}>
              <button className="btn btn-outline-success" onClick={() => setToggle({toggle:!toggle, elemID: 'Import'})}>
                  Импорт базы
              </button>
              </a>
          </div>
        </nav>  )
}