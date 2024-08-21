import { randomUUID } from 'crypto';
import storage from '../app/api/v1/firebase';
import { ref, listAll, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';

export async function uploadPlanImage(id: number, image: File) {
    let storageRef = ref(storage, `images/plans/${id}`);

    const images = await listAll(storageRef);

    for (let item of images.items) await deleteObject(item);

    await uploadBytes(ref(storage, `images/plans/${id}/${randomUUID()}`), image);
}

export async function getPlanImageUrl(id: number): Promise<string | undefined> {
    const response = await listAll(ref(storage, `images/plans/${id}`));

    return response.items.length ? await getDownloadURL(response.items[0]) : undefined;
}

export async function uploadProductImages(id: number, images: FileList): Promise<undefined | 'error'> {
    try {
        const storageRef = ref(storage, `images/products/${id}/`);

        const response = await listAll(storageRef);

        if (response.items.length) {
            for (let item of response.items) await deleteObject(item);
        }

        for (let image of images) await uploadBytes(ref(storage, `images/products/${id}/${image.name}`), image);

    } catch (e) {
        console.log(`uploadPrductImages(): ${e}`);
        return 'error';
    }
}

export async function getProductImageUrls(id: number): Promise<string[]> {
    try {
        const storageRef = ref(storage, `/images/products/${id}`);

        const response = await listAll(storageRef);
        const urls = await Promise.all(response?.items.map(getDownloadURL));

        return urls
    } catch (e) {
        console.log(`getProductImageUrls: error: ${e}`);
        return [];
    }
}

export async function getExerciseVideoUrl(id: number): Promise<string | null> {
    try {
        const storageRef = ref(storage, `videos/excercises2/`);
        const response = await listAll(storageRef);

        const foundURL = response.items.find(i => i.name.startsWith(id.toString()));

        if (!foundURL) return null;

        return await getDownloadURL(foundURL);

    } catch (e) {
        console.log(`getExerciseVideoUrl: error: ${e}`);
        return null;
    }
}

export async function getExerciseSectionImageUrl(id: number): Promise<string | null> {
    try {
        const storageRef = ref(storage, `images/excercise_sections/${id}`);
        const response = await listAll(storageRef);

        if (response.items.length) {
            return await getDownloadURL(response.items[0]);
        } 
        
        return null;

    } catch (e) {
        console.log(`getExerciseVideoUrl: error: ${e}`);
        return null;
    }
}

export async function uploadExerciseSectionImage(id: number, image: File) {
    try {
        const storageRef = ref(storage, `images/excercise_sections/${id}`);

        const list = await listAll(storageRef);

        await Promise.allSettled(list?.items.map(deleteObject));

        await uploadBytes(ref(storage, `images/excercise_sections/${id}/${image.name}`), image);

    } catch (e) {
        console.log(`uploadExerciseSectionImage(): ${e}`);
    }
}

export async function getTrainerImageUrl(id: number): Promise<string | null> {
    try {
        const storageRef = ref(storage, `images/trainers/${id}`);

        return await getDownloadURL(storageRef);
    } catch (e) {
        return null;
    }
}

export async function uploadTrainerImage(id: number, image: File) {
    try {
        const images = await listAll(ref(storage, `images/trainers/${id}`));

        if (images.items.length) {
            for (let image of images.items) await deleteObject(image);
        }

        const storageRef = ref(storage, `image/trainers/${id}/${image.name}`);

        await uploadBytes(storageRef, image);
    } catch (e) {
        console.log('uploadTrainerImage(): '+e);
    }
}
