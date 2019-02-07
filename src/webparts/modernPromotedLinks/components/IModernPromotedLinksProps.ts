import { IModernPromotedLinksWebPartProps } from '../IModernPromotedLinksWebPartProps';
import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IModernPromotedLinksProps extends IModernPromotedLinksWebPartProps {
  isWorkbench: boolean;
  siteUrl: string;
  spHttpClient: SPHttpClient;
  context: WebPartContext;
}

export interface IModernPromotedLinkDataItem {
  Title: string;
  ImageUrl: string;
  Description: string;
  LinkUrl: string;
}
