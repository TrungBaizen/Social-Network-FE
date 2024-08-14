import pako from "pako";

export const decodeAndDecompressImageFile = (base64String) => {
    try {
        console.log(base64String.length)
        // Giải mã dữ liệu Base64
        const binaryString = atob(base64String);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        console.log(1)
        for (let i = 0; i < binaryLen; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        console.log(2)
        // Giải nén dữ liệu
        const decompressedData = pako.inflate(bytes);
        console.log(decompressedData)
        // Tạo lại Blob từ dữ liệu giải nén
        const blob = new Blob([decompressedData]);
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Error decoding and decompressing image file:", error);
        return null; // Hoặc bạn có thể xử lý lỗi tùy theo yêu cầu của bạn
    }
};
