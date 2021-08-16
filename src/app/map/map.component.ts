import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Address } from '../models';
import { Observable } from 'rxjs/internal/Observable';
import { CompanyState } from '../store/state/company.state';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  public addresses: any = [];

  private locations: any = [
    ['LOCATION_1', 11.8166, 122.0942],
    ['LOCATION_2', 11.9804, 121.9189],
    ['LOCATION_3', 10.7202, 122.5621],
    ['LOCATION_4', 11.3889, 122.6277],
    ['LOCATION_5', 10.5929, 122.6325],
  ];

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
    // var marker = L.marker([51.5, -0.09]).addTo(this.map)

    for (var i = 0; i < this.locations.length; i++) {
      var marker = L.marker([this.locations[i][1], this.locations[i][2]])
        .bindPopup(this.locations[i][0])
        .addTo(this.map);
    }
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

  ngAfterViewInit(): void {
    console.log('called 4', this.addresses);
    this.initMap();
  }
}
