<script>
    import { geodata } from "../../stores/geodata";
    function getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lat = position.coords.latitude;
                    let long = position.coords.longitude;
                    geodata.set({ lat, long, changed: true });
                },
                () => {
                    fetch(
                        "https://location.services.mozilla.com/v1/geolocate?key=test"
                    )
                        .then((el) => el.json())
                        .then((res) => {
                            geodata.set({
                                lat: res.location.lat,
                                long: res.location.lng,
                                changed: true,
                            });
                        });
                }
            );
        }
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
