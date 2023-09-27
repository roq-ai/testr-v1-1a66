import { PdfInterface } from 'interfaces/pdf';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AccessInterface {
  id?: string;
  pdf_id: string;
  user_id: string;
  access_type: string;
  created_at?: any;
  updated_at?: any;

  pdf?: PdfInterface;
  user?: UserInterface;
  _count?: {};
}

export interface AccessGetQueryInterface extends GetQueryInterface {
  id?: string;
  pdf_id?: string;
  user_id?: string;
  access_type?: string;
}
