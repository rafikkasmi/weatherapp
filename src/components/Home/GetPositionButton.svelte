<script>
    import { geodata } from "../../stores/geodata";
    function getPosition() {
        console.log("nikrbk");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                geodata.set({ lat, long, changed: true });
            },
            (err) => console.error(err)
        );
    }
</script>

<button class="flex-center" on:click={getPosition}
    ><img src="/imgs/localisation.png" /></button
>

<style>
    button {
        width: 90px;
        height: 45px;
        border: none;
        background: linear-gradient(360deg, #21245a 22.03%, #131541 144.07%);
        border-radius: 50px;
        cursor: pointer;
    }
    img {
        width: 25px;
    }
</style>
