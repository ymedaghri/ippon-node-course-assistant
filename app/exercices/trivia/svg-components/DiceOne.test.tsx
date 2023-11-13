import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GamePadPanel from './GamePadPanel';
import DiceOne from './DiceOne';

describe("Should render the corresponding dice depending on the props", () => {
    it('firstofall', () => {
        const { container } = render(<DiceOne value={2} dicesFill='white' />);

        expect(container).toContainEqual((<div>
            <rect
                fill="white"
                height="23"
                rx="2"
                ry="15"
                stroke="black"
                stroke-width="2px"
                width="23"
                x="110"
                y="18"
            />
            <circle
                cx="116"
                cy="25"
                fill="black"
                r="2"
            />
            <circle
                cx="128"
                cy="34"
                fill="black"
                r="2"
            />
        </div>))
    })
})
