export default function PlayerFourYellow({ position }: { position: { cx: string, cy: string } }) {
    return (
        <ellipse data-testid="player-four-yellow-id"
            style={{ stroke: "#ffffff", fill: "#fff400" }}
            cx={position.cx}
            cy={position.cy}
            rx="6.475"
            ry="6.475"
        />
    )
}