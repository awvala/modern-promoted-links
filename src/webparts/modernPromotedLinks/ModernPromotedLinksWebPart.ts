import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

import * as strings from 'ModernPromotedLinksWebPartStrings';
import ModernPromotedLinks from './components/ModernPromotedLinks';
import { IModernPromotedLinksProps } from './components/IModernPromotedLinksProps';
import { IModernPromotedLinksWebPartProps } from './IModernPromotedLinksWebPartProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

export interface IModernPromotedLinksWebPartProps {
  description: string;
}

export default class ModernPromotedLinksWebPart extends BaseClientSideWebPart<IModernPromotedLinksWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IModernPromotedLinksProps> = React.createElement(
      ModernPromotedLinks,
      {
        isWorkbench: Environment.type == EnvironmentType.Local,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        lists: this.properties.lists || "",
        spHttpClient: this.context.spHttpClient,
        description: this.properties.description,
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // Determine environment and add apply button to the classic page to save property pane settings.
  protected get disableReactivePropertyChanges(): boolean {

    let buttonStatus: boolean = false;

    if (Environment.type == EnvironmentType.ClassicSharePoint) {
      // Classic web page, show Apply button
      buttonStatus = true;
    } else if (Environment.type === EnvironmentType.SharePoint) {
      // Modern SharePoint page, hide Apply button
      buttonStatus = false;
    } else if (Environment.type === EnvironmentType.Local) {
      // Workbench page, hide Apply button
      buttonStatus = false;
    }
    return buttonStatus;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldListPicker('lists', {
                  label: strings.ListNameFieldLabel,
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  baseTemplate: 170,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
