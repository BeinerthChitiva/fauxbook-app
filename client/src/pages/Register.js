import React, {useState, useContext} from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useNavigate } from 'react-router-dom';

//Import our Context
import { AuthContext } from '../context/auth';
//Line below imports our now Custom Hook
import { useForm } from '../util/hooks';
 

function Register(props){

    const context = useContext(AuthContext)

    const navigate = useNavigate()

    //Our Errors State Handler
    const [errors, setErrors] = useState({})

    /////////////////////////////////////////////
    //Commented out in favor of our custom hook:
    // const initialState = {
    //     username: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: ""
    // }
    /////////////////////////////////////////////

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    /////////////////////////////////////////////
    //Commented out in favor of our custom hook:
    // const [values, setValues] = useState({
    //     username: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: ""
    // })
    /////////////////////////////////////////////

    /////////////////////////////////////////////
    //Commented out in favor of our custom hook:
    // const onChange = (event) => {
    //     //So, with this function we setValues, everytime it's summoned we spread the other values to leave them as they are,
    //     //and we set the Current mf that called the function ot the value we receive from the event.
    //     setValues({...values, [event.target.name]: event.target.value})
    // }

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, {data: {register: userData}}){
            console.log("MUTATION RESULT:")
            console.log(userData)
            console.log("MUTATION RESULT PRINTED.")
            console.log("Redirecting to HomePage after Register...")
            context.login(userData)
            navigate('/')
            //After user is added, we redirect to Home;
            //props.history.push('/')
        },
        onError(err){
            //The way our server code is written, we give ONE error, which is an object with ALL the errors, so we just wanna access the first one.
            setErrors(err.graphQLErrors[0].extensions.errors)
            console.log(err.graphQLErrors[0].extensions.errors)

        //     //setErrors(err.graphQLErrors[0].extensions.exception.errors)
        //     //console.log(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    //Function below is our helper function, our workaround because of how JS works.
    function registerUser(){
        addUser()
    }

    /////////////////////////////////////////////
    //Commented out in favor of our custom hook:
    // const onSubmit = (event) => {
    //     event.preventDefault();
    //     //We don't need to do validation, because we already did it Server-Side, or on the backend.
    //     addUser()
    // }

    return(
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                    //Line below highlights the error, dynamically. If there is an error in THIS field.
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={values.email}
                    //Line below highlights the error, dynamically. If there is an error in THIS field.
                    error={errors.email ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    //Line below highlights the error, dynamically. If there is an error in THIS field.
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    //Line below highlights the error, dynamically. If there is an error in THIS field.
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {/* The Div below, the OUTSIDE Object checks to see if Errors has any keys, because Errors always exists as an empty array.  */}
            {/* The Div below, the INSIDE Object maps through our Errors array, but we only want the values, not the Keys.*/}
            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors).map(value => {
                            return <li key={value}>{value}</li>
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

const REGISTER_USER = gql`
    # Our Mutation asking for its parameters:
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        # Our register mutation, receiving the values:
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            # Our Mutation sending back whatever we want from it:
            id email username createdAt token
        }
    }
`

export default Register;


//CODE BEFORE CREATING CUSTOM HOOKS

// import React, {useState} from 'react'
// import { Button, Form } from 'semantic-ui-react';
// import { useMutation } from '@apollo/client';
// import gql from 'graphql-tag';
 

// function Register(props){

//     //Our Errors State Handler
//     const [errors, setErrors] = useState({})

//     const [values, setValues] = useState({
//         username: "",
//         email: "",
//         password: "",
//         confirmPassword: ""
//     })

//     const onChange = (event) => {
//         //So, with this function we setValues, everytime it's summoned we spread the other values to leave them as they are,
//         //and we set the Current mf that called the function ot the value we receive from the event.
//         setValues({...values, [event.target.name]: event.target.value})
//     }

//     const sanityCheck = (event) => {
//         event.preventDefault();
//         console.log("SANITY CHECK;")
//         console.log(errors.username)
//         console.log(errors)
//         //console.log([errors])
//     }

//     const [addUser, {loading}] = useMutation(REGISTER_USER, {
//         update(proxy, result){
//             console.log(result)
//             //After user is added, we redirect to Home;
//             props.history.push('/')
//         },
//         onError(err){
//             //The way our server code is written, we give ONE error, which is an object with ALL the errors, so we just wanna access the first one.
//             setErrors(err.graphQLErrors[0].extensions.errors)
//             console.log(err.graphQLErrors[0].extensions.errors)
//             // console.log(err.graphQLErrors[0].extensions.exception.errors)
//             // setErrors(err.graphQLErrors[0].extensions.exception.errors)
//         },
//         variables: values
//     })

//     const onSubmit = (event) => {
//         event.preventDefault();
//         //We don't need to do validation, because we already did it Server-Side, or on the backend.
//         addUser()
//     }

//     return(
//         <div className='form-container'>
//             <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
//                 <h1>Register</h1>
//                 <Form.Input
//                     label="Username"
//                     placeholder="Username..."
//                     name="username"
//                     type="text"
//                     value={values.username}
//                     //Line below highlights the error, dynamically. If there is an error in THIS field.
//                     error={errors.username ? true : false}
//                     onChange={onChange}
//                 />
//                 <Form.Input
//                     label="Email"
//                     placeholder="Email..."
//                     name="email"
//                     type="email"
//                     value={values.email}
//                     //Line below highlights the error, dynamically. If there is an error in THIS field.
//                     error={errors.email ? true : false}
//                     onChange={onChange}
//                 />
//                 <Form.Input
//                     label="Password"
//                     placeholder="Password..."
//                     name="password"
//                     type="password"
//                     value={values.password}
//                     //Line below highlights the error, dynamically. If there is an error in THIS field.
//                     error={errors.password ? true : false}
//                     onChange={onChange}
//                 />
//                 <Form.Input
//                     label="Confirm Password"
//                     placeholder="Confirm Password..."
//                     name="confirmPassword"
//                     type="password"
//                     value={values.confirmPassword}
//                     //Line below highlights the error, dynamically. If there is an error in THIS field.
//                     error={errors.confirmPassword ? true : false}
//                     onChange={onChange}
//                 />
//                 <Button onClick={sanityCheck}>
//                     SanityCheck
//                 </Button>
//                 <Button type="submit" primary>
//                     Register
//                 </Button>
//             </Form>
//             {/* The Div below, the OUTSIDE Object checks to see if Errors has any keys, because Errors always exists as an empty array.  */}
//             {/* The Div below, the INSIDE Object maps through our Errors array, but we only want the values, not the Keys.*/}
//             {Object.keys(errors).length > 0 && (
//                 <div className='ui error message'>
//                     <ul className='list'>
//                         {/* BRUH, either add another function that runs through the object and gives back the necessary data, or TERNARY and dynamically render errors OR, also do an Object.yoMama and render as needed. */}
//                         <li>{errors.username}</li>
//                         <li>{errors.email}</li>
//                         <li>{errors.password}</li>
//                         <li>{errors.confirmPassword}</li>
//                         {/* {Object.values(errors).map(value => {
//                             <li key={errors.value}>{value.username}</li>
//                         })} */}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// const REGISTER_USER = gql`
//     # Our Mutation asking for its parameters:
//     mutation register(
//         $username: String!
//         $email: String!
//         $password: String!
//         $confirmPassword: String!
//     ) {
//         # Our register mutation, receiving the values:
//         register(
//             registerInput: {
//                 username: $username
//                 email: $email
//                 password: $password
//                 confirmPassword: $confirmPassword
//             }
//         ){
//             # Our Mutation sending back whatever we want from it:
//             id email username createdAt token
//         }
//     }
// `

// export default Register;