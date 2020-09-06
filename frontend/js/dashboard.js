let i = 0
class Team {
  constructor(teamNo, name){
    this.teamNo = teamNo;
    this.name = name;
  }
  addTeamMember(){
    
  }
}

class UI{
  addTeamToList(team){
    const list = document.getElementById("team-list");
    const row = document.createElement("li");

    row.innerHTML =`<span class="icon-team"><i class="fas fa-users"></i> </span>${team.name} <span class="add-mem-btn $"><i class="fas fa-plus"></i></span>`;
    
    list.appendChild(row); 

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
  i++;
  const team = new Team(i,teamName);
  const ui =new UI();

  ui.addTeamToList(team);
})

//delete a team and remove from ui
document.getElementById("team-list").addEventListener("click", function(e){
  e.preventDefault();
  
})