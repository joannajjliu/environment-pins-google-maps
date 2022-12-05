import { MarkerClusterer } from "@googlemaps/markerclusterer";

// declare global {
//   interface Window {
//     initMap: () => void;
//     eqfeed_callback: (results: any) => void;
//   }
// }

// -- Google Maps --

const locations = [
  { lat: 40.56391, lng: -75.7 },
  { lat: 43.718234, lng: -75.363181 },
  { lat: 43.727111, lng: -75.371124 },
  { lat: 43.848588, lng: -74.209834 },
  { lat: 43.851702, lng: -74.216968 },
  { lat: 34.671264, lng: -75.863657 },
  { lat: 35.304724, lng: -77.662905 },
  { lat: 36.817685, lng: -50.699196 },
  { lat: 36.828611, lng: -50.790222 },
  { lat: 37.75, lng: -77.116667 },
  { lat: 37.759859, lng: -77.128708 },
  { lat: 37.765015, lng: -77.133858 },
  { lat: 37.770104, lng: -77.143299 },
  { lat: 37.7737, lng: -77 - 77187 },
  { lat: 37.774785, lng: -77.137978 },
  { lat: 37.819616, lng: -78.968119 },
  { lat: 38.330766, lng: -78.695692 },
  { lat: 39.927193, lng: -50.053218 },
  { lat: 41.330162, lng: -49.865694 },
  { lat: 42.734358, lng: -72.439506 },
  { lat: 42.734358, lng: -72.501315 },
  { lat: 42.735258, lng: -72.438 },
  { lat: 43.999792, lng: -51.463352 },
];

// Initialize and add the map
export function initBasicMap(): void {
  // The location of Ottawa
  const ottawa = { lat: 45.28943816781922, lng: -75.71376304685221 };
  // The map, centered at Ottawa
  const map = new google.maps.Map(document.getElementById("basic-map"), {
    zoom: 10,
    center: ottawa,
    mapTypeId: "roadmap",
  });

  map.addListener("click", function (e) {
    console.log("on click", e.latLng.lng(), e.latLng.lat());
    // data.lat = e.latLng.lat();
    // data.lng = e.latLng.lng();
    // addToFirebase(data);
  });

  // Create the search box and link it to the UI element.
  const input = document.getElementById(
    "address-autocomplete"
  ) as HTMLInputElement;
  const searchBox = new google.maps.places.SearchBox(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
  });

  // https://developers.google.com/maps/documentation/javascript/place-autocomplete
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    console.log(
      "PLACE",
      searchBox.getPlaces(),
      searchBox.getPlaces()[0].geometry.location.lat(),
      searchBox.getPlaces()[0].geometry.location.lng()
    );

    if (places.length == 0) {
      return;
    }

    let markers: google.maps.Marker[] = [];

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon as string,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      const marker = new google.maps.Marker({
        map,
        icon,
        title: `${place.name}`,
        position: place.geometry.location,
      });
      // Create a marker for each place.
      markers.push(marker);

      google.maps.event.addListener(marker, "click", function () {
        document
          .getElementById("selected-address")
          .insertAdjacentHTML(
            "beforeend",
            `<div>${(marker as any).title}</div>`
          );
        console.log("marker clicked", marker, (marker as any).position.lat());
      });

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    // map.fitBounds(bounds);
  });
  // The marker, positioned at Ottawa
  // const marker = new google.maps.Marker({
  //   position: ottawa,
  //   map,
  // });
}

export function initClusterMap(): void {
  const map = new google.maps.Map(document.getElementById("cluster-map"), {
    zoom: 3,
    center: { lat: 45.28943816781922, lng: -75.71376304685221 },
    mapTypeId: "roadmap",
  });

  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  // Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Add markers to the map
  const markers = locations.map((position, i) => {
    const label = labels[i % labels.length];
    const marker = new google.maps.Marker({
      position,
      label,
    });
    // Markers can only be keyboard focusable when they have
    // click listeners.
    // Open info window when marker is clicked.
    marker.addListener("click", () => {
      infoWindow.setContent(label);
      infoWindow.open(map, marker);
    });

    return marker;
  });

  // Add a marker clusterer to manage the markers.
  new MarkerClusterer({ markers, map });
}

// declare global {
//   interface Windows {
//     initMap: () => void;
//   }
// }

// window.initMap = initClusterMap;

let map: google.maps.Map;

export function initJsonMap(): void {
  map = new google.maps.Map(
    document.getElementById("json-map") as HTMLElement,
    {
      zoom: 2,
      center: new google.maps.LatLng(2.8, -187.3),
      mapTypeId: "terrain",
    }
  );
  const script = document.createElement("script");

  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src =
    "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
  document.getElementsByTagName("head")[0].appendChild(script);
}

// Loop through the results array and place a marker for each
// set of coordinates.
export const eqfeed_callback = function (results: any) {
  console.log("eqfeed_callback", eqfeed_callback);
  for (let i = 0; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);

    new google.maps.Marker({
      position: latLng,
      map: map,
    });
  }
};
