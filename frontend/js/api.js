get = () => {

};

post = (folder,raw) => {
  
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(raw) ,
    redirect: 'follow'
  };
  console.log(`https://free-slot-finder-app.herokuapp.com/${folder}`)
  fetch(`https://free-slot-finder-app.herokuapp.com/${folder}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};