import supabase, {supabaseUrl} from "./supabase.ts";

export async function signup({fullName, email, password}: { fullName: string; email: string; password: string; }) {
    const {data, error} = await supabase.auth.signUp({
        email, password, options: {
            data: {
                fullName,
                avatar: "",
            }
        }
    })

    if (error) throw new Error(error.message)
    return data;
}

export async function authenticateApi({email, password}: { email: string; password: string; }) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) throw new Error(error.message)
    return data;
}

export async function getCurrentUser() {
    const {data: loginInfo} = await supabase.auth.getSession()
    if (!loginInfo.session) return null

    const {data, error} = await supabase.auth.getUser()
    if (error) throw new Error(error.message)
    return data?.user;
}

export async function signOut() {
    const {error} = await supabase.auth.signOut();
    if (error) throw new Error(error.message)
}

export async function updateCurrentUser({password, fullName, avatar}: {
    password?: string;
    fullName?: string;
    avatar?: File;
}) {
    let updateData = {};
    if (password) updateData = {password};
    if (fullName) updateData = {
        data: {
            fullName
        }
    };
    const {data, error} = await supabase.auth.updateUser(updateData)
    if (error) throw new Error(error.message)
    if (!avatar) return data;


    const fileName = `avatar-${data.user?.id}-${Math.random()}`
    const {error: uploadError} = await supabase.storage.from('avatars').upload(fileName, avatar)
    if (uploadError) throw new Error(uploadError.message)


    const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
        }
    })
    if (uploadError) throw new Error(updateError?.message)
    return updatedUser;
}