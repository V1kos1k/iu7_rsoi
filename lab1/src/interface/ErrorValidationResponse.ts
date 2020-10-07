export interface IErrorValidationResponse {
  message: string;
  errors: {
    [key: string]: string;
  }
}