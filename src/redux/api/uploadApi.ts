import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import type { UploadResponse } from "../../interfaces/movie";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    uploadSingleImage: builder.mutation<UploadResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("image", file);

        return {
          url: "/uploads",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadSingleImageMutation } = uploadApi
