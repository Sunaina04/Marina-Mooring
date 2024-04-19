import { userApi } from "../userApi";
import { FORMS_PAYLOAD, UPLOAD_PAYLOAD } from "./types";

const moorserveApi = userApi.injectEndpoints({
  endpoints: (builder: any) => ({
    //Upload Form
    uploadForm: builder.mutation({
      query: (payload: UPLOAD_PAYLOAD) => ({
        url: "api/v1/form/upload",
        method: "POST",
        body: payload,
      }),
    }),

    //Get Form
    getForms: builder.mutation({
      query: ({
        pageNumber,
        pageSize,
        sortBy,
        sortDir,
      }: {
        pageNumber?: number;
        pageSize?: number;
        sortBy?: string;
        sortDir?: string;
      }) => ({
        url: "api/v1/form/",
        method: "GET",
        params: { pageNumber, pageSize, sortBy, sortDir },
      }),
    }),

    //Download Form
    DownloadForm: builder.mutation({
      query: ({ filename }: { filename?: string }) => ({
        url: `api/v1/form/download/${filename}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUploadFormMutation,
  useGetFormsMutation,
  useDownloadFormMutation,
} = moorserveApi;
