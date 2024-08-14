import pako from "pako";
const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};
// Hàm để nén và mã hóa file ảnh thành Base64
export const compressAndEncodeImageFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const arrayBuffer = reader.result;
            // Nén dữ liệu
            const compressedData = pako.deflate(new Uint8Array(arrayBuffer));
            // Mã hóa dữ liệu nén thành Base64
            const base64String = arrayBufferToBase64(compressedData);
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};
