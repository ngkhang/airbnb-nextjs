/* eslint-disable no-unused-vars */
import en from '../locales/en.json';

type Messages = typeof en;
export interface BaseResponse {
  statusCode: number;
  dateTime: string;
}

declare global {
  // Use type safe response API
  interface EntitySuccessPayload<T> extends BaseResponse {
    content: T;
  }

  interface EntityErrorPayload extends BaseResponse {
    content: string;
    message: string;
  }

  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
