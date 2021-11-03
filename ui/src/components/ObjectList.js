import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import '../App.css';
import { getAllObjects } from '../dao/Objects';

const ObjectList = (props) => {
  const [objects, setObjects] = useState([]);
  const [columns, setColumns] = useState([]);

  const loadObjects = useCallback(async () => {
    const objList = await getAllObjects(props.baseUrl + props.objectsName);
    setObjects(objList);
    if (objList.length > 0) setColumns(Object.keys(objList[0]));
  }, [props.baseUrl, props.objectsName]);

  const createObjects = () => {
    [1, 2, 3, 4, 5].map((task) => {
      fetch(props.baseUrl + props.objectsName, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Test', status: 'Todo' }),
      })
        .then((res) => {
          return res.json();
        })
        .then(() => loadObjects());
      return task;
    });
  };

  useEffect(() => {
    loadObjects();
  }, [loadObjects]);

  const deleteObj = async (id) => {
    await fetch(props.baseUrl + props.objectsName + '/' + id, {
      method: 'DELETE',
    });
    await loadObjects();
  };

  return (
    <div
      className='grid'
      style={{ gridTemplateColumns: `repeat(${columns.length + 2}, 1fr)` }}
    >
      {columns.map((col) => (
        <div key={uuid()} className='headerCell'>
          {col}
        </div>
      ))}
      <div />
      <div />
      {objects.length > 0 ? (
        objects.map((obj) => (
          <React.Fragment key={uuid()}>
            {Object.entries(obj).map((keyValuePair) => (
              <div key={uuid()} className='cell'>
                {keyValuePair[1]}
              </div>
            ))}
            <button>Edit</button>
            <button
              onClick={() => {
                deleteObj(obj._id);
              }}
            >
              Delete
            </button>
          </React.Fragment>
        ))
      ) : (
        <div>
          <p>No objects to show</p>
          <button onClick={() => loadObjects()}>Reload objects</button>
          <button onClick={() => createObjects()}>Generate objects</button>
        </div>
      )}
    </div>
  );
};

export default ObjectList;
