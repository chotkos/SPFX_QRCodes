import * as React from 'react';
import * as ReactDOM from 'react-dom';
 
import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';
 
import Barcodes, { IBarcodesProps } from './components/Barcodes';
 
export interface IBarcodesFieldCustomizerProperties { 
  sampleText?: string;
}

export default class BarcodesFieldCustomizer
  extends BaseFieldCustomizer<IBarcodesFieldCustomizerProperties> {

  @override
  public onInit(): Promise<void> { 
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Use this method to perform your custom cell rendering.

    //Get info about cell
    console.log('RENDERING CELL', event, this.properties);

    //For files
    let filerRef = event.listItem['_values'].get('FileRef'); 
    let text: string = this.context.pageContext.site.absoluteUrl + filerRef;

    //For listItem
    if(filerRef.indexOf('.000')!= -1){
      let Id =  event.listItem['_values'].get('ID');
      text = `https://chotkos.sharepoint.com/Lists/SPFX_Tweets/DispForm.aspx?ID=${Id}`
    }

    //Reference to parent container
    let parentElement = event.domElement;

    //Let it go!
    const barcodes: React.ReactElement<{}> =
      React.createElement(Barcodes, { text, parentElement } as IBarcodesProps);

    ReactDOM.render(barcodes, event.domElement);
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void { 
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
