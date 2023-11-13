import DiceOne from "./DiceOne";

export default function GamePadPanel(
    { dice_1, dice_2, textGame, aPlayerIsPlaying, rollDices, colorAssociation, dicesFill }: { dice_1: number; dice_2: number; textGame: string; colorAssociation: { color_2: string; color_3: string }; aPlayerIsPlaying: boolean; rollDices: any; dicesFill: string }) {
    return (<>
        <g onClick={() => !aPlayerIsPlaying && rollDices()} data-testid="game-pad-panel-id">
            <rect
                x="95.414"
                y="9.012"
                width="235.605"
                height="40.035"
                stroke={colorAssociation.color_2}
                fill={colorAssociation.color_3}
                rx="5"
                ry="5"
            />
            <DiceOne value={dice_1} dicesFill={dicesFill} />
            <g transform="matrix(1, 0, 0, 1, 35.042313, -5.914939)">
                <rect
                    x="110.277"
                    y="24.21"
                    width="23.144"
                    height="23.144"
                    rx="2"
                    ry="15"
                    fill={dicesFill}
                    stroke="black"
                    style={{ strokeWidth: "2px" }}
                />
                {dice_2 == 1 && <circle cx="122" cy="36" r="2" fill="black" />}
                {dice_2 == 2 && (
                    <>
                        <circle cx="116" cy="31" r="2" fill="black" />
                        <circle cx="128" cy="40" r="2" fill="black" />
                    </>
                )}
                {dice_2 == 3 && (
                    <>
                        <circle cx="116" cy="31" r="2" fill="black" />
                        <circle cx="122" cy="36" r="2" fill="black" />
                        <circle cx="128" cy="40" r="2" fill="black" />
                    </>
                )}
                {dice_2 == 4 && (
                    <>
                        <circle cx="116" cy="31" r="2" fill="black" />
                        <circle cx="116" cy="40" r="2" fill="black" />
                        <circle cx="128" cy="31" r="2" fill="black" />
                        <circle cx="128" cy="40" r="2" fill="black" />
                    </>
                )}
                {dice_2 == 5 && (
                    <>
                        <circle cx="116" cy="31" r="2" fill="black" />
                        <circle cx="116" cy="40" r="2" fill="black" />
                        <circle cx="122" cy="36" r="2" fill="black" />
                        <circle cx="128" cy="31" r="2" fill="black" />
                        <circle cx="128" cy="40" r="2" fill="black" />
                    </>
                )}
                {dice_2 == 6 && (
                    <>
                        <circle cx="116" cy="31" r="2" fill="black" />
                        <circle cx="116" cy="40" r="2" fill="black" />
                        <circle cx="122" cy="31" r="2" fill="black" />
                        <circle cx="122" cy="40" r="2" fill="black" />
                        <circle cx="128" cy="31" r="2" fill="black" />
                        <circle cx="128" cy="40" r="2" fill="black" />
                    </>
                )}
            </g>
            <text
                style={{ whiteSpace: "pre", fill: "#333" }}
                fontFamily="font-family: Arial, sans-serif"
                fontSize={"11.6px"}
                x="180.635"
                y="33.875"
            >
                {textGame}
            </text>
        </g>
    </>)
}