import { writable } from "svelte/store";


const Archives = writable(JSON.parse(localStorage.getItem("archive")) || {});
Archives.subscribe(value => {
    localStorage.setItem("archive", JSON.stringify(value));
});

export default Archives;