"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
export default function () {

    const [board, setBoard] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [gameEnded, setGameEnded] = useState(false);
    const [computerTurn, setComputerTurn] = useState(false);

    useEffect(() => {
        createANewGame()
    }, []);

    useEffect(() => {
        if (board!.some(value => value === 0)) {
            setGameEnded(false)
        } else {
            setGameEnded(true)
        }
    }, [board]);


    async function createANewGame() {
        try {
            const response = await fetch('http://localhost:3000/new-game', {
                method: 'POST'
            });

            if (response.ok) {
                const jsonData = await response.json();
                setBoard(jsonData.board);
                setGameEnded(false)
            } else {
                console.error('Failed to post data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function markAsPlayer(cellNumber: number) {
        if (!gameEnded && !computerTurn) {
            try {
                const response = await fetch(`http://localhost:3000/mark-player/${cellNumber}`, {
                    method: 'PUT'
                });

                if (response.ok) {
                    const jsonData = await response.json();
                    setBoard(jsonData.board);
                    setComputerTurn(true)
                    setTimeout(async () => {
                        setComputerTurn(false)
                    }, 1000);
                } else {
                    console.error('Failed to put data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    return (
        <main className="flex justify-center gap-10 p-10 antialiased text-gray-900">
            <Card className="w-[450px] lg:hidden xl:block hidden">
                <CardHeader>
                    <CardTitle>Exercice Tic Tac Toe</CardTitle>
                    <CardDescription>Formation NodeJS</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4 leading-snug">
                            <div className="space-y-2">
                                <p>Dans cet exercice vous devez implementer les méthodes de l'api back afin de permettre de jouer au jeu Tic-Tac-Toe présenté  ci-contre.</p>
                                <p>Vous devrez développer l'api back en <b>TDD</b> et implémenter des apis qui respectent les normes suivantes :</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>la grille de tic tac toe est constitué d'un tableau nommé <b><i>board</i></b> et composé de neuf entiers qui peuvent prendre les valeurs (0,1,2)</li>
                                    <li>
                                        <span>les éléments sont lus depuis la case en haut à gauche jusqu'à la case en bas à droite.</span>
                                        <div className="flex w-full justify-center my-2">
                                            <table className="border-collapse w-[200px] bg-gray-200">
                                                <tr>
                                                    <td className="border border-white p-2 text-center bg-gray-300">A</td>
                                                    <td className="border border-white p-2 text-center bg-gray-300">B</td>
                                                    <td className="border border-white p-2 text-center">C</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-white p-2 text-center">D</td>
                                                    <td className="border border-white p-2 text-center">E</td>
                                                    <td className="border border-white p-2 text-center">F</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-white p-2 text-center">G</td>
                                                    <td className="border border-white p-2 text-center bg-gray-300">H</td>
                                                    <td className="border border-white p-2 text-center">I</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </li>
                                    <li><i className="font-semibold">A</i> se trouve en position <i className="font-medium">board[0]</i>, <i className="font-medium">B board[1]</i> et <i className="font-medium">H board[7]</i></li>
                                    <li>Une case <i className="font-semibold">vide</i> contient la valeur <i className="font-semibold">0</i></li>
                                    <li>Une case marquée par <i className="font-semibold">le joueur (vous)</i> contient la valeur <i className="font-semibold">1</i></li>
                                    <li>Une case marquée par <i className="font-semibold">l'ordinateur</i> contient la valeur <i className="font-semibold">2</i></li>
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
                <CardContent className="flex flex-col justify-start h-full space-y-5">
                    <table className="border-collapse">
                        <tbody className="divide-y-[2px]">
                            {Array.from({ length: 3 }).map((_, rowIndex) => (
                                <tr key={rowIndex} className=" divide-x-[2px]">
                                    {Array.from({ length: 3 }).map((_, colIndex) => (
                                        <td onClick={() => markAsPlayer(rowIndex * 3 + colIndex)} key={colIndex} className="bg-blue-500 w-32 h-32 text-center p-2 rounded-lg text-8xl
                                         text-white">
                                            {board && displayCell(board[rowIndex * 3 + colIndex])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="bg-blue-800 rounded-md p-4 text-white text-center space-y-4">
                        {gameEnded && (
                            <>
                                <p className="text-xs tracking-wide">GAME FINISHED</p>
                                <p className="font-semibold">You won</p>
                            </>
                        )}
                        {!gameEnded && (
                            <>
                                <p className="text-xs tracking-wide">GAME IN PROGRESS</p>
                                <p className="font-semibold">{computerTurn ? "Computer is going to play" : "It's your turn to play"}</p>
                            </>
                        )}
                    </div>
                    {gameEnded && (
                        <div onClick={createANewGame} className="bg-green-500 rounded-md p-4 text-white text-center space-y-4">
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
                <CardContent className="flex flex-col justify-start h-full space-y-3">
                    <p>Les api à implémenter sont présentées ci-dessous, elles doivent obligatoirement être accessible sur <i className="font-semibold">http://localhost:3000</i></p>
                    <div className="bg-gray-200 rounded-md py-1 px-4">
                        <p>POST /new-game</p>
                        <p className="text-xs">Remet le board à zéro et renvoie le json suivant : <br />{"{ board : [0,0,0,0,0,0,0,0,0] }"}</p>
                    </div>
                    <div className="bg-gray-200 rounded-md py-1 px-4">
                        <p>PUT /mark-player/:cellNumber</p>
                        <p className="text-xs">Marque la cellule avec 1, si elle contient la valeur 0<br />Renvoie dans tous les cas le board json</p>
                    </div>
                    <div className="bg-gray-200 rounded-md py-1 px-4">
                        <p>PUT /mark-computer/:cellNumber</p>
                        <p className="text-xs">Marque la cellule avec 2, si elle contient la valeur 0<br />Renvoie dans tous les cas le board json</p>
                    </div>
                </CardContent>
            </Card>
        </main >)
}

function displayCell(cellValue: number) {
    switch (cellValue) {
        case 1: return 'O'
        case 2: return 'X'
        default: return ''
    }
}