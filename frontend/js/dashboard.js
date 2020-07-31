class Team {
  constructor(name){
    this.name = name;
  }
}

class UI{
  addTeamToList(team){
    const list = document.getElementById("team-list");
    const row = document.createElement("ul");

    row.innerHTML = `
    <li>${team.name}</li> `;
    
    list.appendChild(row);
      

  }
  showAlert(message, teamName){

  }
  deleteTeam(){

  }
}

document.getElementById("team-form").addEventListener("submit",function(e){
  e.preventDefault();
  const teamName =document.getElementById("team-name").value;
  const team = new Team(teamName);
  const ui =new UI();

  ui.addTeamToList(team);
})