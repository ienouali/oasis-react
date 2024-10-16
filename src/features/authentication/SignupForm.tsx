import Button from "../../ui/Button.jsx";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {strictEqual} from "../../utils/helpers.ts";
import {UseSignup} from "./useSignup.ts";
import styled from "styled-components";

const StyledBtnContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    & button {
        margin: 1rem;
    }
`
function SignupForm() {
    const {register, formState, getValues, handleSubmit, reset} = useForm()
    const {errors} = formState;

    const {signup , isLoading} = UseSignup()
    const onSubmit: SubmitHandler<FieldValues> = ({fullName, email, password}) => {
        signup({fullName, email, password}, {
            onSettled: () => {
                reset()
            }
        });
    }

    return <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow labelProps={{id: "fullName", label: "Full name"}} errorMessage={errors}>
                <Input
                    disabled={isLoading}
                    type="text"
                    id="fullName"
                    {...register('fullName', {required: 'Full name is required'})}
                />
            </FormRow>

            <FormRow labelProps={{id: "email", label: "Email address"}} errorMessage={errors}>
                <Input
                    disabled={isLoading}
                    type="email"
                    id="email"
                    {...register('email', {
                        required: 'email is required',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'email format is not valid'
                        }
                    })
                    }
                />
            </FormRow>

            <FormRow labelProps={{id: "password", label: "Password (min 8 characters)"}} errorMessage={errors}>
                <Input
                    disabled={isLoading}
                    type="password"
                    id="password"
                    {...register('password', {
                        required: 'password is required',
                        minLength: {
                            value: 8,
                            message: 'password needs a minimum of 8 characters'
                        }
                    })
                    }
                />
            </FormRow>

            <FormRow labelProps={{id: "passwordConfirm", label: "Repeat password"}} errorMessage={errors}>
                <Input
                    disabled={isLoading}
                    type="password"
                    id="passwordConfirm"
                    {...register('passwordConfirm', {
                        required: 'password Confirmation is required',
                        validate: value => strictEqual(value, getValues().password || 'password fields needs to march')
                    })
                    }
                />
            </FormRow>

            <StyledBtnContainer>
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                &nbsp;
                <Button disabled={isLoading}>Create new user</Button>
            </StyledBtnContainer>
        </Form>
}

export default SignupForm;
