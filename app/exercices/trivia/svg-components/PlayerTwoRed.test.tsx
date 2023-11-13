import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlayerTwoRed from './PlayerTwoRed';

describe("Should move the player to the position passed in props", () => {
    it('The attributes cx and cy must be updated by the props', () => {
        // Given
        const somePosition = { cx: "43", cy: "143.2" }
        render(<PlayerTwoRed
            position={somePosition} />);
        expect(screen.getByTestId('player-two-red-id')).toHaveAttribute('cx', "43");
        expect(screen.getByTestId('player-two-red-id')).toHaveAttribute('cy', "143.2");
    });
})
