import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";

import {IQueryClient, ISettings} from "../../services/types.ts";
import {updateSetting as updateSettingApi} from "../../services/apiSettings.ts";

export function useUpdateSetting({ queryClient }: IQueryClient) {

    const { mutate: updateSetting, isLoading: isUpdating} = useMutation({
        mutationFn: (s: ISettings) => updateSettingApi(s),

        onSuccess: () => {
            toast.success('The Setting successfully edited')
            queryClient.invalidateQueries({queryKey: ['settings']}).then(() => {})
        },

        onError: (err: { message: string }) => toast.error(err.message)
    })

    return {
        updateSetting,
        isUpdating
    }
}