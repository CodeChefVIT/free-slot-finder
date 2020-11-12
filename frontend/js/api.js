get = (folder, token, team, currteam, callback) => {
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
      if (team) {
        res = JSON.parse(result).teams;
      } else {
        res = JSON.parse(result).members;
      }
      if (currteam) {
        callback(currteam);
      } else {
        callback();
      }
    })
    .catch((error) => console.log("error", error));
};

post = (
  folder,
  raw,
  redir,
  login,
  stringify,
  member,
  token,
  call,
  callback,
) => {
  if (token) {
    if (member) {
      header = {
        Authorization: `Bearer ${token}`,
      };
    } else {
      header = {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    }
  } else {
    header = {
      "Content-type": "application/json",
    };
  }
  if (stringify) {
    raw = JSON.stringify(raw);
  }
  var requestOptions = {
    method: "POST",
    headers: header,

    body: raw,
  };
  fetch(`https://free-slot-finder-app.herokuapp.com/${folder}`, requestOptions)
    .then((response) => {
      if (response.status >= 200 && response.status < 300 && redir) {
        window.location.href = "dashboard.html";
      }
      return response.text();
    })
    .then((result) => {
      if (call) {
        callback(result);
      }
      if (login) {
        localStorage.setItem("user", result);
      }
    })
    .catch((error) => console.log("error", error));
};
