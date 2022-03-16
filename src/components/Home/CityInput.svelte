<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { geodata } from "../../stores/geodata";
    import { cityname } from "../../stores/city";
    const API_KEY = "db8f40e05485447bba350482bc66fd87";

    function search() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            axios(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${API_KEY}`
            ).then(function (response) {
                items = response.data.features;
            });
        }, 500);
    }
    function onSelect(city) {
        geodata.set({
            lat: city.properties.lat,
            long: city.properties.lon,
            changed: true,
        });
        query = `${city.properties.address_line1}, ${
            city.properties.city || ""
        },${city.properties.country}`;
        items = [];
    }
    onMount(() => {
        geodata.subscribe(({ lat, long }) => {
            if (firstChange) return;
            axios(
                `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${API_KEY}`
            ).then(function (response) {
                let city = response.data.features[0];
                query = `${city.properties.address_line1}, ${
                    city.properties.city || ""
                },${city.properties.country}`;

                cityname.set(
                    `${city.properties.city || city.properties.address_line1},${
                        city.properties.country
                    }`
                );
            });
        });
        firstChange = false;
    });
    let timeout;
    let query;
    let items = [];
    let firstChange = true;
</script>

<div class="dropdown">
    <input
        type="text"
        placeholder="Search a city"
        bind:value={query}
        on:keyup={search}
    />
    {#if query != "" && items.length > 0}
        <div class="results">
            {#each items as city}
                <div class="item" on:click={onSelect(city)}>
                    {city.properties.address_line1}, {city.properties.city ||
                        ""},{city.properties.country}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .dropdown {
        width: 90%;
        position: relative;
    }
    input {
        width: 100%;
        height: 45px;
        padding: 10px;
        border: none;
        background: linear-gradient(360deg, #21245a 22.03%, #131541 144.07%);
        border-radius: 50px;
        color: white;
        margin-right: 10px;
        outline: none;
    }
    .results {
        position: absolute;
        width: 100%;
        background: #131541;
        z-index: 10000;
        padding: 10px;
    }
    .item {
        padding: 10px;
        border-bottom: 0.2px rgba(255, 255, 255, 0.213) solid;
        transition: 0.5s;
    }
    .item:hover {
        background: #202470;
    }
</style>
