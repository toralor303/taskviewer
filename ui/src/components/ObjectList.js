import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import '../App.css';
import { getAllObjects, createTestObjects, deleteObject } from '../dao/Objects';

const ObjectList = ({ baseUrl, objectName, objectsName }) => {
  const [objects, setObjects] = useState([]);
  const [columns, setColumns] = useState([]);

  const reloadObjects = useCallback(async () => {
    await getAllObjects(baseUrl + objectsName, objects => {
      setObjects(objects);
      setColumns(objects.length > 0 ? Object.keys(objects[0]) : []);
    });
  }, [baseUrl, objectsName]);

  const createObjects = async () => {
    await createTestObjects(baseUrl + objectsName, () => reloadObjects());
  };

  useEffect(async () => {
    await reloadObjects();
  }, [reloadObjects]);

  const deleteObj = async id => {
    deleteObject(`${baseUrl}${objectsName}/${id}`, () => reloadObjects());
  };

  return (
    <div
      className='grid'
      style={{ gridTemplateColumns: `repeat(${columns.length + 2}, 1fr)` }}
    >
      {columns.map(col => (
        <div key={uuid()} className='headerCell'>
          {col}
        </div>
      ))}
      <div />
      <div />
      {objects.length > 0 ? (
        objects.map(obj => (
          <React.Fragment key={uuid()}>
            {Object.entries(obj).map(keyValuePair => (
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
          <button onClick={() => reloadObjects()}>Reload objects</button>
          <button onClick={() => createObjects()}>Generate objects</button>
        </div>
      )}
    </div>
  );
};

export default ObjectList;
