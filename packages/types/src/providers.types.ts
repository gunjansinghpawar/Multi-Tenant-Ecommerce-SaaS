export interface PaymentProvider {
  createPayment(amount: number, currency: string, metadata?: any): Promise<{ id: string; clientSecret?: string; url?: string }>;
  verifyPayment(paymentId: string): Promise<boolean>;
  getPaymentStatus(paymentId: string): Promise<'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'>;
  refundPayment(paymentId: string, amount?: number): Promise<boolean>;
  handleWebhook(payload: any, signature: string): Promise<boolean>;
}

export interface ShippingProvider {
  createShipment(orderId: string, address: any, items: any[]): Promise<{ trackingNumber: string; labelUrl?: string }>;
  cancelShipment(trackingNumber: string): Promise<boolean>;
  getTracking(trackingNumber: string): Promise<any>;
  generateLabel(trackingNumber: string): Promise<string>;
  createPickup(trackingNumber: string, date: Date): Promise<boolean>;
}

export interface EmailProvider {
  sendEmail(to: string, subject: string, html: string, text?: string): Promise<boolean>;
  sendTemplate(to: string, templateId: string, data: any): Promise<boolean>;
}

export interface StorageProvider {
  uploadFile(buffer: Buffer, filename: string, mimeType: string, path?: string): Promise<string>;
  deleteFile(path: string): Promise<boolean>;
  getSignedUrl(path: string, expiresIn?: number): Promise<string>;
}

export interface SmsProvider {
  sendSms(to: string, message: string): Promise<boolean>;
  sendOtp(to: string, code: string): Promise<boolean>;
}

export interface WhatsAppProvider {
  sendMessage(to: string, message: string): Promise<boolean>;
  sendTemplate(to: string, templateName: string, language: string, components: any[]): Promise<boolean>;
}

export interface SearchProvider {
  indexDocument(index: string, id: string, document: any): Promise<boolean>;
  deleteDocument(index: string, id: string): Promise<boolean>;
  search(index: string, query: string, filters?: any): Promise<any>;
}

export interface AIProvider {
  generateText(prompt: string, context?: any): Promise<string>;
  generateImage(prompt: string, size?: string): Promise<string>;
  analyzeData(data: any, instruction: string): Promise<any>;
}
