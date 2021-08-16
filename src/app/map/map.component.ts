import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Address, Marker } from '../models';
import { Observable } from 'rxjs/internal/Observable';
import { CompanyState } from '../store/state/company.state';
import { MapAction } from '../store/actions/map.action';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  public addresses: any = [];

  private initMap(): void {
    console.log('called 1');
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
    });
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }
  @Select(CompanyState.getAddresses)
  addresses$!: Observable<Address[]>;

  constructor(private store: Store) {
    console.log('called 2');
    this.addresses$.subscribe((a: any) => {
      console.log('called 3');
      if (a && a.length) {
        console.log(a);

        var latLong = a.map((m: any) => {
          return [m.company.name, m.latitude, m.longitude];
        });
        this.addresses = a;
        for (var i = 0; i < latLong.length; i++) {
          console.log(latLong[i], latLong[i][2], latLong[i][0]);
          var marker = L.marker([latLong[i][1], latLong[i][2]])
            .bindPopup(latLong[i][0])
            .addTo(this.map);
        }
      }
    });
  }
  private selectLocation() {
    this.map.on('click', (e: any) => {
      var coord = e.latlng;
      var lat = coord.lat;
      var long = coord.lng;
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + long
      );
      this.store.dispatch(new MapAction.AddMarker({ lat, long }));
      // var mp = new L.Marker([lat, lng]).addTo(this.map);
      //   alert(mp.getLatLng());
    });
  }
  ngAfterViewInit(): void {
    console.log('called 4', this.addresses);
    this.initMap();
    this.selectLocation();
  }
}
