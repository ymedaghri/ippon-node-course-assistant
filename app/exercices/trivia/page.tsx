"use client"

import { useState } from "react"
import BoardSvg from "./svg-components/boardSvg"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type Players = Record<
  string,
  {
    position: number
    positions: { cx: string; cy: string }[]
    cx: string
    cy: string
    inPenaltyBox: boolean
  }
>

function initializePlayers(): Players {
  return {
    "1": {
      position: 0,
      positions: [
        { cx: "116.8", cy: "89.9" },
        { cx: "162.8", cy: "88.6" },
        { cx: "211.4", cy: "79.9" },
        { cx: "260.4", cy: "70.9" },
        { cx: "311.8", cy: "71.4" },
        { cx: "361.8", cy: "94.4" },
        { cx: "379.4", cy: "151.1" },
        { cx: "344.6", cy: "197.5" },
        { cx: "282.6", cy: "201.5" },
        { cx: "230.6", cy: "184.5" },
        { cx: "178.607", cy: "168.5" },
        { cx: "124.607", cy: "164.5" },
        { cx: "84.607", cy: "184.5" },
        { cx: "70.041", cy: "219.572" },
        { cx: "85.628", cy: "259.826" },
        { cx: "133.628", cy: "267.826" },
        { cx: "195.628", cy: "257.826" },
        { cx: "258.628", cy: "255.826" },
        { cx: "314.628", cy: "262.826" },
        { cx: "363.716", cy: "271.078" },
      ],
      cx: "14.869",
      cy: "102.946",
      inPenaltyBox: false,
    },
    "2": {
      position: 0,
      positions: [
        { cx: "116.3", cy: "107.7" },
        { cx: "165.6", cy: "107.8" },
        { cx: "215.0", cy: "98.4" },
        { cx: "262.0", cy: "89.4" },
        { cx: "308.3", cy: "89.9" },
        { cx: "348.3", cy: "106.9" },
        { cx: "362.3", cy: "145.7" },
        { cx: "337.3", cy: "178.9" },
        { cx: "286.3", cy: "181.9" },
        { cx: "236.3", cy: "166.9" },
        { cx: "181.282", cy: "150.866" },
        { cx: "119.282", cy: "146.866" },
        { cx: "70.233", cy: "171.434" },
        { cx: "51.256", cy: "221.15" },
        { cx: "73.949", cy: "273.55" },
        { cx: "128.916", cy: "287.501" },
        { cx: "190.916", cy: "277.501" },
        { cx: "254.916", cy: "274.501" },
        { cx: "310.916", cy: "281.501" },
        { cx: "349.486", cy: "309.152" },
      ],
      cx: "62.7",
      cy: "66.6",
      inPenaltyBox: false,
    },
    "3": {
      position: 0,
      positions: [
        { cx: "136.4", cy: "108.0" },
        { cx: "187.2", cy: "105.0" },
        { cx: "235.7", cy: "94.9" },
        { cx: "282.7", cy: "87.9" },
        { cx: "327.1", cy: "94.4" },
        { cx: "360.1", cy: "121.4" },
        { cx: "356.0", cy: "162.8" },
        { cx: "317.0", cy: "183.8" },
        { cx: "266.0", cy: "177.8" },
        { cx: "216.0", cy: "160.8" },
        { cx: "161.032", cy: "147.788" },
        { cx: "99.032", cy: "153.788" },
        { cx: "57.333", cy: "188.285" },
        { cx: "54.617", cy: "241.209" },
        { cx: "92.565", cy: "284.737" },
        { cx: "151.266", cy: "285.256" },
        { cx: "213.266", cy: "275.256" },
        { cx: "276.266", cy: "276.256" },
        { cx: "330.266", cy: "286.256" },
        { cx: "390.859", cy: "318.283" },
      ],
      cx: "87.5",
      cy: "88.6",
      inPenaltyBox: false,
    },
    "4": {
      position: 0,
      positions: [
        { cx: "137.0", cy: "90.5" },
        { cx: "184.5", cy: "85.7" },
        { cx: "231.6", cy: "76.7" },
        { cx: "280.6", cy: "68.7" },
        { cx: "333.0", cy: "77.1" },
        { cx: "375.0", cy: "111.1" },
        { cx: "372.1", cy: "170.5" },
        { cx: "322.0", cy: "202.7" },
        { cx: "262.0", cy: "196.7" },
        { cx: "211.0", cy: "177.7" },
        { cx: "158.002", cy: "165.734" },
        { cx: "106.002", cy: "170.734" },
        { cx: "73.31", cy: "198.519" },
        { cx: "72.31", cy: "238.519" },
        { cx: "101.775", cy: "269.358" },
        { cx: "155.444", cy: "266.546" },
        { cx: "217.444", cy: "256.546" },
        { cx: "280.444", cy: "257.546" },
        { cx: "335.444", cy: "267.546" },
        { cx: "401.191", cy: "267.536" },
      ],
      cx: "46.4",
      cy: "114.3",
      inPenaltyBox: false,
    },
  }
}

