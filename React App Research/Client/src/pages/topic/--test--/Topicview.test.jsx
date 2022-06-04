
import Topic from '../Topic_register';
import {render,screen, waitFor,fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as React from "react"


test("TopicViewStd  function works correctly", () => {
       
    const {getByTestId} = render(<Topic/>);
   
    fireEvent.click(getByTestId('submit'));
   
    expect(getByTestId('submit')).toHaveTextContent('Submit');
   
});


test ("TextField filled correctly", () => {

    const {getByTestId} = render(<Topic/>);

    fireEvent.change(getByTestId('title'), {target: {value: 'Title'}});
    fireEvent.change(getByTestId('email'), {target: {value: '****@gmail.com'}});
    fireEvent.change(getByTestId('stdID'), {target: {value: '123456789'}});
    fireEvent.change(getByTestId('grpID'), {target: {value: '123456789'}});

    expect(getByTestId('title').value).toBe('Title');

    expect(getByTestId('email').value).toBe('****@gmail.com');

    expect(getByTestId('stdID').value).toBe('123456789');

    expect(getByTestId('grpID').value).toBe('123456789');

    fireEvent.click(getByTestId('submit'));

    expect(getByTestId('submit')).toHaveTextContent('Submit');

});


test("check the button works correctly", () => {

    const {getByTestId} = render(<Topic/>);

    fireEvent.click(getByTestId('submit'));

    expect(getByTestId('submit')).toHaveTextContent('Submit');

}


);







