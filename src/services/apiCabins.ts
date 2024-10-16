import supabase, {supabaseUrl} from "./supabase.ts";
import {Cabin, imgTypeObj} from "./types.ts";
import {strictEqual} from "../utils/helpers.ts";

export async function getCabins(): Promise<Cabin[]> {
    const {data: cabins, error} = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.log(error)
        throw new Error('Cabins could not be loaded')
    }

    return cabins
}

export async function createOrEditCabin<C, N>(newCabin: Cabin, id: N | undefined): Promise<C | null | object> {
    // ----------------- operations ------------------------
    const imageName = strictEqual(typeof newCabin.image, 'string')
        ? (newCabin.image as string)
        : (newCabin?.image[0] as imgTypeObj)?.name as string
    const hasImagePath = imageName?.startsWith(supabaseUrl)
    // image format: https://fyupwinrqalkvxtkqizo.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const generatedName = `${Math.random()}-${imageName}`;
    const formatImageName = `${generatedName}`.replaceAll('/', '')
    const imagePath = hasImagePath
        ? imageName
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${formatImageName}`


    let returnedData: Cabin | null, returnedError: unknown;
    // ----------------- Addition ------------------------
    if (!id) {
        const {data, error} = await supabase.from('cabins').insert([{...newCabin, image: imagePath}])
            .select()
            .single()

        returnedData = data; returnedError = error
    } // ----------------- Edition ------------------------
    else if (id) {
        const {data, error} = await supabase.from('cabins').update({...newCabin, image: imagePath})
            .eq('id', id)
            .select()
            .single()

        returnedData = data; returnedError = error
    } else {
        returnedData = null
    }

    if (returnedError) {
        console.log(returnedError)
        throw new Error('Cabin could not be created')
    }

    // ----------------- Uploading cabin image ------------------------
    const imgDetails = newCabin?.image[0]
    if (strictEqual(typeof (imgDetails as imgTypeObj).name, 'string')) {
        await uploadImage(imagePath, imgDetails as never, returnedData as Cabin);
    }
    //  returning the data ------------------------
    return returnedData
}

async function uploadImage(path: string, file: File, data: Cabin): Promise<void> {
    const { error: storageError} = await supabase
        .storage
        .from('cabin-images')
        .upload(path, file as never, {
            cacheControl: '3600',
            upsert: false
        })

    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', (data || {id: ''}).id)
        throw new Error('Cabin image could not be uploaded and the cabin was not created')
    }
}

export async function deleteCabin(id: number): Promise<Cabin | null> {
    const {data, error} = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error)
        throw new Error('Cabin could not be deleted, try again')
    }

    return data
}