const positionLadder1 = [
  { cx: "274.1", cy: "109.4" },
  { cx: "275.1", cy: "119.4" },
  { cx: "276.1", cy: "129.4" },
  { cx: "277.1", cy: "139.4" },
  { cx: "278.1", cy: "149.4" },
  { cx: "279.1", cy: "161.4" },
]

const positionLadder2 = [
  { cx: "165.8", cy: "186" },
  { cx: "164.8", cy: "198" },
  { cx: "163.6", cy: "210.5" },
  { cx: "162.2", cy: "222.5" },
  { cx: "161.2", cy: "235.5" },
  { cx: "160.0", cy: "247.0" },
]

const colorAssociations = [
  { color_1: "#ff00b1", color_2: "#ff00b166", color_3: "#ff00b155" },
  { color_1: "#ff0202", color_2: "#ff020266", color_3: "#ff020255" },
  { color_1: "#0090ff", color_2: "#0090ff66", color_3: "#0090ff55" },
  { color_1: "#fff400", color_2: "#fff400aa", color_3: "#fff40077" },
]

export default function Trivia() {
  const [dice_1, setDice_1] = useState(0)
  const [dice_2, setDice_2] = useState(0)
  const [dicesFill, setDicesFill] = useState("white")
  const [players, setPlayers] = useState<Players>(initializePlayers())
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [aPlayerIsPlaying, setAPlayerIsPlaying] = useState(false)
  const [colorAssociation, setColorAssociation] = useState(colorAssociations[0])
  const [showQuestionsPanel, setShowQuestionsPanel] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<{ text: string, answer_1: string, answer_2: string, answer_3: string }>()
  const [showBarCode, setShowBarCode] = useState(false)

  const [textGame, setTextGame] = useState("Joueur 1, à toi de jouer !")

  function cannotGetOutOfPenaltyBox(): Promise<void> {
    return new Promise((resolve) => {
      let count = 0
      let whiteColor = true
      const animateDicesColor = () => {
        if (count++ <= 21) {
          if (whiteColor) {
            whiteColor = false
            setDicesFill("red")
            setTextGame(`Tu dois faire un double !`)
          } else {
            whiteColor = true
            setDicesFill("white")
            setTextGame(``)
          }
          setTimeout(animateDicesColor, 100)
        } else {
          resolve()
        }
      }
      animateDicesColor()
    })
  }

  function descendLadder(
    positionsLadder: { cx: string; cy: string }[],
    resultPosition: number,
  ): Promise<void> {
    return new Promise((resolve) => {
      let count = 0
      const player = players[currentPlayer]
      const descend = () => {
        if (count <= 5) {
          setPlayers({
            ...players,
            [currentPlayer]: { ...player, ...positionsLadder[count++] },
          })
          setTimeout(descend, 300)
        } else {
          player.position = resultPosition
          setPlayers({
            ...players,
            [currentPlayer]: {
              ...player,
              ...player.positions[resultPosition - 1],
            },
          })
          resolve()
        }
      }
      descend()
    })
  }

  function animatePlayer(stepsToGo: number): Promise<void> {
    return new Promise((resolve) => {
      let count = stepsToGo
      const player = players[currentPlayer]
      const play = () => {
        count--
        player.position++
        if (count >= 0) {
          setPlayers({
            ...players,
            [currentPlayer]: {
              ...player,
              ...player.positions[player.position - 1],
            },
          })
          setTimeout(play, 300)
        } else {
          if (player.position === 5) {
            descendLadder(positionLadder1, 9).then(() => resolve())
          } else if (player.position === 12) {
            descendLadder(positionLadder2, 16).then(() => resolve())
          } else resolve()
        }
      }
      play()
    })
  }

  function animateDices(): Promise<{ dice1: number; dice2: number }> {
    return new Promise((resolve) => {
      let count = 0
      const roll = () => {
        const dice1 = Math.ceil(Math.random() * 6)
        setDice_1(dice1)
        const dice2 = Math.ceil(Math.random() * 6)
        setDice_2(dice2)
        count++
        if (count < 10) {
          setTimeout(roll, 100)
        } else {
          resolve({ dice1, dice2 })
        }
      }
      roll()
    })
  }

  function isGameFinished() {
    return (
      Object.values(players).filter((player) => player.position >= 20)
        .length === 3
    )
  }

  function setNextPlayer() {
    let nextPlayer = currentPlayer

    do {
      nextPlayer = nextPlayer + 1
      if (nextPlayer === 5) {
        nextPlayer = 1
      }
    } while (players[nextPlayer].position == 20)

    setCurrentPlayer(nextPlayer)
    setColorAssociation(colorAssociations[nextPlayer - 1])
    setTextGame(`Player ${nextPlayer}, à toi de jouer !`)
  }

  const rollDices = async () => {
    setAPlayerIsPlaying(true)

    const { dice1, dice2 } = await animateDices()
    if (
      (players[currentPlayer].position == 5 ||
        players[currentPlayer].position == 13) &&
      dice1 !== dice2
    ) {
      await cannotGetOutOfPenaltyBox()
    } else {
      if (players[currentPlayer].position + dice1 + dice2 >= 20) {
        const restToFinish = 20 - players[currentPlayer].position
        if (restToFinish) {
          await animatePlayer(restToFinish)
        }
        setTextGame(`Player ${currentPlayer} à Gagné !`)
      } else {
        await animatePlayer(dice1 + dice2)
      }
    }

    if (isGameFinished()) {
      alert("Game is finished")
    } else {
      // setShowQuestionsPanel(true)
      // setCurrentQuestion({
      //   text: "Quel est le rôle principal de TSOA dans une application TypeScript ?",
      //   answer_1: "Compiler le code TypeScript en JavaScript", answer_2: "Créer des interfaces utilisateur", answer_3: "Générer automatiquement des documents OpenAPI (Swagger) et des routes pour les applications Express"
      // })
      /*#0090ff66  setCurrentQuestion({
          text: "Quel est un avantage majeur de l'utilisation de TSOA dans le développement d'APIs avec TypeScript ?",
          answer_1: "Il fournit une intégration native avec les bases de données SQL et NoSQL.", answer_2: "Il assure la cohérence entre le code TypeScript et la documentation API, réduisant ainsi les erreurs de synchronisation.", answer_3: "Il permet la compilation de TypeScript en WebAssembly pour des performances accrues."
        })
        */
      setNextPlayer()
      setAPlayerIsPlaying(false)
    }
  }

  return (
    <div className="flex h-screen items-start justify-center">

      <div className="flex items-center justify-end space-x-2 border bg-white m-2 p-2 rounded-lg">
        <Switch id="barcode-switch"
          onCheckedChange={setShowBarCode}
        />
        <Label htmlFor="barcode-switch">Barcode</Label>
      </div>
      <BoardSvg
        colorAssociation={colorAssociation}
        aPlayerIsPlaying={aPlayerIsPlaying}
        players={players}
        dice_1={dice_1}
        dice_2={dice_2}
        rollDices={rollDices}
        dicesFill={dicesFill}
        textGame={textGame}
        showQuestionsPanel={showQuestionsPanel}
        currentQuestion={currentQuestion}
        showBarCode={showBarCode}
      />
    </div>
  )
}
