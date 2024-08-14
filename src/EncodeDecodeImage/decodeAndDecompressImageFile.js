import pako from "pako";
export const decodeAndDecompressImageFile = (base64String) => {
    // Giải mã dữ liệu Base64
    const binaryString = atob(base64String);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    // Giải nén dữ liệu
    const decompressedData = pako.inflate(bytes);
    // Tạo lại Blob từ dữ liệu giải nén
    const blob = new Blob([decompressedData]);
    return URL.createObjectURL(blob);
};