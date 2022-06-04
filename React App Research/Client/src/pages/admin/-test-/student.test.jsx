import {render,screen, waitFor,fireEvent} from '@testing-library/react';
import Student from '../studentReg';
import '@testing-library/jest-dom/extend-expect';


test ('student place holders are correct', async () => {
    const {} = render(<Student />);

    const firstName = screen.getByPlaceholderText('First Name');
    const lastName = screen.getByPlaceholderText('Last Name');
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();

 
});

test("submit button work correctly", async () => {
    const {getByText} = render(<Student />);

    const submit = getByText('Submit');

    expect(submit).toBeInTheDocument();
}
);


test("email and pasword are correct", async () => {

    const {getByTestId} = render(<Student />);

    const email = getByTestId('email');
    const password = getByTestId('password');

    expect(email).toBeValid();
    expect(password).toBeValid();

}   );

it("enables the submit button when the form is filled out", () => {
    const { getByTestId } = render(<Student />);

    const password = getByTestId("password");
   
    const submit = getByTestId("submit");
    fireEvent.change(password);
  

    expect(submit).not.toHaveClass("Mui-disabled");
  });


    // it("disables the submit button when the form is empty", () => {
    //     const { getByTestId } = render(<Student />);

    //     const password = getByTestId("password");
       
    //     const submit = getByTestId("submit");
    //     fireEvent.change(password);
    //     fireEvent.change(password);
      

    //     expect(submit).toHaveClass("Mui-disabled");
    //   });


