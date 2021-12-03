import { writable } from "svelte/store";


const DataStore = writable(JSON.parse(localStorage.getItem("data")) || {});
DataStore.subscribe(value => {
    localStorage.setItem("data", JSON.stringify(value));
    console.log(value);
});

export default DataStore;