export default function PlayerTwoRed({ position }: { position: { cx: string, cy: string } }) {
    return (
        <ellipse data-testid="player-two-red-id"
            style={{ stroke: "#ffffff", fill: "#ff0202" }}
            cx={position.cx}
            cy={position.cy}
            rx="6.475"
            ry="6.475"
        />

    )
}