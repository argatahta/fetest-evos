import React from 'react';

import { render, act, fireEvent } from "../test-utils";
import SearchInput from "../../components/SearchInput";

describe("SearchInput", () => {
    let expectedProps, handlerSubmit, handleInput

    beforeEach(() => {
        handleInput = jest.fn();
        handlerSubmit = jest.fn();
        handlerSubmit.mockImplementation(event => {
            event.preventDefault();
          });

        expectedProps = {
            onChange: handleInput,
            placeholder: "dummyPlaceholder",
            id: "dummyId",
            onSearchClick: handlerSubmit
        }
    });

    test('should render placeholder on input', () => {
        const { getByPlaceholderText } = render(<SearchInput {...expectedProps} />);
        const input = getByPlaceholderText(expectedProps.placeholder);

        expect(input).toBeVisible();
    })

    test('should be able to input on the search box', () => {
        const { getByPlaceholderText } = render(<SearchInput {...expectedProps} />);
        const input = getByPlaceholderText(expectedProps.placeholder);

        fireEvent.input(input, { target: { value: 'abc' } })

        expect(handleInput).toHaveBeenCalledTimes(1)
        expect(input.value).toBe('abc')
    })

    test('should be able to submit the search', async () => {
        const { getByPlaceholderText, getByRole } = render(<SearchInput {...expectedProps} />);
        const button = getByRole("button");

        fireEvent.click(button)
        expect(handlerSubmit).toHaveBeenCalledTimes(1)
    })


});