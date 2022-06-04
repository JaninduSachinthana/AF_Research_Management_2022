
import Topic from '../Topic_register';
import {render,screen, waitFor,fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as React from "react"


test ("input fields should not be empty", async () => {
   
    const {getByTestId} = render(<Topic/>);

    const title = getByTestId('title');
    const email = getByTestId('email');
    const stdID = getByTestId('stdID');
    const grpID = getByTestId('grpID');

    fireEvent.change(title, {target: {value: 'Title'}});
    fireEvent.change(email, {target: {value: '****@gmail.com'}});
    fireEvent.change(stdID, {target: {value: '123456789'}});
    fireEvent.change(grpID, {target: {value: '123456789'}});

    expect(title.value).toBe('Title');

    expect(email.value).toBe('****@gmail.com');

    expect(stdID.value).toBe('123456789');

    expect(grpID.value).toBe('123456789');

    fireEvent.click(getByTestId('submit'));

    expect(getByTestId('submit')).toHaveTextContent('Submit');

});

test("check the button works correctly", async () => {
    
        const {getByTestId} = render(<Topic/>);
    
        fireEvent.click(getByTestId('submit'));
    
        expect(getByTestId('submit')).toHaveTextContent('Submit');
    
    }
    );


 test("check the post  api is working",  async() => {

        const {getByTestId} = render(<Topic/>);

        fireEvent.change(getByTestId('title'), {target: {value: 'Title'}});
        fireEvent.change(getByTestId('email'), {target: {value: '****@gmail.com'}});
        fireEvent.change(getByTestId('stdID'), {target: {value: '123456789'}});
        fireEvent.change(getByTestId('grpID'), {target: {value: '123456789'}});

        fireEvent.click(getByTestId('submit'));

        expect(getByTestId('submit')).toHaveTextContent('Submit');

    }

    );











