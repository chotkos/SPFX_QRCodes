import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';
import QRCode from 'qrcode.react';

import styles from './Barcodes.module.scss';

export interface IBarcodesProps {
  text: string;
  parentElement: HTMLDivElement;
}

const LOG_SOURCE: string = 'Barcodes';

export default class Barcodes extends React.Component<IBarcodesProps, {}> {

  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: Barcodes mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: Barcodes unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.cell} onClick={this.downloadCanvas} >   
        <QRCode           
          value={this.props.text} 
          renderAs="canvas"
          size={96}                          
          />
      </div>
    );
  }

  downloadCanvas(e){    
    console.log('CLICKED', e.target);
    //let url = e.target.toDataURL("png");
    const win = window.open();    

    //win.document.firstChild.appendChild(e.target);

    var newCanvas = win.document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = 96;
    newCanvas.height = 96;

    //apply the old canvas to the new one
    context.drawImage(e.target, 0, 0);    
    win.document.firstChild.lastChild.appendChild(newCanvas);
  }
}
