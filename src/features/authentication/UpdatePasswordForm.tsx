import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Button from "../../ui/Button.jsx";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {useUpdateUser} from "./useUpdateUser.ts";
import styled from "styled-components";

const StyledBtnContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    & button {
        margin: 1rem;
    }
`
function UpdatePasswordForm() {
    const {register, handleSubmit, formState, getValues, reset} = useForm();
    const {errors}: FieldValues = formState;

    const {updateUser, isUpdating} = useUpdateUser();

    const onSubmit: SubmitHandler<FieldValues> = ({ password }) => {
        updateUser({password}, {
            onSuccess: function () {
                reset();
            }
        });
    }


    return <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow
                labelProps={{ id: 'password', label: 'Password (min 8 characters)'}}
                errorMessage={errors}
            >
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={isUpdating}
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password needs a minimum of 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow labelProps={{ id: 'passwordConfirm', label: 'Confirm password'}} errorMessage={errors}>
                <Input
                    type="password"
                    autoComplete="new-password"
                    id="passwordConfirm"
                    disabled={isUpdating}
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            getValues().password === value || "Passwords need to match",
                    })}
                />
            </FormRow>
            <StyledBtnContainer>
                <Button onClick={reset} type="reset" variation="secondary">
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update password</Button>
            </StyledBtnContainer>
        </Form>
}

export default UpdatePasswordForm;
