<script>
    import { LeafletMap, Marker, TileLayer } from "svelte-leafletjs";
    import { latLng } from "leaflet";
    import { onMount, onDestroy } from "svelte";
    import { geodata } from "../../stores/geodata";
    const mapOptions = {
        center: [36.7538, 3.0588],
        zoom: 11,
    };
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };
    onMount(() => {
        map = leafletMap.getMap();
    });
    let leafletMap;
    let map;
    let unsubscribe = geodata.subscribe(({ lat, long }) => {
        map?.flyTo([lat, long], 11);
    });
    onDestroy(unsubscribe);
</script>

<div class="container">
    <LeafletMap class="map" bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions} />
        <Marker latLng={[$geodata.lat, $geodata.long]} />
    </LeafletMap>
</div>

<style>
    .container {
        position: relative;
        width: 100%;
        height: 300px;
        overflow: hidden;
        border-radius: 40px;
    }
</style>
