import React from 'react';
const fs = require('fs');

export default props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <form className="form-inline">
            <a href={`${props.API_URL}exportBooks`}><button className="btn btn-outline-success" type="button" onClick={() => console.log('База экспортирована')}>Экспорт базы</button></a>
          </form>
        </nav>
    )
}