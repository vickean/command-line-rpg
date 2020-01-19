const inquirer = require("inquirer");

/** TODO:
 *  create map object/array containing text to display
 *  and array of options to players.
 *  work out simple movement first.
 *
 *  Changing of the navigation cues from cardinal NESW directions to FRBL
 *  relative to players current orientation could make things more interesting.
 */

// ╔╝   ╚╗╔═════╗╔═════╗
// ║     ╚╝     ╚╝     ║
// ║                   ║
// ║ 0,2    1,2    2,2 ║
// ║                   ║
// ║     ╔╗     ╔╗     ║
// ╚═════╝╚═════╝╚╗   ╔╝
// ╔═════╗╔═════╗╔╝   ╚╗
// ║     ╚╝     ║║     ║
// ║            ║║     ║
// ║ 0,1    1,1 ║║ 2,1 ║
// ║            ║║     ║
// ║     ╔╗     ║║     ║
// ╚╗   ╔╝╚═════╝╚╗   ╔╝
// ╔╝   ╚╗╔═════╗╔╝   ╚╗
// ║     ╚╝     ╚╝     ║
// ║                   ║
// ║ 0,0    1,0    2,0 ║
// ║                   ║
// ║     ╔╗     ╔╗     ║
// ╚╗   ╔╝╚═════╝╚═════╝

/** door: [N,E,S,W] */
const gameMap = {
  rooms: {
    "0,0": {
      door: ["0,1", "1,0", "start", ""],
      text: `This is room "0,0".`
    },
    "1,0": {
      door: ["", "2,0", "", "0,0"],
      text: "1,0"
    },
    "2,0": {
      door: ["2,1", "", "", "1,0"],
      text: "2,0"
    },
    "0,1": {
      door: ["", "1,1", "0,0", ""],
      text: "0,1"
    },
    "1,1": {
      door: ["", "", "", "0,1"],
      text: "1,1"
    },
    "2,1": {
      door: ["2,2", "", "2,0", ""],
      text: "2,1"
    },
    "0,2": {
      door: ["end", "1,2", "", ""],
      text: "0,2"
    },
    "1,2": {
      door: ["", "2,2", "", "0,2"],
      text: "1,2"
    },
    "2,2": {
      door: ["", "", "2,1", "1,2"],
      text: "2,2"
    }
  }
};

const randEncounterArr = [
    {
        text: 'A dungeon Troll has appeared!',       
    },
    {
        text: 'A dungeon Orc has appeared!',       
    },
    {
        text: 'A dungeon Dragon has appeared!',       
    },
    {
        text: 'A dungeon Coconut has appeared!',       
    },
]

// gameLoop()

let currRoom = "";
let currRoomDoors = [];
let stepCounter = 0;

const startRoom = () => {
  const startRoomCoord = Object.entries(gameMap.rooms).filter(el => {
    const doorArr = el[1].door;
    if (doorArr.indexOf("start") > -1) {
      return true;
    } else {
      return false;
    }
  });
  return startRoomCoord[0][0];
};

// initialize start room
currRoom = startRoom();

// helper funcs
const currRoomDoorOptions = currRoom => {
  const currRoomDoorArr = gameMap.rooms[currRoom].door;
  const outputArr = [];

  currRoomDoorArr.map((el, i) => {
    const dirHash = {
      0: "North",
      1: "East",
      2: "South",
      3: "West"
    };
    if (el != "" && el != "start") {
      outputArr.push(dirHash[i]);
    }
  });
  return outputArr;
};

// encounter code


// game loop main function
const navigation = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "playerChoice",
        message: 
            `\n` + 
            `=====\n` +
            `${gameMap.rooms[currRoom].text} \n` +
            `Where do you want to go? \n` +
            `[INSERT ENCOUNTER CODE HERE] \n` +
            `=====\n`,
        choices: currRoomDoorOptions(currRoom)
      }
    ])
    .then(input => {
      let nextRoom = "";
      let escapeMsg = `Success!! You've escaped in ${stepCounter} moves!`;
      switch (input.playerChoice) {
        case "North":
          nextRoom = gameMap.rooms[currRoom].door[0];
          if (nextRoom === "end") {
            console.log(escapeMsg);
            break;
          }
          currRoom = nextRoom;
          stepCounter++;
          navigation();
          break;
        case "East":
          nextRoom = gameMap.rooms[currRoom].door[1];
          if (nextRoom === "end") {
            console.log(escapeMsg);
            break;
          }
          currRoom = nextRoom;
          stepCounter++;
          navigation();
          break;
        case "South":
          nextRoom = gameMap.rooms[currRoom].door[2];
          if (nextRoom === "end") {
            console.log(escapeMsg);
            break;
          }
          currRoom = nextRoom;
          stepCounter++;
          navigation();
          break;
        case "West":
          nextRoom = gameMap.rooms[currRoom].door[3];
          if (nextRoom === "end") {
            console.log(escapeMsg);
            break;
          }
          currRoom = nextRoom;
          stepCounter++;
          navigation();
          break;
        default:
          navigation();
      }
    });
};

navigation();
