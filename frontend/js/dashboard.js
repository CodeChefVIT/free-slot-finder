let i = 0
class Team {
  constructor(teamNo, name){
    this.teamNo = teamNo;
    this.name = name;
  }
  // addTeam()(

  // )
  deleteTeam(){

  }
  addTeamMember(){
    
  }
  deleteTeamMember(){

  }
}

class UI{
  addTeamToList(team){
    const list = document.getElementById("team-list");
    const row = document.createElement("li");

    row.innerHTML =`${team.teamNo}<span class="icon-team"><i class="fas fa-users"></i> </span>${team.name} <span class="add-mem-btn $"><i class="fas fa-plus"></i><i class="fas fa-eye"></i><i class="fas fa-trash"></i></span>`;
    
    list.appendChild(row); 

  }
  deleTeamFromList(team){

  }
  showAlert(message, teamName){

  }
  deleteTeam(){

  }
}

//create a team and add to ui
document.getElementById("team-form").addEventListener("submit",function(e){
  e.preventDefault();
  const teamName =document.getElementById("team-name").value;
  document.getElementById("team-name").value="";
  i++;
  const team = new Team(i,teamName);
  const ui =new UI();

  ui.addTeamToList(team);
})

//delete a team and remove from ui
document.getElementById("team-list").addEventListener("click", function(e){
  e.preventDefault();
  
})