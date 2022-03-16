<script>
    import { onMount, createEventDispatcher } from "svelte";
    import { geodata } from "../stores/geodata";
    import Today from "../components/Weather/Today.svelte";
    import OtherDay from "../components/Weather/OtherDay.svelte";
    import axios from "axios";
    import { fade } from "svelte/transition";

    const dispatch = createEventDispatcher();

    const API_KEY = "4e44c1f184fffa32bb5788711dc09c56";
    const { lat, long } = $geodata;
    axios
        .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
        )
        .then((response) => {
            console.log(response.data?.daily);
            todaydata = response.data?.daily.shift();
            weekdata = response.data?.daily;
        });
    let todaydata;
    let weekdata = [];
    function goBack() {
        //set data back to default
        geodata.set({ lat: 36.7538, long: 3.0588, changed: false });
        dispatch("prevPage");
    }
</script>

<main in:fade>
    {#if todaydata}
        <button class="back flex-center" on:click={goBack}
            ><svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <line x1="20" y1="12" x2="4" y2="12" />
                <polyline points="10 18 4 12 10 6" />
            </svg>
        </button>
        <Today data={todaydata} />
    {/if}
    <div class="otherdays">
        {#each weekdata as day}
            <OtherDay data={day} />
        {/each}
    </div>
</main>

<style>
    main {
        padding: 80px 0;
        text-align: center;
    }
    .otherdays {
        margin: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
    }
    .back {
        position: relative;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: #0a69bf;
        cursor: pointer;
    }
    .back svg {
        width: 30px;
    }
</style>
