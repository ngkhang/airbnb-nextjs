interface ActionResponse<T> {
  statusCode: number;
  dateTime: string;
  content?: T;
  message?: string;
}
