import App from './App.js';

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

function addScore() {
  const mail = document.getElementById('emailInput').value;
  if(ValidateEmail(mail)) {
    const data = {
        name: document.getElementById('nameInput').value,
        email: mail,
        score: Number(document.getElementById('totalScore').innerText)
      }
      // setNewScore(data);
  }
  alert("Score submitted!")
}
document.getElementById('submitBtn').addEventListener('click', addScore);

const app = new App();
app.run();
