import { AccessInterface } from 'interfaces/access';
import { NotificationInterface } from 'interfaces/notification';
import { ShareInterface } from 'interfaces/share';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PdfInterface {
  id?: string;
  name: string;
  path: string;
  expiry_date?: any;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  access?: AccessInterface[];
  notification?: NotificationInterface[];
  share?: ShareInterface[];
  user?: UserInterface;
  _count?: {
    access?: number;
    notification?: number;
    share?: number;
  };
}

export interface PdfGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  path?: string;
  user_id?: string;
}
