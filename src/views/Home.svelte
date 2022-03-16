<script>
    import { onMount, createEventDispatcher } from "svelte";
    import CityInput from "../components/Home/CityInput.svelte";
    import GetPositionButton from "../components/Home/GetPositionButton.svelte";
    import Map from "../components/Home/Map.svelte";
    import { geodata } from "../stores/geodata";
    import { fade } from "svelte/transition";
    const dispatch = createEventDispatcher();
    onMount(() => {
        geodata.subscribe(({ changed }) => {
            if (changed) {
                disabled = false;
            } else {
                disabled = true;
            }
        });
    });
    let disabled = true;
</script>

<main class="container" in:fade>
    <h1>Weather App</h1>

    <h3>Choose a city :</h3>
    <div class="input-section">
        <div class="flex-center input-fields">
            <CityInput />
            <GetPositionButton />
        </div>
    </div>
    <div class="map">
        <Map />
    </div>
    <button {disabled} on:click={() => dispatch("nextPage")}
        >{disabled ? "Choose a city first" : "Get Weather Info"}</button
    >
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        height: 100%;
        width: 90%;
    }
    main > * {
        margin-bottom: 20px;
    }
    .input-section,
    .input-fields {
        width: 100%;
        max-width: 500px;
    }
    .map {
        width: 100%;
    }
    button {
        width: 80%;
        max-width: 500px;
        height: 60px;
        border: none;
        border-radius: 50px;
        background: #0a69bf;
        color: white;
        cursor: pointer;
        transition: 0.5s;
    }
    button:hover {
        background: #084c8c;
    }
    button:disabled {
        cursor: default;
        background: #094b8a;
        color: grey;
    }
</style>
