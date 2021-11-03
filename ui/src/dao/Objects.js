export const getAllObjects = async (url) => {
  return await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let tempArr = [];
      data.map((obj) => tempArr.push(obj));
      console.log(tempArr);
      return tempArr;
    });
};
