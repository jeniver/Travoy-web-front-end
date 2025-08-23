declare module '@travoy/api' {
  // Auth DTOs
  export interface LoginDto {
    email: string;
    password: string;
  }

  export interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  export interface ForgotPasswordDto {
    email: string;
  }

  export interface ResetPasswordDto {
    token: string;
    newPassword: string;
  }

  export interface AuthResponse {
    user: { 
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      fullName: string;
      avatar?: string;
      phone?: string;
      address?: string;
      city?: string;
      country?: string;
      bio?: string;
      emailVerified?: boolean;
      createdAt?: string;
    };
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }

  // User Entity (simplified for frontend use)
  export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    fullName: string;
    avatar?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    bio?: string;
    emailVerified?: boolean;
    createdAt?: string;
  }

  // Email DTOs
  export interface SendEmailDto {
    to: string | string[];
    subject: string;
    htmlContent?: string;
    textContent?: string;
    templateName?: string;
    templateData?: Record<string, any>;
    cc?: string[];
    bcc?: string[];
    replyTo?: string;
    scheduledAt?: string;
    batchId?: string;
    campaignId?: string;
    isPromotional?: boolean;
    metadata?: Record<string, any>;
  }

  export interface RecipientDto {
    email: string;
    data?: Record<string, any>;
  }

  export interface SendBulkEmailDto {
    recipients: RecipientDto[];
    subject: string;
    templateName: string;
    templateData?: Record<string, any>;
    campaignId?: string;
    scheduledAt?: string;
  }

  export interface CreateTemplateDto {
    name: string;
    subject: string;
    htmlContent: string;
    textContent: string;
  }

  // WhatsApp DTOs
  export interface SendWhatsAppMessageDto {
    to: string;
    message: string;
  }
}
