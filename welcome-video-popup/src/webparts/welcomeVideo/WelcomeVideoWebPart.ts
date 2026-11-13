import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import WelcomeVideo from './components/WelcomeVideo';
import { IWelcomeVideoProps } from './components/IWelcomeVideoProps';

export interface IWelcomeVideoWebPartProps {
  videoUrl: string;
  notificationId: string;
}

const DEFAULT_VIDEO_URL =
  'https://armyeitaas.sharepoint-mil.us/sites/USAASC-PEOMS-PM-TAGM-OPS/Media%20library/Spooky%20Halloween%20Opener_720p.mp4';

export default class WelcomeVideoWebPart
  extends BaseClientSideWebPart<IWelcomeVideoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWelcomeVideoProps> =
      React.createElement(WelcomeVideo, {
        videoUrl:
          this.properties.videoUrl ||
          DEFAULT_VIDEO_URL,
        notificationId:
          this.properties.notificationId ||
          'welcome-video-v2'
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('2.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Welcome video settings'
          },
          groups: [
            {
              groupName: 'Video',
              groupFields: [
                PropertyPaneTextField('videoUrl', {
                  label: 'Video URL',
                  value: DEFAULT_VIDEO_URL,
                  description:
                    'Use a direct playable MP4 URL, not a Stream viewer link.'
                }),
                PropertyPaneTextField('notificationId', {
                  label: 'Notification ID',
                  value: 'welcome-video-v2',
                  description:
                    'Change this value to show the video again to users who dismissed an earlier version.'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
