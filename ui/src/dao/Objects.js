export const getAllObjects = async (url, callback) => {
  console.log('URL: ' + url)
  const res = await fetch(url);
  console.log('res: ' + JSON.stringify(res));
  const data = await res.json();
  console.log('Data : ' + data);
  callback(data);
};

export const createTestObjects = async (url, callback) => {
  [1, 2, 3, 4, 5].map(async () => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Test', status: 'Todo' }),
    });
    const data = await res.json();
    callback(data);
  });
};

export const deleteObject = async (url, callback) => {
  const res = await fetch(url, {
    method: 'DELETE',
  });
  const data = await res.json();
  callback(data);
};
