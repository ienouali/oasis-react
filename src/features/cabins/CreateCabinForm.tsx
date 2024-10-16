import {SubmitHandler, useForm} from "react-hook-form";
import {useQueryClient} from "@tanstack/react-query";
import styled from "styled-components";

import {isLessThan, strictEqual} from "../../utils/helpers.ts";
import {Cabin, typeErrorsForm} from "../../services/types.ts";
import FormRow from "../../ui/FormRow.tsx";
import Form from "../../ui/Form.jsx";
import Button from "../../ui/Button.jsx";
import Textarea from "../../ui/Textarea.tsx";
import FileInput from "../../ui/FileInput.tsx";
import Input from "../../ui/Input.tsx";
import {useCreateCabin} from "./useCreateCabin.ts";
import {useEditCabin} from "./useEditCabin.ts";

const ButtonFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function CreateCabinForm({cabinToEdit, onCloseModal}: { cabinToEdit?: Cabin, onCloseModal?: () => void }) {
    /* ------------------------------------Start of reading props  ---------------------------------------------------*/
    let editId: number | boolean, editValues;
    if (cabinToEdit && cabinToEdit.id) {
        const {id, ...values} = cabinToEdit
        editId = id
        editValues = values
    } else {
        editId = false
    }

    const isEditSession = Boolean(editId)
    /* ----------------------------------- Start of reading props  ---------------------------------------------------*/


    /* ----------------------------------- start of react query + hooks -----------------------------------------------*/
    const queryClient = useQueryClient()

    const {createCabin, isCreating} = useCreateCabin({queryClient})
    const {editCabin, isEditing} = useEditCabin({queryClient})

    /* ------------------------------------- end of react query + hooks ----------------------------------------------*/

    /* ------------------------------------- Start of Event handlers ~ react hook form -------------------------------*/
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState
    } = useForm({
        defaultValues: isEditSession ? editValues : {}
    })
    const {errors: fieldsError} = formState

    const onSubmit: SubmitHandler<Cabin> = (data: Cabin) => {
        if (isEditSession) {
            editCabin(
                {
                    newCabinData: {...data, image: data.image},
                    id: editId as number
                }, {
                    onSuccess: () => {
                        reset()
                        onCloseModal?.()
                    }
                })
        } else {
            createCabin(
                {...data, image: data.image},
                {
                    onSuccess: () => {
                        reset()
                        onCloseModal?.()
                    }
                }
            );
        }
    }
    const onError = (error: unknown) => console.log(error)
    /* ------------------------------------ End of Event handlers ~ react hook form ----------------------------------*/

    /* ------------------------------------ instructions ------------------------------------------------------------ */
    const isLoading = isCreating || isEditing

    // ---------------------------------- fields elements ~ schema ----------------------------------------------------
    const fieldsElement = [
        {
            id: 'name',
            label: 'Cabin name',
            type: 'text',
            disabled: isLoading,
            ...register('name', {required: 'Cabin name field is required'})
        },
        {
            id: 'maxCapacity',
            label: 'Maximum capacity',
            type: 'number',
            disabled: isLoading,
            ...register('maxCapacity', {
                required: 'Maximum capacity field is required',
                min: {
                    value: 1,
                    message: 'Maximum capacity should be at list 1'
                },
            })
        },
        {
            id: 'regularPrice',
            label: 'Regular price',
            type: 'number',
            disabled: isLoading,
            ...register('regularPrice', {
                required: 'Regular price This field is required',
                min: {
                    value: 1,
                    message: 'Regular price should be at list 1'
                },
            })
        },
        {
            id: 'discount',
            label: 'Discount',
            type: 'number',
            disabled: isLoading,
            defaultValue: 0,
            ...register('discount', {
                required: 'Discount field is required',
                validate: (val: number) => isLessThan(Number(val), Number(getValues().regularPrice))
                    || 'Discount should be less than regular price'
            })
        },
        {
            id: 'description',
            label: 'Description for website',
            type: 'Textarea',
            defaultValue: '',
            ...register('description', {required: 'Description field is required'})
        },
        {
            id: 'image',
            label: 'Cabin photo',
            type: 'file',
            accept: "image/*",
            disabled: isLoading,
            ...register('image', {required: isEditSession ? false : 'Cabin photo is required'})
        }
    ]

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
            {
                fieldsElement?.map(field => (
                    <FormRow
                        labelProps={{id: field.id, label: field.label}}
                        errorMessage={(fieldsError as typeErrorsForm)[field.id]?.message || ''}
                        key={field.id}
                    >
                        {
                            strictEqual(field.type, 'Textarea') ? <Textarea {...field} />
                                : strictEqual(field.type, 'file') ? <FileInput  {...field} />
                                    : <Input {...field} />
                        }
                    </FormRow>
                ))
            }
            <ButtonFormRow>
                <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>Cancel</Button>
                <Button disabled={isLoading}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
            </ButtonFormRow>
        </Form>
    );
}

export default CreateCabinForm;
