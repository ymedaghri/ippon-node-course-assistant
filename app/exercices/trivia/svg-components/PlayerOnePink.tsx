export default function PlayerOnePink({ position }: { position: { cx: string, cy: string } }) {
    return (
        <ellipse data-testid="player-one-pink-id"
            style={{ stroke: "#ffffff", fill: "#ff00b1" }}
            cx={position.cx}
            cy={position.cy}
            r="6.475"
            ry="6.475"
        />
    )
}