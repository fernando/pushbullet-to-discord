export interface Event {
  type: string;
  subtype: string;
  push: string;
}

export interface Push {
  active: boolean;
  iden: string;
  created: number;
  modified: number;
  type: string;
  dismissed: boolean;
  direction: string;
  sender_name: string;
  receiver_iden: string;
  receiver_email: string;
  receiver_email_normalized: string;
  client_iden: string;
  title: string;
  body: string;
}
