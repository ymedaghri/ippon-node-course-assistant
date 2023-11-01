"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const backendUrl = "http://localhost:3000"
const PLAYER_MARK = 1
const COMPUTER_MARK = 2

export default function TicTacToeExercice() {
  const [board, setBoard] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [gameEnded, setGameEnded] = useState(false)
  const [invincible, setInvincible] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(COMPUTER_MARK)
  const [error, setError] = useState<string | null>(null)
  const [pageJustLoaded, setPageJustLoaded] = useState(true)
  const [winningCells, setWinningCells] = useState<number[]>([])
  const [winner, setWinner] = useState<number | null>(null)

  async function createANewGame() {
    try {
      const apiBoard = await fetchApi(
        `${backendUrl}/new-game${invincible ? "?invincible=true" : ""}`,
        "POST",
      )
      setBoard(apiBoard)
      setPageJustLoaded(false)
      setGameEnded(false)
      setWinningCells([])
      setWinner(null)
    } catch (error) {
      setError(
        `Erreur lors de la communication avec ${backendUrl}/new-game en mode POST, vérifiez que la requête POST ${backendUrl}/new-game retourne un array de 9 elements nommé board et contenant uniquement les valeurs 0`,
      )
    }
  }

  useEffect(() => {
    if (!pageJustLoaded) {
      const winningCells = getWinningCells(board, currentPlayer)
      if (winningCells.length === 3) {
        setWinner(currentPlayer)
        setWinningCells(winningCells)
        setGameEnded(true)
      } else {
        if (board!.every((value) => value !== 0)) {
          setGameEnded(true)
        } else {
          setCurrentPlayer(
            currentPlayer === PLAYER_MARK ? COMPUTER_MARK : PLAYER_MARK,
          )
        }
      }
    }
  }, [board])

  useEffect(() => {
    if (!pageJustLoaded && !gameEnded) {
      const getComputerMark = async () => {
        return await fetchApi(`${backendUrl}/get-computer-mark`)
      }
      if (currentPlayer === COMPUTER_MARK) {
        setTimeout(async () => {
          try {
            const apiBoard = await getComputerMark()
            setBoard(apiBoard)
          } catch (error) {
            setError(
              `Erreur lors de la communication avec ${backendUrl}/get-computer-mark en mode GET, vérifiez que la requête GET ${backendUrl}/get-computer-mark retourne un array de 9 elements nommé board et contenant uniquement les valeurs 0`,
            )
          }
        }, 300)
      }
    }
  }, [currentPlayer])
  async function markAsPlayer(cellNumber: number) {
    if (
      !pageJustLoaded &&
      !gameEnded &&
      currentPlayer === PLAYER_MARK &&
      board[cellNumber] === 0
    ) {
      try {
        const apiBoard = await fetchApi(
          `${backendUrl}/mark-player/${cellNumber}`,
          "PUT",
        )
        setBoard(apiBoard)
      } catch (error) {
        setError(
          `Erreur lors de la communication avec ${backendUrl}/mark-player/${cellNumber} en mode PUT, vérifiez que la requête PUT ${backendUrl}/mark-player/${cellNumber} retourne un array de 9 elements nommé board et contenant uniquement les valeurs 0`,
        )
      }
    }
  }

  return (
    <main className="flex justify-center gap-10 p-10 text-gray-900 antialiased">
      {error && (
        <AlertDialog open={error !== null}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Erreur !</AlertDialogTitle>
              <AlertDialogDescription>{error}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setError(null)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Card className="hidden w-[450px] lg:hidden xl:block">
        <CardHeader>
          <CardTitle>Exercice Tic Tac Toe</CardTitle>
          <CardDescription>Formation NodeJS</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4 leading-snug">
              <div className="space-y-2">
                <p>
                  Dans cet exercice vous devez implementer les méthodes de
                  l&apos;api back afin de permettre de jouer au jeu Tic-Tac-Toe
                  présenté ci-contre.
                </p>
                <p>
                  Vous devrez développer l&apos;api back en <b>TDD</b> et
                  implémenter des apis qui respectent les normes suivantes :
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    la grille de tic tac toe est constitué d&apos;un tableau
                    nommé{" "}
                    <b>
                      <i>board</i>
                    </b>{" "}
                    et composé de neuf entiers qui peuvent prendre les valeurs
                    (0,1,2)
                  </li>
                  <li>
                    <span>
                      les éléments sont lus depuis la case en haut à gauche
                      jusqu&apos;à la case en bas à droite.
                    </span>
                    <div className="my-2 flex w-full justify-center">
                      <table className="w-[200px] border-collapse bg-gray-200">
                        <tbody>
                          <tr>
                            <td className="border border-white bg-gray-300 p-2 text-center">
                              A
                            </td>
                            <td className="border border-white bg-gray-300 p-2 text-center">
                              B
                            </td>
                            <td className="border border-white p-2 text-center">
                              C
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-white p-2 text-center">
                              D
                            </td>
                            <td className="border border-white p-2 text-center">
                              E
                            </td>
                            <td className="border border-white p-2 text-center">
                              F
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-white p-2 text-center">
                              G
                            </td>
                            <td className="border border-white bg-gray-300 p-2 text-center">
                              H
                            </td>
                            <td className="border border-white p-2 text-center">
                              I
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li>
                  <li>
                    <i className="font-semibold">A</i> se trouve en position{" "}
                    <i className="font-medium">board[0]</i>,{" "}
                    <i className="font-medium">B board[1]</i> et{" "}
                    <i className="font-medium">H board[7]</i>
                  </li>
                  <li>
                    Une case <i className="font-semibold">vide</i> contient la
                    valeur <i className="font-semibold">0</i>
                  </li>
                  <li>
                    Une case marquée par{" "}
                    <i className="font-semibold">le joueur (vous)</i> contient
                    la valeur <i className="font-semibold">1</i>
                  </li>
                  <li>
                    Une case marquée par{" "}
                    <i className="font-semibold">l&apos;ordinateur</i> contient
                    la valeur <i className="font-semibold">2</i>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Plateau de Jeu</CardTitle>
          <CardDescription>Que le meilleur gagne !</CardDescription>
        </CardHeader>
        <CardContent className="flex h-full flex-col justify-start space-y-5">
          <div className="flex items-center justify-end space-x-2">
            <Switch
              id="invincible-mode"
              onCheckedChange={setInvincible}
              disabled={!pageJustLoaded && !gameEnded}
            />
            <Label htmlFor="invincible-mode">Invincible Computer Mode</Label>
          </div>
          <table className="border-collapse">
            <tbody className="divide-y-[2px]">
              {Array.from({ length: 3 }).map((_, rowIndex) => (
                <tr key={rowIndex} className=" divide-x-[2px]">
                  {Array.from({ length: 3 }).map((_, colIndex) => (
                    <td
                      data-selector={`board.row(${rowIndex}).col(${colIndex})`}
                      onClick={() => markAsPlayer(rowIndex * 3 + colIndex)}
                      key={colIndex}
                      className={`h-32 w-32 rounded-lg  p-2 text-center text-8xl text-white ${
                        winningCells.includes(rowIndex * 3 + colIndex)
                          ? "bg-orange-400"
                          : invincible
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }
                        }`}
                    >
                      {board && displayCell(board[rowIndex * 3 + colIndex])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {!pageJustLoaded && (
            <div className="space-y-4 rounded-md bg-blue-800 p-4 text-center text-white">
              {gameEnded && (
                <>
                  <p className="text-xs tracking-wide">GAME FINISHED</p>
                  <p data-selector="text.winner" className="font-semibold">
                    {" "}
                    {winner === 1
                      ? "You won !"
                      : winner === 2
                      ? "Computer has won"
                      : "Nobody won, so boring !"}
                  </p>
                </>
              )}
              {!gameEnded && (
                <>
                  <p className="text-xs tracking-wide">GAME IN PROGRESS</p>
                  <p className="font-semibold">
                    {currentPlayer == PLAYER_MARK
                      ? "It's your turn to play"
                      : "Computer is playing ..."}
                  </p>
                </>
              )}
            </div>
          )}

          {(pageJustLoaded || gameEnded) && (
            <div
              data-selector="new-game-button"
              onClick={createANewGame}
              className="space-y-4 rounded-md bg-green-500 p-4 text-center text-white"
            >
              <p className="font-semibold uppercase">Click for a New Game</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Plateau de Jeu</CardTitle>
          <CardDescription>Que le meilleur gagne !</CardDescription>
        </CardHeader>
        <CardContent className="flex h-full flex-col justify-start space-y-3">
          <p>
            Les api à implémenter sont présentées ci-dessous, elles doivent
            obligatoirement être accessible sur{" "}
            <i className="font-semibold">{backendUrl}</i>
          </p>
          <div className="rounded-md bg-gray-200 px-4 py-1">
            <p>POST /new-game</p>
            <p className="text-xs">
              Remet le board à zéro et renvoie le json suivant : <br />
              {"{ board : [0,0,0,0,0,0,0,0,0] }"}
            </p>
          </div>
          <div className="rounded-md bg-gray-200 px-4 py-1">
            <p>PUT /mark-player/:cellNumber</p>
            <p className="text-xs">
              Marque la cellule avec 1, si elle contient la valeur 0<br />
              Renvoie dans tous les cas le board json
            </p>
          </div>
          <div className="rounded-md bg-gray-200 px-4 py-1">
            <p>GET /get-computer-mark</p>
            <p className="text-xs">
              Laisse l&apos;ordinateur marquer la cellule la plus appropriée
              avec 2, puis renvoie le board json contenant cette modification
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

async function fetchApi(path: string, method: string = "GET") {
  const response = await fetch(path, { method })
  if (response.ok) {
    const jsonData = await response.json()
    if (
      !isArrayOfNumbers(jsonData?.board) ||
      jsonData.board.length != 9 ||
      jsonData.board!.some((value: number) => value < 0) ||
      jsonData.board!.some((value: number) => value > 2)
    ) {
      throw new Error()
    }
    return jsonData.board
  }
  throw new Error()
}

function isArrayOfNumbers(arr: any): arr is number[] {
  if (!Array.isArray(arr)) {
    return false
  }

  return arr.every((element) => typeof element === "number" && !isNaN(element))
}

function displayCell(cellValue: number) {
  switch (cellValue) {
    case PLAYER_MARK:
      return "O"
    case COMPUTER_MARK:
      return "X"
    default:
      return ""
  }
}

function getWinningCells(board: number[], mark: number) {
  for (let i = 0; i < 3; i++) {
    // Check rows
    if (
      board[i * 3] === mark &&
      board[i * 3 + 1] === mark &&
      board[i * 3 + 2] === mark
    )
      return [i * 3, i * 3 + 1, i * 3 + 2]
    // Check cols
    if (board[i] === mark && board[i + 3] === mark && board[i + 6] === mark)
      return [i, i + 3, i + 6]
  }

  // Check diagonals
  if (board[0] === mark && board[4] === mark && board[8] === mark)
    return [0, 4, 8]
  if (board[2] === mark && board[4] === mark && board[6] === mark)
    return [2, 4, 6]

  return []
}
