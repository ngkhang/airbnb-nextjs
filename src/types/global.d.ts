/* eslint-disable no-unused-vars */
import en from '../locales/en.json';

type Messages = typeof en;

declare global {
  // Use type safe response API
  interface ActionResponse<T> {
    statusCode: number;
    dateTime: string;
    content?: T;
    message?: string;
  }

  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
