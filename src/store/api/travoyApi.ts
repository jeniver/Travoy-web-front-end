import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config/api';
import { RootState } from '../index';
import {
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  AuthResponse,
  User,
  SendEmailDto,
  SendBulkEmailDto,
  CreateTemplateDto,
  SendWhatsAppMessageDto,
} from '@travoy/api';

export const travoyApi = createApi({
  reducerPath: 'travoyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Services', 'Testimonials', 'Contact', 'Auth', 'Email', 'WhatsApp'],
  endpoints: (builder) => ({
    // Existing endpoints
    getServices: builder.query<any, void>({
      query: () => 'services',
      providesTags: ['Services'],
    }),
    getTestimonials: builder.query<any, void>({
      query: () => 'testimonials',
      providesTags: ['Testimonials'],
    }),
    submitContact: builder.mutation<any, {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }>({
      query: (contactData) => ({
        url: 'email/contact-notification',
        method: 'POST',
        body: contactData,
      }),
      invalidatesTags: ['Contact'],
    }),

    // Auth Endpoints
    register: builder.mutation<AuthResponse, RegisterDto>({
      query: (registerDto) => ({
        url: 'auth/register',
        method: 'POST',
        body: registerDto,
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation<AuthResponse, LoginDto>({
      query: (loginDto) => ({
        url: 'auth/login',
        method: 'POST',
        body: loginDto,
      }),
      invalidatesTags: ['Auth'],
    }),
    refreshToken: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
      }),
    }),
    forgotPassword: builder.mutation<{
      message: string;
    }, ForgotPasswordDto>({
      query: (forgotPasswordDto) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: forgotPasswordDto,
      }),
    }),
    resetPassword: builder.mutation<{
      message: string;
    }, ResetPasswordDto>({
      query: (resetPasswordDto) => ({
        url: 'auth/reset-password',
        method: 'POST',
        body: resetPasswordDto,
      }),
    }),
    verifyEmail: builder.mutation<{
      message: string;
    }, string>({
      query: (token) => ({
        url: `auth/verify-email/${token}`,
        method: 'POST',
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => 'auth/profile',
      providesTags: ['Auth'],
    }),
    logout: builder.mutation<{
      message: string;
    }, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),

    // Email Endpoints
    sendEmail: builder.mutation<any, SendEmailDto>({
      query: (sendEmailDto) => ({
        url: 'email/send',
        method: 'POST',
        body: sendEmailDto,
      }),
      invalidatesTags: ['Email'],
    }),
    sendBulkEmails: builder.mutation<any, SendBulkEmailDto>({
      query: (sendBulkEmailDto) => ({
        url: 'email/send-bulk',
        method: 'POST',
        body: sendBulkEmailDto,
      }),
      invalidatesTags: ['Email'],
    }),
    sendPromotionalEmail: builder.mutation<any, {
      recipient: string;
      subject: string;
      title: string;
      greeting: string;
      content: string;
      callToAction: string;
      unsubscribeToken?: string;
    }>({
      query: (promotionalData) => ({
        url: 'email/promotional',
        method: 'POST',
        body: promotionalData,
      }),
      invalidatesTags: ['Email'],
    }),
    getEmailStatus: builder.query<any, string>({
      query: (emailId) => `email/status/${emailId}`,
      providesTags: (result, error, id) => [{
        type: 'Email',
        id
      }],
    }),
    getCampaignStats: builder.query<any, string>({
      query: (campaignId) => `email/campaign/${campaignId}/stats`,
      providesTags: (result, error, id) => [{
        type: 'Email',
        id
      }],
    }),
    retryFailedEmails: builder.mutation<{
      message: string;
    }, { emailIds: string[] }>({
      query: (data) => ({
        url: 'email/retry-failed',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Email'],
    }),
    getEmailTemplates: builder.query<any[], void>({
      query: () => 'email/templates',
      providesTags: ['Email'],
    }),
    createEmailTemplate: builder.mutation<any, CreateTemplateDto>({
      query: (createTemplateDto) => ({
        url: 'email/templates',
        method: 'POST',
        body: createTemplateDto,
      }),
      invalidatesTags: ['Email'],
    }),
    getEmailTemplateByName: builder.query<any, string>({
      query: (name) => `email/templates/${name}`,
      providesTags: (result, error, name) => [{
        type: 'Email',
        id: name
      }],
    }),
    testEmailTemplate: builder.mutation<any, { templateName: string; templateData: Record<string, any> }>({
      query: (data) => ({
        url: 'email/test-template',
        method: 'POST',
        body: data,
      }),
    }),

    // WhatsApp Endpoints
    sendWhatsAppMessage: builder.mutation<any, SendWhatsAppMessageDto>({
      query: (sendWhatsAppMessageDto) => ({
        url: 'whatsapp/send-message',
        method: 'POST',
        body: sendWhatsAppMessageDto,
      }),
      invalidatesTags: ['WhatsApp'],
    }),
  }),
});

// Export hooks
export const {
  useGetServicesQuery,
  useGetTestimonialsQuery,
  useSubmitContactMutation,
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useSendEmailMutation,
  useSendBulkEmailsMutation,
  useSendPromotionalEmailMutation,
  useGetEmailStatusQuery,
  useGetCampaignStatsQuery,
  useRetryFailedEmailsMutation,
  useGetEmailTemplatesQuery,
  useCreateEmailTemplateMutation,
  useGetEmailTemplateByNameQuery,
  useTestEmailTemplateMutation,
  useSendWhatsAppMessageMutation,
} = travoyApi;
