import {ChangeEvent} from "react";
import {useQueryClient} from "@tanstack/react-query";

import Form from '../../ui/Form.jsx';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import {useSettings} from "./useSettings.ts";
import {ISettings} from "../../services/types.ts";
import Spinner from "../../ui/Spinner.tsx";
import {useUpdateSetting} from "./useEditSettings.ts";

function UpdateSettingsForm() {
    // ------------------------------- start ~ hooks ------------------------------------------------------------
    const {isLoading, settings = {}} = useSettings()
    const {isUpdating, updateSetting} = useUpdateSetting({queryClient: useQueryClient()})
    // ------------------------------- end ~ hooks ------------------------------------------------------------

    const {minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice} = settings as ISettings

    function handeUpdate(e: ChangeEvent<HTMLInputElement>, fieldName: string) {
        const value = parseInt(e.currentTarget.value)
        if (!value) return;

        updateSetting({[fieldName]: value})
    }


    if (isLoading) return <Spinner/>

    return (
        <Form>
            <FormRow labelProps={{id: 'min-nights', label: 'Minimum nights/booking'}}>
                <Input
                    type='number'
                    id='min-nights'
                    defaultValue={minBookingLength}
                    disabled={isUpdating}
                    onBlur={e => handeUpdate(e, 'minBookingLength')}
                />
            </FormRow>
            <FormRow labelProps={{id: 'max-nights', label: 'Maximum nights/booking'}}>
                <Input
                    type='number'
                    id='max-nights'
                    defaultValue={maxBookingLength}
                    disabled={isUpdating}
                    onBlur={e => handeUpdate(e, 'maxBookingLength')}
                />
            </FormRow>
            <FormRow labelProps={{id: 'max-guests', label: 'Maximum guests/booking'}}>
                <Input
                    type='number'
                    id='max-guests'
                    defaultValue={maxGuestsPerBooking}
                    disabled={isUpdating}
                    onBlur={e => handeUpdate(e, 'maxGuestsPerBooking')}
                />
            </FormRow>
            <FormRow labelProps={{id: 'breakfast-price', label: 'Breakfast price'}}>
                <Input
                    type='number'
                    id='breakfast-price'
                    defaultValue={breakfastPrice}
                    disabled={isUpdating}
                    onBlur={e => handeUpdate(e, 'breakfastPrice')}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
