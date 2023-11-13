import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlayerFourYellow from './PlayerFourYellow';

describe("Should move the player to the position passed in props", () => {
    it('The attributes cx and cy must be updated by the props', () => {
        // Given
        const somePosition = { cx: "210", cy: "58.6" }
        render(<PlayerFourYellow position={somePosition} />);
        expect(screen.getByTestId('player-four-yellow-id')).toHaveAttribute('cx', "210");
        expect(screen.getByTestId('player-four-yellow-id')).toHaveAttribute('cy', "58.6");
    });
})
