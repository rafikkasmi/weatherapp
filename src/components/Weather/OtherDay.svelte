<script>
    import { onMount } from "svelte";
    import Image from "./Image.svelte";
    onMount(() => {
        let date = new Date(data?.dt * 1000);
        formatedDate = `${date.getDate()}/${date.getMonth() + 1}`;
    });
    let formatedDate;
    export let data;
</script>

<div class="container">
    <h3>{formatedDate}</h3>
    <div class="img">
        <Image state={data?.weather[0].id} />
    </div>
    <h1 class="temp">{data?.temp?.day || ""}<span>°C</span></h1>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        padding: 20px;
        margin: 5px;
        border-radius: 20px;
        background: #232550;
    }
    .img {
        width: 100px;
    }
    .temp span {
        color: #0a69bf;
    }
</style>
