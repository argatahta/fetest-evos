import React from 'react';

import { render, act, fireEvent } from "../test-utils";
import StarshipCard from "../../components/StarshipCard";

describe("StarshipCard", ()=> {
    let expectedProps, handleClick

    beforeEach(()=> {
        handleClick = jest.fn();
        expectedProps = {
            title: "Star Destroyer",
            onStarshipClick: handleClick
        }
    });

    test('should render title', () => {
        const { getByText, getByAltText }  = render(<StarshipCard {...expectedProps} />);
        const title = getByText(`${expectedProps.title}`);

        expect(title).toBeVisible();
    });

    test('should be able to click the card', () => {
        const { getByText }  = render(<StarshipCard {...expectedProps} />);
        const title = getByText(`${expectedProps.title}`);

        fireEvent.click(title);

        expect(handleClick).toHaveBeenCalledTimes(2)
    })
});