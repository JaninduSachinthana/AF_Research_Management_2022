
import {render,screen, waitFor,fireEvent} from '@testing-library/react';
import Student from '../Login';
import '@testing-library/jest-dom/extend-expect';
import * as React from "react"

test ('Login', async () => {

    
        const {
            getByPlaceholderText,       
        } = render(<Student />);
    
        const email = getByPlaceholderText('Email');
        const password = getByPlaceholderText('Password');
        const submit = getByPlaceholderText('Sign In');
    
        fireEvent.change(email, {target: {value: 'achi@email.com'}});        
        fireEvent.change(password, {target: {value: '#99Achi134#'}});
        fireEvent.click(submit);

        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(submit).toBeInTheDocument();


});






