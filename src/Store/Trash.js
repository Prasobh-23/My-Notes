import { writable } from "svelte/store";


const Trash = writable(JSON.parse(localStorage.getItem("trash")) || {});
Trash.subscribe(value => {
    localStorage.setItem("trash", JSON.stringify(value));
});

export default Trash;