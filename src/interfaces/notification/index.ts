import { PdfInterface } from 'interfaces/pdf';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface NotificationInterface {
  id?: string;
  pdf_id: string;
  user_id: string;
  message: string;
  sent_at?: any;
  created_at?: any;
  updated_at?: any;

  pdf?: PdfInterface;
  user?: UserInterface;
  _count?: {};
}

export interface NotificationGetQueryInterface extends GetQueryInterface {
  id?: string;
  pdf_id?: string;
  user_id?: string;
  message?: string;
}
