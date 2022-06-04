import {render,screen} from '@testing-library/react';
import Group from '../GroupRegister';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

test ('input  values are correct', async () => {

    const {getByTestId} = render(<Group />);
    expect(getByTestId('groupid')).toBeValid()
    expect(getByTestId('department')).toBeValid()
    expect(getByTestId('memberLeader')).toBeValid()
    expect(getByTestId('memberone')).toBeValid()
    expect(getByTestId('membertwo')).toBeValid()
    expect(getByTestId('mamberthree')).toBeValid()

});
test  ('submit button is correct', async () => {

    const {getByText} = render(<Group />);
    const submit = getByText('Submit');
    expect(submit).toBeInTheDocument();

});
test ('clear  button is correct', async () => {
        const {getByText} = render(<Group />);
        const clear = getByText('Clear');
        expect(clear).toBeInTheDocument();
    
    }
    );

    test('check the input values are in correct type', () => {
        const {getByTestId} = render(<Group />);
        const groupid = getByTestId('groupid');
        const department = getByTestId('department');
        const memberLeader = getByTestId('memberLeader');
        const memberone = getByTestId('memberone');
        const membertwo = getByTestId('membertwo');
        const mamberthree = getByTestId('mamberthree');
     
        expect(groupid).toHaveAttribute('type', 'text');
        expect(department).toHaveAttribute('type', 'text');
        expect(memberLeader).toHaveAttribute('type', 'text');
        expect(memberone).toHaveAttribute('type', 'text');
        expect(membertwo).toHaveAttribute('type', 'text');
        expect(mamberthree).toHaveAttribute('type', 'text');

       
    });
      

  
