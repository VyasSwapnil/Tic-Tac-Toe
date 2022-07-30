/*****************************************************UI items*****************************************************/

const cross = '<div class="forwardSlash"></div><div class="backSlash"></div>';
const circle = '<div class="outer"><div class="inner"></div></div>';
const winLine = '<div id="winLine" class="winLine"></div>';

/****************************************All options available for computer****************************************/
const arrAllOptions = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];

/*************************************All possible options for a player to win*************************************/
const arrWin = [
  ["11", "12", "13"],
  ["21", "22", "23"],
  ["31", "32", "33"],
  ["11", "21", "31"],
  ["12", "22", "32"],
  ["13", "23", "33"],
  ["11", "22", "33"],
  ["13", "22", "31"],
];
let mode = ""; // Game mode
let p1 = []; // p1 player's box selections
let p2 = []; // p2 player's box selections
let p1Winnings = 0; // p1's Score
let p2Winnings = 0; // p2's Score
let tieWinnings = 0; // tie's Score

/*****************************************Play button click from Home Page*****************************************/
function fnPlay() {
  let radios = document.getElementsByTagName("input");
  for (let i = 0; i < radios.length; i++) {
    self;
    if (radios[i].checked) mode = radios[i].value;
  }
  if (mode !== "") {
    mode == "single" ? (document.getElementById("p2").innerText = "COMPUTER (O)") : (document.getElementById("p2").innerText = "PLAYER 2 (O)");
    document.getElementById("home").style.display = "none";
    document.getElementById("game").style.display = "block";
  } else alert("Select a mode to get started.");
}

/**********************************************When clicking on a box**********************************************/
let count = 0;
function fnBoxClick(pthis) {
  if (mode === "multi") {
    if (document.getElementById(pthis.id).innerHTML === "") {
      count++;
      if (count % 2 !== 0) {
        document.getElementById(pthis.id).innerHTML = cross;
        p1.push(pthis.id);
        fnCheckWinner(p1, "p1");
      } else {
        document.getElementById(pthis.id).innerHTML = circle;
        p2.push(pthis.id);
        fnCheckWinner(p2, "p2");
      }
    }
  } else {
    if (document.getElementById(pthis.id).innerHTML === "") {
      document.getElementById(pthis.id).innerHTML = cross;
      p1.push(pthis.id);
      fnCheckWinner(p1, "p1", true);
    }
  }
}

/**************************************************Checking winner**************************************************/
function fnCheckWinner(playerArr, playerName, singlePlayer) {
  if (playerArr.length > 2)
    for (let i = 0; i < arrWin.length; i++) {
      if (arrWin[i].every((val) => playerArr.includes(val))) {
        p1.length = 0;
        p2.length = 0;
        document.getElementById("overlay").innerHTML = winLine;
        document.getElementById("winLine").classList.add("win" + (i + 1));
        document.getElementById("overlay").style.display = "block";
        if (playerName === "p1") {
          p1Winnings++;
          document.getElementById("p1Score").innerText = p1Winnings;
        } else {
          p2Winnings++;
          document.getElementById("p2Score").innerText = p2Winnings;
        }
        return true;
      }
    }
  if (p1.length + p2.length === 9) {
    tieWinnings++;
    document.getElementById("overlay").style.display = "block";
    document.getElementById("tieScore").innerText = tieWinnings;
    setTimeout(() => {
      alert("tie");
    }, 100);
    return true;
  }
  if (singlePlayer) {
    setTimeout(() => {
      fnComputerSelection();
    }, 250);
  }
}

/*********************************************Computer's random selection*********************************************/
function fnComputerSelection() {
  let comp = arrAllOptions[Math.floor(Math.random() * 9)];
  if (document.getElementById(comp).innerHTML === "") {
    document.getElementById(comp).innerHTML = circle;
    p2.push(comp);
    fnCheckWinner(p2, "p2");
  } else fnComputerSelection();
}

/*************************************************Going to next round*************************************************/
function fnNextRound() {
  document.getElementById("overlay").innerHTML = "";
  document.getElementById("overlay").style.display = "none";
  p1.length = 0;
  p2.length = 0;
  document.querySelectorAll("td").forEach((i) => {
    i.innerHTML = "";
  });
}
