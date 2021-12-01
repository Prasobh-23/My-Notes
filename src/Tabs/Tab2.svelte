<script>
  import TimeDate from '../Store/TimeDate';
  import { onDestroy } from 'svelte';
  let dataFromDateStore;

  const unsub = TimeDate.subscribe((currentDate) => {
    dataFromDateStore = currentDate;
  });

  onDestroy(() => {
    unsub();
  });
  console.log(dataFromDateStore);
</script>

{#if dataFromDateStore != ''}
  <div class="container-5">
    {#each dataFromDateStore as data}
      <div class="box-2">
        <header class="header-align">
          <h1 class="heading">{data.title}</h1>
        </header>
        <p class="paragraph">{data.text}</p>
        <p style="text-align: center;">{data.date} {data.time}</p>
      </div>
    {/each}
  </div>
{:else}
  <div style="text-align: center; color:grey"><h1>Reminder is Empty</h1></div>
{/if}

<style>
  @media (min-width: 700px) {
    .container-5 {
      display: flex;
      justify-content: center;
      padding: 20px;
      border-radius: 5px;
    }
  }
  .box-2 {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    margin: 5px;
    min-width: 80px;
    box-shadow: 0 2px 8px rgb(134, 134, 134);
  }
  .heading {
    text-align: center;
    margin: 10px;
    color: #fff;
    font-family: 'Barlow', sans-serif;
  }
  .header-align {
    width: 100%;
    border-radius: 10px 10px 0 0;
    background-color: rgb(0, 162, 255);
  }
  .paragraph {
    text-align: center;
    margin: 25px;
    text-align: justify;
    color: rgb(0, 0, 0);
    font-family: 'Barlow', sans-serif;
    font-weight: bold;
  }
</style>
