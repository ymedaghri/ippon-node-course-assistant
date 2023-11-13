export default function DiceOne({ value, dicesFill }: { value: number, dicesFill: string }) {
    return (
        <>
            <rect
                x="110"
                y="18"
                width="23"
                height="23"
                rx="2"
                ry="15"
                fill={dicesFill}
                stroke="black"
                strokeWidth="2px"
            />
            {value == 1 && <circle cx="122" cy="30" r="2" fill="black" />}
            {value == 2 && (
                <>
                    <circle cx="116" cy="25" r="2" fill="black" />
                    <circle cx="128" cy="34" r="2" fill="black" />
                </>
            )}
            {value == 3 && (
                <>
                    <circle cx="116" cy="25" r="2" fill="black" />
                    <circle cx="122" cy="30" r="2" fill="black" />
                    <circle cx="128" cy="34" r="2" fill="black" />
                </>
            )}
            {value == 4 && (
                <>
                    <circle cx="116" cy="25" r="2" fill="black" />
                    <circle cx="116" cy="34" r="2" fill="black" />
                    <circle cx="128" cy="25" r="2" fill="black" />
                    <circle cx="128" cy="34" r="2" fill="black" />
                </>
            )}
            {value == 5 && (
                <>
                    <circle cx="116" cy="25" r="2" fill="black" />
                    <circle cx="116" cy="34" r="2" fill="black" />
                    <circle cx="122" cy="30" r="2" fill="black" />
                    <circle cx="128" cy="25" r="2" fill="black" />
                    <circle cx="128" cy="34" r="2" fill="black" />
                </>
            )}
            {value == 6 && (
                <>
                    <circle cx="116" cy="25" r="2" fill="black" />
                    <circle cx="116" cy="34" r="2" fill="black" />
                    <circle cx="122" cy="25" r="2" fill="black" />
                    <circle cx="122" cy="34" r="2" fill="black" />
                    <circle cx="128" cy="25" r="2" fill="black" />
                    <circle cx="128" cy="34" r="2" fill="black" />
                </>
            )}
        </>
    )
}