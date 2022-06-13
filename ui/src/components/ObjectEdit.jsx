import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ObjectEdit() {
    let params = useParams();
    const [object, setObject] = useState({});


    useEffect(() => {
        const getObject = async () => {
            const data = await fetch(`http://localhost:5000/tasks/${params.id}`);
            setObject(await data.json());
            console.log(object);
        }
        getObject();
    }, [params.id]);

  return (
    <div>
        <h1>{object.name}</h1>
    </div>
  )
}

export default ObjectEdit