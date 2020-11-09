let userData = JSON.parse(localStorage.getItem("user"));
let token = userData.token;
console.log(token);

let teamsUI = document.querySelector("#team-list");

const accountName = new Teams();
const ui = new UI();

get("team/all", token, accountName.teamsInit);

document
  .querySelector("#btn-add-teams")
  .addEventListener("click", function (e) {
    e.preventDefault();
    accountName.addTeam();
  });
document.querySelector("#team-list").addEventListener("click", function (e) {
  e.preventDefault();
  let clickedTeamSuperParent =
    e.target.parentElement.parentElement.parentElement;
  if (e.target.className == "btn add-btn add-team-btn") {
    var chkStatus = clickedTeamSuperParent.checkValidity();
    clickedTeamSuperParent.reportValidity();
    if (chkStatus) {
      let clickedTeamID = e.target.parentElement.parentElement.parentElement.id;
      let teamNO;
      for (let i = 0; i < accountName.team.length; i++) {
        if (accountName.team[i].teamID == clickedTeamID) {
          teamNO = i;
          break;
        }
      }

      let memNam = e.target.parentElement.previousElementSibling.value;
      let timeT = 0;
      let fd = new FormData(clickedTeamSuperParent);
      console.log([...fd.keys()].length);
      const tempMem = new TeamMember(memNam, timeT);

      accountName.team[teamNO].teamMembers.push(tempMem);
      ui.dispTeams(accountName);
    }
  }
});
