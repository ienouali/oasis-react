import React, {useState} from "react";

import Button from "../../ui/Button.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import {useLoginInfo} from "./useLoginInfo.ts";
import {TLogininfo} from "../../services/types.ts";
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
function UpdateUserDataForm() {
    const {loginInfo} = useLoginInfo()
    const { updateUser, isUpdating } = useUpdateUser()

    const {email, user_metadata: {fullName: currentFullName}} = loginInfo as TLogininfo

    const [fullName, setFullName] = useState(currentFullName)
    const [avatar, setAvatar] = useState<File | null>(null)

    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!fullName) return;
        updateUser({ fullName, avatar: avatar as File }, {
            onSuccess: () => {
                setAvatar(null)
                e.target.reset()
            }
        })
    }

    function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file);
        }
    }

    function cancel() {
        setFullName(currentFullName)
        setAvatar(null)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow labelProps={{id: '', label: 'Email address'}}>
                <Input value={email} disabled/>
            </FormRow>
            <FormRow labelProps={{id: 'fullName', label: 'Full name'}}>
                <Input
                    disabled={isUpdating}
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                />
            </FormRow>
            <FormRow labelProps={{id: 'avatar', label: 'Avatar image'}}>
                <FileInput
                    disabled={isUpdating}
                    id="avatar"
                    type='file'
                    accept="image/*"
                    onChange={uploadFile}
                />
            </FormRow>
            <StyledBtnContainer>
                <Button disabled={isUpdating} onClick={cancel} type="reset" variation="secondary">
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update account</Button>
            </StyledBtnContainer>
        </Form>
    );
}

export default UpdateUserDataForm;
