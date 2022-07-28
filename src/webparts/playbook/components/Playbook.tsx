import * as React from 'react';
import styles from './Playbook.module.scss';
import { IPlaybookProps } from './IPlaybookProps';
import { escape } from '@microsoft/sp-lodash-subset';
import App from './App';
import { sp } from "@pnp/pnpjs";
import "../../../ExternalRef/css/style.scss"

export default class Playbook extends React.Component<IPlaybookProps, {}> {
  constructor(prop: IPlaybookProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<IPlaybookProps> {
    return (
      <>
        <App context={this.props.context} sp={sp} />
      </>
    );
  }
}
