import * as React from 'react';
import styles from './ModernPromotedLinks.module.scss';
import { IModernPromotedLinksProps, IModernPromotedLinkDataItem } from './IModernPromotedLinksProps';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import ModernPromotedLinkItem, { IModernPromotedLinkItemProps } from './ModernPromotedLinkItem';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient } from '@microsoft/sp-http';


export interface IModernPromotedLinksState {
  listData: IModernPromotedLinkDataItem[];
  loading?: boolean;
  showPlaceholder?: boolean;
}

export default class ModernPromotedLinks extends React.Component<IModernPromotedLinksProps, IModernPromotedLinksState> {

  constructor(props: IModernPromotedLinksProps, state: IModernPromotedLinksState) {
    super(props);

    this._onConfigure = this._onConfigure.bind(this);

    this.state = { 
      listData: [],
      loading: false,
      showPlaceholder: (this.props.lists === null || this.props.lists === ""),
    };
  }

  /*
   * Opens the web part property pane
  */
 private _onConfigure() {
  this.props.context.propertyPane.open();
}


  public render(): React.ReactElement<IModernPromotedLinksProps> {

    if (this.state.showPlaceholder) {
      // Check if placeholder needs to be shown
      return (
        <Placeholder
          iconName="Edit"
          iconText="Promoted links web part configuration"
          description="Please configure the web part before you can show the promoted links."
          buttonLabel="Configure"
          onConfigure={this._onConfigure}/>
      );
    }

    return (
      <div className={styles.modernPromotedLinks}>
      <div >
        <h2>{this.props.description}</h2>
      </div>
      {
          this.state.loading ?
            (
              <Spinner size={SpinnerSize.large} label="Retrieving results ..." />
            ) : (
              this.state.listData.length === 0 ?
                (
                  <Placeholder
                    iconName="InfoSolid"
                    iconText="No items found"
                    description="The Promoted links list you selected does not contain items."
                  />
                ) : (

        <div className={styles.container}>
          {
            this.state.listData.map((item: IModernPromotedLinkDataItem) => {
              return <ModernPromotedLinkItem
                title={item.Title}
                description={item.Description}
                imageUrl={item.ImageUrl}
                href={item.LinkUrl}
                 />;   
            })
          }
          <div style={{ clear: 'both' }}></div>
        </div>
                )
                )
        }
      </div>
    );
  }

  public componentDidMount(): void {
    if (this.props.lists !== null && this.props.lists !== "") {
    this.loadData();
    }
  }

  public componentDidUpdate(prevProps: IModernPromotedLinksProps, prevState: IModernPromotedLinksState, prevContext: any) {
    if (prevProps.lists != this.props.lists) {
      if (this.props.lists !== null && this.props.lists !== "") {
        this.loadData();
      } else {
        this.setState({
          showPlaceholder: true
        });
      }
    }
  }

  private loadData(): void {

    this.setState({
      loading: true
    });

    if (this.props.isWorkbench) {
      // get mock data in Workbench
      this.setState({
        listData: [
          {
            Title: "Test Item",
            Description: "Test description",
            ImageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/04/a8/17/f5/el-arco.jpg",
            LinkUrl: "http://www.google.com"
          },
          {
            Title: "Test Item with a Long Title",
            Description: "Test description",
            ImageUrl: "https://pgcpsmess.files.wordpress.com/2014/04/330277-red-fox-kelly-lyon-760x506.jpg",
            LinkUrl: "http://www.google.com"
          },
          {
            Title: "Test Item",
            Description: "Test description",
            ImageUrl: "https://s-media-cache-ak0.pinimg.com/736x/d6/d4/d7/d6d4d7224687ca3de4a160f5264b5b99.jpg",
            LinkUrl: "Test item with a long description for display."
          }
        ]
      });
    } else {
      // get data from SharePoint
      this.props.spHttpClient.get(`${this.props.siteUrl}/_api/Web/Lists(guid'${this.props.lists}')/Items`, SPHttpClient.configurations.v1)
      .then(response => {
        return response.json();
      })
      .then((items: any) => {
        console.log(items);
        const listItems: IModernPromotedLinkDataItem[] = [];
        for (let i: number = 0; i < items.value.length; i++) {
          listItems.push({
            Title: items.value[i].Title,
            Description: items.value[i].Description,
            ImageUrl: items.value[i].BackgroundImageLocation.Url,
            LinkUrl: items.value[i].LinkLocation.Url,
          });
        }
        this.setState({ 
          listData: listItems,
          loading: false,
          showPlaceholder: false
        });
      }, (err: any) => {
        console.log(err);
      });
    }
  }
}



