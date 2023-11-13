import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlayerOnePink from './PlayerOnePink';

describe("Should move the player to the position passed in props", () => {
    it('The attributes cx and cy must be updated by the props', () => {
        // Given
        const somePosition = { cx: "100", cy: "120" }
        render(<PlayerOnePink position={somePosition} />);
        expect(screen.getByTestId('player-one-pink-id')).toHaveAttribute('cx', "100");
        expect(screen.getByTestId('player-one-pink-id')).toHaveAttribute('cy', "120");
    });
})
