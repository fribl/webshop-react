
import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";

interface FormErrors {
    firstname?: string;
    lastname?: string;
    email?: string;
  }

 export interface FormData {
    firstname: string;
    lastname: string;
    email:string;
    basket: number[];
    id: number;

  }
  interface SavedUser {
    customerId: number,
    customerName: string,
    basket: number[]
}

//save user in api
 const PostUser = async (user: FormData) => {

      const newUser: SavedUser = {
          customerId: user.id,
          customerName: user.firstname + " " + user.lastname,
          basket: []
     }
        fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON
        .then((newUser) => {
        console.log('Success:', newUser);
        })
        //Then with the error genereted
        .catch((error) => {
        console.error('Error:', error);
        });

}
 //saves user in context
export function LoginForm() {
    const userContext = useContext(UserContext)
    
    if (!userContext)
    throw(new Error("Usercontext  is undefined"))

    const history = useHistory();
    
    const [state, setState] = React.useState<FormData>({ firstname: "", lastname:"", email:"", basket:[], id:2});
    const [errors, setErrors] = React.useState<FormErrors>({});
    

    //firstname
  const validateFName = (value: string): FormErrors => {
    const regName: RegExp = /^([a-zA-Z]{2,}\s*)+$/;
    if (!regName.test(value)) {

      return { firstname: "Not a valid name" };
    } else if (value.length > 15) {
      return { firstname: "Must be 15 characters or less" };
    }
    return { firstname: undefined };
  };

  const handleFName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ...{ firstname: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validateFName(event.target.value) }));
  };


  //lastname
  const validateLName = (value: string): FormErrors => {
    const regName: RegExp = /^([a-zA-Z]{2,}\s*)+$/;
    if (!regName.test(value)) {
      return { lastname: "Not a valid name" };
    } else if (value.length > 15) {
      return { lastname: "Must be 15 characters or less" };
    }
    return { lastname: undefined };
  };

  const handleLName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ...{ lastname: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validateLName(event.target.value) }));
  };
  //email
  const validateEmail = (value: string): FormErrors => {
    const regName: RegExp = /^^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regName.test(value)) {
      return { email: "Not a valid email" };
    } else if (value.length > 15) {
      return { email: "Must be 15 characters or less" };
    }
    return { email: undefined };
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ...{ email: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validateEmail(event.target.value) }));
  };

  const validate = (): FormErrors => {
    return { ...validateFName(state.firstname), ...validateLName(state.lastname), ...validateEmail(state.email) }
  };


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valErrors = validate();
    if (valErrors.firstname)
      return
    else {
      //save user in Context
      userContext.updateUser(state.firstname, state.lastname, state.email);
      //save user in API
      PostUser(state);
      history.goBack();
      console.log(state);
    }


}
    return(
    <Container>
      <Row>
        <Col xs="10">
          <form onSubmit={onSubmit}>
            <div className="form-container">
              <label htmlFor="firstname">
                First name:
              </label>
              <input
                type="input"
                id="firstname"
                value={state.firstname}
                onChange={handleFName}
              />
              {errors.firstname ? (
                <span style={{ color: "red", float: "right" }}>{errors.firstname}</span>
              ) : null}
            
            <div>
              <label htmlFor="lastname">
                Last name:
              </label>
              <input
                type="input"
                id="lastname"
                value={state.lastname}
                onChange={handleLName}
              />
              {errors.lastname ? (
                <span style={{ color: "red" }}>{errors.lastname}</span>
              ) : null}
            </div>
            <div>
              <label htmlFor="email">
                Email:
              </label>
              <input
                type="input"
                id="email"
                value={state.email}
                onChange={handleEmail}
              />
              {errors.email ? (
                <span style={{ color: "red" }}>{errors.email}</span>
              ) : null}
            </div>
            <div className="but"
            >
              <button className="btn">
                Sign in
              </button>
              <button className="btn"  type="button" onClick={() => history.goBack()}>Cancel</button>
            </div>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
    )

}