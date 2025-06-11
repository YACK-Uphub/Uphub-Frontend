// services/paymentsApi.ts
import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQueryWithErrorHandling} from "@/services/baseApi";
import type {Payment, PaymentRequestBodyObject} from "@/types/payment";

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: customFetchBaseQueryWithErrorHandling,
  tagTypes: ["payments"],

  endpoints: (builder) => ({
    /**
     * POST /payments/create { userId, planId }
     * Returns Payment (checkoutUrl, orderCode, etc.)
     */
    createPayment: builder.mutation<Payment, PaymentRequestBodyObject>({
      query: (bodyObject) => ({
        url: "/payments/create",
        method: "POST",
        body: {...bodyObject}
      }),
    }),
  }),
});

export const {useCreatePaymentMutation} = paymentsApi;
