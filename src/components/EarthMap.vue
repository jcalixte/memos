<template>
  <section id="earth" class="earth-container"></section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { debounce } from 'lodash-es'
import { Location } from '@/models/Location'

@Component
export default class EarthMap extends Vue {
  @Prop({ type: Array, default: () => [] })
  private locations!: Location[]
  @Prop({ type: Boolean, default: false })
  private defineLocation!: boolean
  private earth: typeof mapboxgl.Map | null = null
  private markerLocation: typeof mapboxgl.Marker | null = null
  private emit = debounce((earthMap: EarthMap) => {
    if (!earthMap.markerLocation) {
      return
    }
    const lnglat = earthMap.markerLocation.getLngLat()
    earthMap.$emit('located', {
      ...lnglat
    })
  }, 150)

  private mounted() {
    this.initEarthMap()

    if (!this.earth) {
      return
    }

    const markers = this.locations.map((location) => [
      location.lng,
      location.lat
    ])

    markers.forEach((marker) => {
      const el = document.createElement('i')
      el.classList.add('marker', 'gg-pin-alt')

      new mapboxgl.Marker(el).setLngLat(marker).addTo(this.earth)
    })
  }

  private initEarthMap() {
    mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY

    const latitudes = this.locations.map((location: Location) => location.lat)
    const longitudes = this.locations.map((location: Location) => location.lng)
    const minLat = Math.min(...latitudes)
    const maxLat = Math.max(...latitudes)
    const minLng = Math.min(...longitudes)
    const maxLng = Math.max(...longitudes)

    // [sw, ne]
    const bounds = this.locations.length
      ? [
          [minLng, minLat],
          [maxLng, maxLat]
        ]
      : undefined

    this.earth = new mapboxgl.Map({
      container: 'earth',
      style: 'mapbox://styles/mapbox/streets-v11',
      bounds,
      fitBoundsOptions: {
        padding: 30,
        maxZoom: 12
      }
    })

    this.earth.addControl(new mapboxgl.NavigationControl())
    const geolocControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })

    this.earth.addControl(geolocControl)

    if (!this.defineLocation) {
      return
    }
    geolocControl.trigger()

    this.markerLocation = new mapboxgl.Marker()
      .setLngLat(this.earth.getCenter())
      .addTo(this.earth)

    this.earth.on('move', () => {
      this.markerLocation.setLngLat(this.earth.getCenter())
      this.emit(this)
    })
  }
}
</script>

<style lang="scss">
@import '../styles/earth-map.css';

.earth-container {
  min-height: 50vh;
  height: 100%;
}
.marker-location {
  color: var(--primary-color);
  z-index: 1;
}
</style>
