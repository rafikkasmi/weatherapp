<script>
    import { onMount } from "svelte";
    const CLEAR = "lf20_xlky4kvh";
    const RAINY = "lf20_f95ih42o";
    const THUNDERSTORM = "lf20_ystgjqv4";
    const CLOUDS = "lf20_1eaisi3u";
    const DRIZZLE = "lf20_gkc5nr3o";
    const SNOW = "lf20_wk76rqqc";
    const ATMO = "lf20_ci4fh3nd";

    export let state;
    let icon;
    onMount(() => {
        let weatherState = Math.floor((state / 100) % 10);
        switch (weatherState) {
            case 2:
                icon = THUNDERSTORM;
                break;
            case 5:
                icon = RAINY;
                break;
            case 6:
                icon = SNOW;
                break;
            case 3:
                icon = DRIZZLE;
                break;
            case 7:
                icon = ATMO;
                break;
            case 8:
                icon = CLOUDS;
                if (state == 800) icon = CLEAR;
                break;
            default:
                break;
        }
    });
</script>

{#if icon}
    <lottie-player
        src={`https://assets4.lottiefiles.com/packages/${icon}.json`}
        background="transparent"
        speed="1"
        loop
        autoplay
    />
{/if}
