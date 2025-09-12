import axios from "axios";

export async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("/api/upload", formData);

    if (res.status !== 200) {
        throw new Error("Upload failed");
    }

    return res.data.url as string; // chỉ return URL
}
