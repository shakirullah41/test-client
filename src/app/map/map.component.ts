import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private locations: any = [
    ['LOCATION_1', 11.8166, 122.0942],
    ['LOCATION_2', 11.9804, 121.9189],
    ['LOCATION_3', 10.7202, 122.5621],
    ['LOCATION_4', 11.3889, 122.6277],
    ['LOCATION_5', 10.5929, 122.6325],
  ];

  private initMap(): void {
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
  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
