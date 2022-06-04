import {render,screen,cleanup} from '@testing-library/react';
import AddAssignment from '../addAssignment';
import React from 'react';
import { ReactDOM } from 'react';
import '@testing-library/jest-dom'
import { internal_resolveProps } from '@mui/utils';
test ('Add Assignment', async () => {


    const {
   
        getByPlaceholderText,
   


    } = render(<AddAssignment />);

    const asgName = getByPlaceholderText('Assignment Name');


    expect(asgName).toBeInTheDocument();

  

  
});

