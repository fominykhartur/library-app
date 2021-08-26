import React from 'react';

function updateStatus(id, status) {
    let data = {
        id: id,
        status: status
    };
    fetch('http://localhost:8080/updateStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    console.log(id, status);
}

function addBook(categoria, cycle, author, name) {
    let data = {
        categoria: categoria,
        cycle: cycle,
        author: author,
        name: name
    };
    fetch('http://localhost:8080/addBook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    console.log(categoria, cycle, author, name);

}

export default props => {
    let inputDate = {
        cycle: '',
        author: '',
        name: ''
    }

    let subcycle_array = Array.from(new Set(props.data.map(item=>{return item.subcycle})));
    let author_array = Array.from(new Set(props.data.map(item=>{return item.author})));

    return(<table className="table">
            <thead>
                <tr>
                    <th onClick={props.onSort.bind(null, 'id')}>ID {props.sortField === 'id' ? <small>{props.sort}</small> : null}</th>
                    <th onClick={props.onSort.bind(null, 'subcycle')}>Цикл {props.sortField === 'subcycle' ? <small>{props.sort}</small> : null}</th>
                    <th onClick={props.onSort.bind(null, 'author')}>Автор {props.sortField === 'author' ? <small>{props.sort}</small> : null}</th>
                    <th onClick={props.onSort.bind(null, 'name')}>Название {props.sortField === 'name' ? <small>{props.sort}</small> : null}</th>
                    <th onClick={props.onSort.bind(null, 'status')}>Статус {props.sortField === 'status' ? <small>{props.sort}</small> : null}</th>
                </tr>
            </thead>
            <tbody>
                { props.data.map(item =>(
                    <tr key={item.id + item.name}>
                        <td>{item.id}</td>
                        <td>{item.subcycle}</td>
                        <td>{item.author}</td>
                        <td>{item.name}</td>
                        <td>{item.status == 1 ? <label >Прочитано <input type="checkbox" checked='1' onChange={() => updateStatus(item.id, 0)}></input></label> : <label >Непрочитано <input type="checkbox" onChange={() => updateStatus(item.id, 1)}></input></label>}</td>
                    </tr>
                ))}
                <tr className={props.choosedCategorie == "0"?"d-none": ""}>
                <td>#</td>
                <td><input type="text" placeholder="Введите цикл" className="input-form" list="subcycle_array" onChange={(event)=>{inputDate.cycle = event.target.value}}></input>
                <datalist id="subcycle_array">
                {   subcycle_array.map(item=>(
                    <option value={item}></option>
                    ))
                }
                </datalist></td>
                <td><input type="text" placeholder="Введите автора" className="input-form" list="author_array" onChange={(event)=>{inputDate.author = event.target.value}}></input>
                <datalist id="author_array">
                {   author_array.map(item=>(
                    <option value={item}></option>
                    ))
                }
                </datalist></td>
                <td><input type="text" placeholder="Введите название" className="input-form" onChange={(event)=>{inputDate.name = event.target.value}}></input></td>
                <td><button type="button" className="btn btn-outline-success" onClick={()=>addBook(props.choosedCategorie, inputDate.cycle, inputDate.author, inputDate.name)} disabled={inputDate.name}>Добавить книгу</button></td>
                </tr>
            </tbody>
        </table>)
}