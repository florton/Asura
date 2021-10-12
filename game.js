const assets = {
  weapons: {
    0: {
      id: 0,
      name: "Dagger",
      damage: 3,
      moves: [2]
    },
    1: {
      id: 1,
      name: "Heavy Club",
      damage: 8,
      moves: [0]
    },
    2: {
      id: 2,
      name: "Scimitar",
      damage: 7,
      moves: [1]
    },
    2: {
      id: 2,
      name: "Dark Wood Wand",
      damage: 5,
      moves: [2, 3, 4]
    },
    3: {
      id: 0,
      name: "Katana",
      damage: 5,
      moves: [1, 2]
    },
  },
  enemies: {
    0: {
      id: 0,
      name: "Skeleton",
      hp: 20,
      moves: [0, 1, 2, 5]
    },
    0: {
      id: 0,
      name: "Demon",
      hp: 20,
      moves: [3, 4, 5, 6]
    }
  },
  moves: {
    player : {
      0: {
        id: 0,
        name: "Crush",
        damage: 8,
        accuracy: 0.75,
      },
      1: {
        id: 1,
        name: "Slice",
        damage: 6,
        accuracy: 0.9,
      },
      2: {
        id: 2,
        name: "Stab",
        damage: 4,
        accuracy: 1,
      },
      3: {
        id: 3,
        name: "Health Chant",
        damage: 0,
        accuracy: 1,
        special: {type: "heal", value: 8}
      },
      4: {
        id: 4,
        name: "Unholy Power",
        damage: 9,
        accuracy: 0.75,
      },
    },
    ememy : {
      0: {
        id: 0,
        name: "Bone Roller",
        damage: 6,
        accuracy: 0.9,
      },
      1: {
        id: 1,
        name: "Crazy Wisdom",
        damage: 10,
        accuracy: 0.5,
      },
      2: {
        id: 2,
        name: "Undead Prayer",
        damage: 0,
        accuracy: 1,
        special: {type: "heal", value: 5}
      },
      3: {
        id: 3,
        name: "Dark Oath",
        damage: 0,
        accuracy: 1,
        special: {type: "boost-damage", value: 1.5}
      },
      4: {
        id: 4,
        name: "Evil Eye",
        damage: 4,
        accuracy: 1,
      },
      5: {
        id: 5,
        name: "Claw",
        damage: 6,
        accuracy: 0.8,
      },
      6: {
        id: 6,
        name: "Dark Power",
        damage: 8,
        accuracy: 0.7,
      }
    }
  },
  scenes: {
    0: {
      id: 0,
      name: "a Spooky Castle"
    },
    1: {
      id: 1,
      name: "the Asphodel Fields"
    },
    2: {
      id: 2,
      name: "a Plane of Cosmic Torment"
    },
    3: {
      id: 3,
      name: "a Burning Desert"
    },
  }
}

// ---------------------------------------------

const prompt = require('prompt');

prompt.start()
prompt.message = ''
prompt.colors = false;

const random = (array) => array[Math.floor((Math.random()*array.length))]

const clone = (obj) => JSON.parse(JSON.stringify(obj))

const randomInt = (min, max) => Math.random() * (max - min) + min

const randomAsset = (asset) => clone(random(Object.values(asset)))

const lineBreak = () => {
  console.log("")
  console.log("----------------------------------------------------")
  console.log("")
}

// ---------------------------------------------

let player = {}
let gamestate = {}

const start = () => {
  player = {
    hp: 100,
    gold: 0,
    weapons: [0],
    equip: {
      weapon: [0]
    }
  }

  gamestate = {
    encounter : {
      index: 0
    }
  }

  console.log("Welcome to Asura!")
  console.log("we hope you enjoy your stay")
  lineBreak()

  main()
}

const newEncounter = () => {
  const enemy = randomAsset(assets.enemies)

  const gold = randomInt(10, 100)
  const item = randomAsset(assets.weapons)

  const scene = randomAsset(assets.scenes)

  gamestate.encounter = {
    index: gamestate.encounter.index + 1,
    enemy,
    loot: {
      item,
      gold
    }
  }

  console.log ("You find yourself in " + scene.name)
  console.log("In front of you you see a " + enemy.name)
}

const usePlayerMenu = async () => {
  const options = ["1", "2"]
  console.log("")
  console.log("1. Equip")
  console.log("2. Ability")
  console.log("What do you want to do? ")
  const {choice} = await prompt.get(['choice'])
  if (!options.includes(choice)){
    console.log('Invaid choice')
    return usePlayerMenu()
  } else {
    return choice
  }
}

const useEquipmentMenu = async () => {
  const currentWeapon = assets.weapons[player.equip.weapon]
  const options = ["0"]
  console.log("")
  console.log("Your current weapon is the " + currentWeapon.name)
  console.log("Would you like to switch weapons?")
  console.log("")
  console.log("0. Cancel")
  player.weapons.filter(x => x != currentWeapon.id).forEach((id, index) => {
    const weapon = assets.weapons[id]
    options.push((index + 1) + "")
    console.log((index + 1) + ". " + weapon.name)
  })
  const {choice} = await prompt.get(['choice'])
  if (!options.includes(choice)){
    console.log('Invaid choice')
    return useEquipmentMenu()
  } else {
    return choice
  }
}

const useAbilityMenu = async () => {
  const currentWeapon = assets.weapons[player.equip.weapon]
  const options = ["0"]
  console.log("")
  console.log("0. Block")
  Object.values(assets.moves.player).filter(x => currentWeapon.moves.includes(x.id)).forEach((move, index) => {
    options.push((index + 1) + "")
    console.log((index + 1) + ". " + move.name)
  })
  const {choice} = await prompt.get(['choice'])
  if (!options.includes(choice)){
    console.log('Invaid choice')
    return useAbilityMenu()
  } else {
    return choice
  }
}

const playerTurn = async () => {
  let turnIsOver = false
  while ( !turnIsOver ){
    let choice = await usePlayerMenu()
    if (choice == 1){
      choice = await useEquipmentMenu()
      if (choice != 0){
        console.log("Change weapon to " + choice)
      }
    } else if (choice == 2){
      choice = await useAbilityMenu()
      console.log("Use ability " + choice)
      turnIsOver = true
    }
  }
}

const enemyTurn = () => {
  console.log("Ememy turn")
}

const main = async () => {
  newEncounter ()

  while (gamestate.encounter.enemy.hp > 0){
    if (player.hp < 0) {
      console.log ("YOU DIED")
      lineBreak()
      start()
    }
    await playerTurn()
    enemyTurn()
  }
}

start ()

