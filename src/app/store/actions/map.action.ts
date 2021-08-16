import { Marker } from 'src/app/models';

export namespace MapAction {
  export class AddMarker {
    static readonly type = '[Marker] Get map marker';
    constructor(public payload: Marker) {}
  }
}
