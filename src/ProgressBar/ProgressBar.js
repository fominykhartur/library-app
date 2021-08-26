import React from 'react';

export default props => {
    let readedBooks = props.data.filter(item => parseInt(item.status) === 1).length;
    let totalBooks = props.data.length;
    let progressPercent = readedBooks/totalBooks*100;
    return (<div className="progress mt-4">
    <div className="progress-bar bg-success" role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100" style={{width: `${progressPercent}%`}}><span className='sr-only'>{readedBooks}/{totalBooks}    {Math.round(progressPercent)}%</span></div>
</div>)
}

