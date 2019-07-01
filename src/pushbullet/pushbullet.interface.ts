export interface Event {
  type: string;
  subtype: string;
  // tslint:disable-next-line:no-any
  push: any;
}
