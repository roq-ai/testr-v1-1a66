import { PdfInterface } from 'interfaces/pdf';
import { GetQueryInterface } from 'interfaces';

export interface ShareInterface {
  id?: string;
  pdf_id: string;
  url: string;
  expiry_date?: any;
  created_at?: any;
  updated_at?: any;

  pdf?: PdfInterface;
  _count?: {};
}

export interface ShareGetQueryInterface extends GetQueryInterface {
  id?: string;
  pdf_id?: string;
  url?: string;
}
