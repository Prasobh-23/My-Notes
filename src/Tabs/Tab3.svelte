<script>
  import Archives from '../Store/Archives';
  import { onDestroy } from 'svelte';
  let dataFromArchive;

  const unsub = Archives.subscribe((currentArchive) => {
    dataFromArchive = currentArchive;
  });

  onDestroy(() => {
    unsub();
  });

  const emptyArchive = () => {
    Archives.set(0);
  };
</script>

{#if dataFromArchive != ''}
  <div class="container-4">
    <button class="empty-archive-btn" on:click={emptyArchive}
      >Empty Archive</button
    >
  </div>
  <div class="container-3">
    {#each dataFromArchive as archive}
      <div class="box-1">
        <header class="header-align">
          <h1 class="heading">{archive.title.toUpperCase()}</h1>
        </header>
        <p class="paragraph">{archive.text}</p>
      </div>
    {/each}
  </div>
{:else}
  <div style="text-align: center; color:grey"><h1>Archive is Empty</h1></div>
{/if}

<style>
  @media (min-width: 700px) {
    .container-3 {
      display: flex;
      justify-content: space-evenly;
      padding: 20px;
      border-radius: 5px;
    }
    .container-4 {
      display: flex;
      justify-content: flex-end;
      padding: 20px;
      border-radius: 5px;
    }
  }

  .box-1 {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    margin: 5px;
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
  .empty-archive-btn {
    font-family: 'Barlow', sans-serif;
    font-weight: bold;
    color: rgb(0, 0, 0);
    border-radius: 7px;
    border: 2px solid #f44336;
    cursor: pointer;
    transition-duration: 0.4s;
  }
  .empty-archive-btn:hover {
    background-color: #f44336;
    color: #fff;
  }
</style>
