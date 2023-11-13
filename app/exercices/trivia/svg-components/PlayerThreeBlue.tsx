export default function PlayerThreeBlue({ position }: { position: { cx: string, cy: string } }) {
    return (
        <ellipse data-testid="player-three-blue-id"
            style={{ stroke: "#ffffff", fill: "#0090ff" }}
            cx={position.cx}
            cy={position.cy}
            rx="6.475"
            ry="6.475"
        />
    )
}