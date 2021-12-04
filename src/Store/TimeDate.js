import { writable } from "svelte/store";


const TimeDate = writable(JSON.parse(localStorage.getItem("td")) || {});
TimeDate.subscribe(value => {
    localStorage.setItem("td", JSON.stringify(value));
});

export default TimeDate;