import Barcode from "./Barcode";
import BoardItinerary from "./BoardItinerary";
import FinishCloud from "./FinishCloudSvg";
import GamePadPanel from "./GamePadPanel";
import JailOne from "./JailOne";
import JailTwo from "./JailTwo";
import LadderOne from "./LadderOne";
import LadderTwo from "./LadderTwo";
import PlayerFourYellow from "./PlayerFourYellow";
import PlayerOnePink from "./PlayerOnePink";
import PlayerThreeBlue from "./PlayerThreeBlue";
import PlayerTwoRed from "./PlayerTwoRed";
import QuestionsPanel from "./QuestionsPanel";
import StartCloud from "./StartCloudSvg";

export default function BoardSvg({
  colorAssociation,
  aPlayerIsPlaying,
  players,
  dice_1,
  dice_2,
  rollDices,
  dicesFill,
  textGame,
  showQuestionsPanel,
  currentQuestion,
  showBarCode
}: {
  colorAssociation: { color_2: string; color_3: string }
  aPlayerIsPlaying: boolean
  players: any
  dice_1: number
  dice_2: number
  rollDices: any
  dicesFill: string
  textGame: string
  showQuestionsPanel: boolean
  currentQuestion?: { text: string, answer_1: string, answer_2: string, answer_3: string }
  showBarCode: boolean
}) {
  return (
    <svg
      viewBox="0 0 500 360"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-20 w-[68rem] md:mt-5"
    >
      <BoardItinerary />
      <LadderOne />
      <LadderTwo />
      <StartCloud />
      <FinishCloud />
      {showBarCode && <Barcode />}
      <PlayerOnePink position={players[1]} />
      <PlayerTwoRed position={players[2]} />
      <PlayerThreeBlue position={players[3]} />
      <PlayerFourYellow position={players[4]} />
      <JailOne />
      <JailTwo />
      <GamePadPanel dice_1={dice_1} dice_2={dice_2} textGame={textGame}
        aPlayerIsPlaying={aPlayerIsPlaying} rollDices={rollDices} colorAssociation={colorAssociation} dicesFill={dicesFill} />
      <QuestionsPanel show={showQuestionsPanel} question={currentQuestion} />
    </svg>
  )
}
