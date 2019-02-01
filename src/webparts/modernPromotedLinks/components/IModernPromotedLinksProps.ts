import { IModernPromotedLinksWebPartProps } from '../IModernPromotedLinksWebPartProps';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IModernPromotedLinksProps extends IModernPromotedLinksWebPartProps {
  isWorkbench: boolean;
  siteUrl: string;
  spHttpClient: SPHttpClient;
}

export interface IModernPromotedLinkDataItem {
  Title: string;
  ImageUrl: string;
  Description: string;
  LinkUrl: string;
}
