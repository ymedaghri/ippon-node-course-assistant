import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlayerThreeBlue from './PlayerThreeBlue';

describe("Should move the player to the position passed in props", () => {
    it('The attributes cx and cy must be updated by the props', () => {
        // Given
        const somePosition = { cx: "33.54", cy: "250" }
        render(<PlayerThreeBlue position={somePosition} />);
        expect(screen.getByTestId('player-three-blue-id')).toHaveAttribute('cx', "33.54");
        expect(screen.getByTestId('player-three-blue-id')).toHaveAttribute('cy', "250");
    });
})
