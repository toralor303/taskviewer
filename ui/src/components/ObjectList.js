import React, { useState, useEffect } from 'react';
import '../App.css';

const ObjectList = (props) => {
  const [objects, setObjects] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch(props.baseUrl + props.objectsName)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let tempArr = [];
        data.map((obj) => tempArr.push(obj));
        setObjects(tempArr);
        setColumns(Object.keys(tempArr[0]));
      });
  }, [props.baseUrl, props.objectsName]);

  const deleteObj = async (id) => {
    await fetch(props.baseUrl + props.objectsName + '/' + id, {
      method: 'DELETE',
    });
  };

  return (
    <div
      className='grid'
      style={{ gridTemplateColumns: `repeat(${columns.length + 2}, 1fr)` }}
    >
      {columns.map((col) => {
        return (
          <div key={col} className='headerCell'>
            {col}
          </div>
        );
      })}
      <div />
      <div />
      {objects.map((obj) => {
        return (
          <>
            {Object.entries(obj).map((keyValuePair) => {
              return <div className='cell'>{keyValuePair[1]}</div>;
            })}
            <button>Edit</button>
            <button onClick={() => deleteObj(obj._id)}>Delete</button>
          </>
        );
      })}
    </div>
  );
};

export default ObjectList;
