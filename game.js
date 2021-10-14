const assets = {
  weapons: {
    0: {
      id: 0,
      name: "Dagger",
      damage: 3,
      moves: [1, 2, 8]
    },
    1: {
      id: 1,
      name: "Heavy Club",
      damage: 8,
      moves: [1, 6, 9]
    },
    2: {
      id: 2,
      name: "Scimitar",
      damage: 7,
      moves: [1, 7, 8]
    },
    2: {
      id: 2,
      name: "Dark Wood Wand",
      damage: 5,
      moves: [2, 3, 4]
    },
    3: {
      id: 3,
      name: "Katana",
      damage: 5,
      moves: [1, 7, 2]
    },
    4: {
      id: 4,
      name: "Ivory Wand",
      damage: 7,
      moves: [2, 3, 5]
    },
  },
  enemies: {
    0: {
      id: 0,
      name: "Skeleton",
      hp: 30,
      damage: 3,
      moves: [0, 1, 2, 5]
    },
    1: {
      id: 1,
      name: "Demon",
      hp: 40,
      damage: 5,
      moves: [3, 4, 5, 6]
    },
    2: {
      id: 1,
      name: "Witch",
      hp: 35,
      damage: 3,
      moves: [4, 7, 8]
    },
    3: {
      id: 3,
      name: "Minor God",
      hp: 60,
      damage: 7,
      moves: [1, 2, 6, 9]
    }
  },
  moves: {
    player : {
      1: {
        id: 1,
        name: "Block",
        accuracy: 1,
        special: {type: 'block', value: 10}
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
      5: {
        id: 5,
        name: "Lesser Banishing",
        damage: 2,
        accuracy: 0.75,
        special: {type: "debuff-damage", value: 0.8}
      },
      6: {
        id: 6,
        name: "Crush",
        damage: 8,
        accuracy: 0.75,
      },
      7: {
        id: 7,
        name: "Slice",
        damage: 6,
        accuracy: 0.9,
      },
      8: {
        id: 8,
        name: "Slash",
        damage: 6,
        accuracy: 0.75,
      },
      9: {
        id: 9,
        name: "Swing",
        damage: 6,
        accuracy: 1,
      },
    },
    enemy : {
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
        special: {type: "buff-damage", value: 1.5}
      },
      4: {
        id: 4,
        name: "Evil Eye",
        damage: 4,
        accuracy: 0.95,
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
      },
      7: {
        id: 7,
        name: "Weaken",
        damage: 0,
        accuracy: 1,
        special: {type: "debuff-damage", value: 0.9}
      },
      8: {
        id: 8,
        name: "Cackle",
        damage: 2,
        accuracy: 1,
      },
      9: {
        id: 9,
        name: "Cosmic Eye",
        damage: 22,
        accuracy: 0.1,
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
    4: {
      id: 3,
      name: "an Old Schoolhouse"
    },
    5: {
      id: 5,
      name: "a Dark Cavern"
    },
    6: {
      id: 6,
      name: "a Dense Forest"
    },
    7: {
      id: 7,
      name: "a Ruined Temple"
    },
  }
}

// ---------------------------------------------

const prompt = require('prompt');

prompt.start()
prompt.message = ''
prompt.colors = false;

const random = (array) => array[Math.floor((Math.random()*array.length))]
const rand = () => Math.random()

const clone = (obj) => JSON.parse(JSON.stringify(obj))

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min)

const randomAsset = (asset) => clone(random(Object.values(asset)))

const lineBreak = () => {
  console.log("")
  console.log("----------------------------------------------------")
  console.log("")
}

// ---------------------------------------------

let player = {}
let encounter = {}

const start = () => {
  player = {
    hp: 100,
    gold: 0,
    weapons: [0],
    equip: {
      weapon: 0
    },
    buffs: { 
      attack: 1,
      block: 0
    }
  }

   encounter = {
    index: 0
    // enemy,
    // loot: {
    //   item: 1,
    //   gold: 100
    // }
  }

  lineBreak()
  console.log("Welcome to Asura!")
  console.log("we hope you enjoy your stay")

  main()
}

const newEncounter = () => {
  const enemy = randomAsset(assets.enemies)

  const gold = randomInt(10, 100)
  const item = randomAsset(assets.weapons)

  const scene = randomAsset(assets.scenes)

  encounter = {
    index: encounter.index + 1,
    enemy : {
      ...enemy,
      buffs: { 
        attack: 1,
        block: 0
      }
    },
    loot: {
      item: item,
      gold
    }
  }

  player = {
    ...player,
    buffs: { 
      attack: 1,
      block: 0
    }
  }

  lineBreak()
  lineBreak()
  console.log ("You find yourself in " + scene.name)
  console.log("In front of you you see a " + enemy.name)
  console.log()
  console.log("You have " + player.hp + " hp and " + player.gold + " gold")
}

const usePlayerMenu = async () => {
  const options = ["1", "2"]
  console.log("")
  console.log("What do you want to do? ")
  console.log("")
  console.log("1. Equip")
  console.log("2. Ability")
  const {choice} = await prompt.get(['choice'])
  if (!options.includes(choice)){
    console.log('')
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
  player.weapons.forEach((id, index) => {
    const weapon = assets.weapons[id]
    options.push((index + 1) + "")
    console.log((index + 1) + ". " + weapon.name)
  })
  const {choice} = await prompt.get(['choice'])
  if (!options.includes(choice)){
    console.log('')
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
  console.log("0. Cancel")
  Object.values(assets.moves.player).filter(x => currentWeapon.moves.includes(x.id)).forEach((move, index) => {
    options.push((index + 1) + "")
    console.log((index + 1) + ". " + move.name)
  })
  const {choice} = await prompt.get(['choice'])
  if (!options.includes(choice)){
    console.log('')
    console.log('Invaid choice')
    return useAbilityMenu()
  } else {
    return choice
  }
}

const calculateDamage = (attacker, defender, move, isPlayer = false) => {
  console.log("")
  const youIt = isPlayer ? "You" : "The enemy"
  const maybeS = isPlayer ? "" : "s"
  if (rand() < move.accuracy) {
    if (move.damage > 0) {
      const attackerDamage = attacker.damage || assets.weapons[attacker.equip.weapon].damage
      const damage = (
        Math.floor(
          (attackerDamage + move.damage) 
          * attacker.buffs.attack 
          * ((rand() / 2) + 1)
        ) - defender.buffs.block
      ) 
      defender.hp -= damage
      console.log("It does " + damage + " damage!")
    }
    if (move.special){
      const { type, value } = move.special
      if(type === "block"){
        // only player can block
        attacker.buffs.block = value
        console.log(youIt + " get" + maybeS + " ready to block the enemy strike")
      }else if (type === "heal"){
        attacker.hp += value
        console.log(youIt + " heal" + maybeS + " " + value + " hp")
      }else if (type.startsWith("buff") || type.startsWith("debuff")){
        const isBuff = type.startsWith("buff")
        if (type.endsWith("damage")){
          if (isBuff){
            attacker.buffs.attack *= value
            console.log(youIt + " feel" + maybeS + " stronger")
          } else {
            defender.buffs.attack *= value
            console.log(youIt + " feel" + maybeS + " weaker")
          }
        }
      }
    }
  } else {
    console.log("But it missed!")
  }
}

const playerTurn = async () => {
  player.buffs.block = 0

  let turnIsOver = false
  while ( !turnIsOver ){
    let choice = await usePlayerMenu()
    if (choice == 1){
      choice = await useEquipmentMenu()
      if (choice != 0){
        const newWeapon = assets.weapons[player.weapons[choice - 1]] 
        player.equip.weapon = newWeapon.id
        console.log("")
        console.log("Weapon changed to " + newWeapon.name)
      }
    } else if (choice == 2){
      choice = await useAbilityMenu()
      if (choice == 0){
        continue
      }
      lineBreak()
      const playerWeapon = assets.weapons[player.equip.weapon]
      const chosenAbility = assets.moves.player[playerWeapon.moves[choice - 1]]
      console.log("You use " + chosenAbility.name)
      calculateDamage(player, encounter.enemy, chosenAbility, true)
      if (chosenAbility.damage > 0){
        console.log("")
        const enemyHp = encounter.enemy.hp > 0 ? encounter.enemy.hp : 0
        console.log("The " + encounter.enemy.name + " has " + enemyHp + " hp")
      }
      turnIsOver = true
    }
  }
}

const enemyTurn = () => {
  const enemyMoveId = random(encounter.enemy.moves)
  const enemyMove = assets.moves.enemy[enemyMoveId]
  lineBreak()
  console.log(encounter.enemy.name + " uses " + enemyMove.name)
  calculateDamage(encounter.enemy, player, enemyMove)
  if (enemyMove.damage > 0){
    console.log("")
    const playerHp = player.hp > 0 ? player.hp : 0 
    console.log("You have " +  playerHp + " hp")
  }
}

const getLoot = () => {
  player.gold += encounter.loot.gold
  console.log("You find " + encounter.loot.gold + " gold")
  player.weapons.push(encounter.loot.item.id)
  console.log("You found a " + encounter.loot.item.name + "!")

}

const main = async () => {
  newEncounter ()
  lineBreak()

  while (encounter.enemy.hp > 0){
    if (player.hp < 0) {
      console.log ("YOU DIED")
      lineBreak()
      start()
    } else {
      await playerTurn()
    
      if (encounter.enemy.hp > 0) {
        enemyTurn()
      }
      lineBreak()
    }
  }

  console.log("You beat the " + encounter.enemy.name + "!")
  console.log("")
  getLoot()

  main()
}

start ()

