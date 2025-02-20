export type ErrorResponse = {
  errorType: string;
  message: string;
}

export type ErrorResponseDetailed = ErrorResponse & {
  details: [{
    property: string;
    value: string;
    messages: string[];
  }];
}
