class TeamMember {
  constructor(memName, memID, timetable) {
    this.memID = memID;
    this.memName = memName;
    this.timetable = timetable;
  }
}
class Team {
  constructor(teamName, teamID) {
    this.teamName = teamName;
    this.teamID = teamID;
    this.teamMembers = [];
  }
}
class Teams {
  constructor() {
    this.team = [];
  }

  addTeam() {
    let teamName = document.querySelector("#team-name").value;
    let data = {
      teamName: teamName,
    };
    post(
      "team/add",
      data,
      false,
      false,
      true,
      false,
      token,
      true,
      this.getTeam,
    );
  }
  getTeam = () => {
    get("team/all", token, true, null, () => {
      let teamName = res[res.length - 1].teamName;
      let teamID = res[res.length - 1]._id;
      const temp = new Team(teamName, teamID);
      this.team.push(temp);
      ui.dispTeams(accountName);
    });
  };
  deleteTeam() {}

  teamsInit = () => {
    for (let i = 0; i < res.length; i++) {
      let teamName = res[i].teamName;
      let teamID = res[i]._id;
      const temp = new Team(teamName, teamID);
      get(
        `team/member/all/?teamId=${res[i]._id}`,
        token,
        false,
        temp,
        this.memInit,
      );

      this.team.push(temp);
    }
  };
  memInit = (currteam) => {
    for (let i = 0; i < res.length; i++) {
      let memName = res[i].memberName;
      let memID = res[i]._id;
      let timetable = res[i].timetable;
      let tempmem = new TeamMember(memName, memID, timetable);
      currteam.teamMembers.push(tempmem);
    }
    ui.dispTeams(accountName);
  };
}

class UI {
  dispTeams(teams) {
    teamsUI.innerHTML = "";
    let teamArr = teams.team;
    let i;
    for (i = 0; i < teamArr.length; i++) {
      let teamBlock = document.createElement("div");
      teamBlock.innerHTML = `<form id="${teamArr[i].teamID}" enctype="multipart/form-data" onSubmit="return false">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" ><i class="fas fa-users"></i></span>
          <div class="btn team-name" > ${teamArr[i].teamName}</div>
        </div>
        <input type="text" class="form-control" name="memberName"  placeholder="New Member" required>
        <input type="file" name="file" accept=".jpg,.jpeg,.png" required>
        <div class="input-group-append ">
          <button class="btn add-btn add-team-btn" type="submit" >Add</button>
          <button class="btn del-team" type="submit" i><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </form>`;
      let j = 0;
      for (j = 0; j < teamArr[i].teamMembers.length; j++) {
        teamBlock.innerHTML += `<div class="member d-flex" id="${
          teamArr[i].teamMembers[j].memID
        }">
        <div>${j + 1}</div>
        <div>${teamArr[i].teamMembers[j].memName}</div>
        <div style="flex:1;"></div>
        <div class="form-check">
        
          <input class="form-check-input" type="checkbox" value="${j}" name="ugu${j}" checked>
        </div>
        <button class="btn del-mem" type="submit" i><i class="fas fa-trash"></i></button>
      </div>`;
      }
      teamsUI.appendChild(teamBlock);
    }
  }

  showAlert(message) {}
}
