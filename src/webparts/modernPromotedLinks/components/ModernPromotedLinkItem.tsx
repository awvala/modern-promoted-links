import * as React from 'react';
import styles from './ModernPromotedLinks.module.scss';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IModernPromotedLinkItemProps {
  imageUrl: string;
  title: string;
  description: string;
  href: string;
  launchbehavior: string;
}

export interface IModernPromotedLinkItemState {
  hovering: boolean;
}

export default class ModernPromotedLinks extends React.Component<IModernPromotedLinkItemProps, IModernPromotedLinkItemState> {

  constructor(props: IModernPromotedLinkItemProps, state: IModernPromotedLinkItemState) {
    super(props);

    this.state = {
      hovering: false
    };
  }

  public mouseOver(event): void {
    this.setState({ hovering: true });
  }

  public mouseOut(event): void {
    this.setState({ hovering: false });
  }

  public render(): React.ReactElement<IModernPromotedLinkItemProps> {
    return (
      //  Ternary operator to evaluate target property of link.  Dialog has been excluded as this feature does not work in the page"
      <a href={this.props.href} target= {this.props.launchbehavior === 'In page navigation' ? '_top' : '_blank'} role="listitem"
            onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>
        <div className={styles.pLinkItemWrapper}>
          <Image className={styles.pLinkItemImage} src={this.props.imageUrl} shouldFadeIn={true} imageFit={ImageFit.cover} />
          <div className={this.state.hovering ? styles.pLinkItemHoverPanelExpanded : styles.pLinkItemHoverPanelCollapse}>
            <div className={styles.pLinkItemTitle}>{this.props.title}</div>
            <p className={styles.pLinkItemDesc}>
              {this.props.description}
            </p>
          </div>
        </div>
      </a>
    );
  }
}