import { AxiosinstanceFormDataAuth } from "../instance";

// upload single file
export const useUploadFile = async (file: FormData) => {
  const response = await AxiosinstanceFormDataAuth.post("files/upload/", file);
  return response.data;
};


// upload multiple files
export const useUploadMultipleFiles = async (files: FormData) => {
  const response = await AxiosinstanceFormDataAuth.post(
    "files/upload-multiple/",
    files
  );
  return response.data;
}