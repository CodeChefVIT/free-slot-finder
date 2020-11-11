get = (folder, token, callback) => {
  var requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
  };

  fetch(`https://free-slot-finder-app.herokuapp.com/${folder}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      res = JSON.parse(result).teams;
      console.log(res);

      callback();
    })
    .catch((error) => console.log("error", error));
};

post = (folder, raw, redir, login, token,call, callback) => {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(raw),
  };
  fetch(`https://free-slot-finder-app.herokuapp.com/${folder}`, requestOptions)
    .then((response) => {
      console.log(response.status);
      if(call){
        callback()
      }
      if (response.status >= 200 && response.status < 300 && redir) {
        window.location.href = "dashboard.html";
      }
      return response.text();
    })
    .then((result) => {
      if (login) {
        localStorage.setItem("user", result);
      }
    })
    .catch((error) => console.log("error", error));
};
