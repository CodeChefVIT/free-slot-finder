let teamsUI = document.querySelector("#team-list")
class TeamMember{
  constructor(memName,timetable){
    this.memName= memName;
    this.timetable=timetable;
  }
}
class Team {
  constructor(teamName){
    this.teamName = teamName;
    this.teamMembers=[]
  };
  addTeamMember(target){

    
  }
  deleteTeamMember(){

  }
}
class Teams{
  constructor(){
    this.team = []
  }
  addTeam(){
    let teamName = document.querySelector("#team-name").value;
    
    const temp = new Team(teamName);
    this.team.push(temp)
    console.log(this.team)

  }
  deleteTeam(){
  
  }
}


class UI{
  dispTeams(teams){
    teamsUI.innerHTML = ""
    let teamArr=teams.team
    let i;
    for(i=0;i<teamArr.length;i++){
      let teamBlock = document.createElement("div")
      teamBlock.innerHTML =`<form class="${i}">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" ><i class="fas fa-users"></i></span>
          <div class="btn team-name" > ${teamArr[i].teamName}</div>
        </div>
        <input type="text" class="form-control"  placeholder="New Member">
        <div class="input-group-append ">
          <button class="btn add-btn add-team-btn" type="submit" >Add</button>
          <button class="btn" type="submit" i><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </form>`
      let j=0;
      console.log()
      for(j=0;j<teamArr[i].teamMembers.length;j++){
        
        teamBlock.innerHTML+=`<div class="member d-flex">
        <div>${j+1}</div>
        <div>${teamArr[i].teamMembers[j].memName}</div>
        <div style="flex:1;"></div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" checked>
        </div>
      </div>`;
      }
      teamsUI.appendChild(teamBlock);
    }
    
  }

  showAlert(message){

  }
  
}

const accountName = new Teams();
const ui = new UI();



document.querySelector("#btn-add-teams").addEventListener("click",function(e){
  e.preventDefault();
  accountName.addTeam();
  ui.dispTeams(accountName);

})
document.querySelector("#team-list").addEventListener("click",function(e){
  e.preventDefault();
  let clickedElementSuperParent = e.target.parentElement.parentElement.parentElement
  let clickedTeamNo = e.target.parentElement.parentElement.parentElement.className
  if(e.target.className == "btn add-btn add-team-btn"){
    let memNam = e.target.parentElement.previousElementSibling.value;
    let timeT = 0;
    const tempMem = new TeamMember(memNam, timeT)
    accountName.team[clickedTeamNo].teamMembers.push(tempMem )
    ui.dispTeams(accountName);
  }
  // if (e.target.)

})

