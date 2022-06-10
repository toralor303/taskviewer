import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import '../App.css';
import { getAllObjects, createTestObjects, deleteObject } from '../dao/Objects';
import { Link } from 'react-router-dom';
import configs from '../Config/configs';
import { useParams } from 'react-router-dom';

const ObjectsList = () => {
  const [objects, setObjects] = useState([]);
  const [columns, setColumns] = useState([]);
  let params = useParams();

  const reloadObjects = useCallback(async () => {
    await getAllObjects(configs.API_URI + params.objectType, (objects) => {
      setObjects(objects);
      setColumns(objects.length > 0 ? Object.keys(objects[0]) : []);
    });
    console.log('done waiting for the API request')
  }, [params.objectType]);

  const createObjects = async () => {
    await createTestObjects(process.env.API_URI + params.objectType, () => reloadObjects());
  };

  useEffect(() => {
    reloadObjects();
  }, [reloadObjects]);

  const deleteObj = async (id) => {
    deleteObject(`${process.env.API_URI}${params.objectType}/${id}`, () => reloadObjects());
  };

  return (
    <div
      className='grid'
      style={{ gridTemplateColumns: `repeat(${columns.length + 2}, 1fr)` }}
    >
      <h1>{params.objectType}</h1>
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
            <Link to={`/object/${obj._id}`}>Edit</Link>
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

export default ObjectsList;
