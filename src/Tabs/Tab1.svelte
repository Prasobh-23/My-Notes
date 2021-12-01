<script>
  import DataStore from '../Store/DataStore';
  import Trash from '../Store/Trash';
  import Archives from '../Store/Archives';
  import TimeDate from '../Store/TimeDate';
  import Toast from 'svelte-toast';
  import { fade, fly, slide, scale } from 'svelte/transition';
  let database = [];
  let dataPresent = false;
  let inputTitle = '';
  let inputText = '';
  let reminderActive = false;
  let userId = '';
  let dataFromStore;
  let deletedItems = [];
  let deletedItem = {};
  let archivedItems = [];
  let archivedItem = {};
  let dateString = '';
  let timeString = '';
  let pressedReminder;
  let dateObject;
  let dateAndTime;

  const toast = new Toast();
  const storeInputFromUser = () => {
    userId = Math.random();
    let inputData = {
      id: userId,
      title: inputTitle,
      text: inputText,
    };
    dataPresent = true;
    inputTitle = '';
    inputText = '';
    reminderActive = false;
    database = [inputData, ...database];
    DataStore.update(() => {
      return database;
    });
    DataStore.subscribe((currentStore) => {
      dataFromStore = currentStore;
    });
  };

  const inputForReminder = (id) => {
    reminderActive = true;
    DataStore.subscribe((currentStore) => {
      pressedReminder = currentStore.filter((data) => data.id == id);
      console.log('input');
      console.log(pressedReminder);
    });
  };

  const activateReminder = () => {
    dateAndTime = {
      date: dateString,
      time: timeString,
    };
    for (let i = 0; i <= 0; i++) {
      dateObject = pressedReminder[i];
    }
    dateAndTime = [{ ...dateObject, ...dateAndTime }];
    TimeDate.update(() => {
      return dateAndTime;
    });
    countDown();
    toast.show('Reminder Set Successfuly ✔️');
  };

  let deleteItem = (id) => {
    DataStore.update((storedData) => {
      deletedItem = storedData.filter((data) => data.id == id);
      deletedItems = [...deletedItem, ...deletedItems];
      return storedData.filter((data) => data.id != id);
    });
    Trash.update(() => {
      return deletedItems;
    });
  };

  let moveToAchives = (id) => {
    DataStore.update((storedData) => {
      archivedItem = storedData.filter((data) => data.id == id);
      archivedItems = [...archivedItem, ...archivedItems];
      return storedData.filter((data) => data.id != id);
    });
    Archives.update(() => {
      return archivedItems;
    });
  };
  const countDown = () => {
    let dt = dateString + ' ' + timeString;
    let countDate = new Date(dt).getTime();
    let now = new Date().getTime();
    let gap = countDate - now;
    let textToToast = `Reminder Alert : ${dateObject.title}`;
    console.log(textToToast);
    setTimeout(() => {
      toast.show(textToToast);
    }, gap);
  };
</script>

<div class="container">
  <div class="entry-field">
    <form on:submit|preventDefault>
      <input
        class="input"
        type="text"
        placeholder="Title"
        bind:value={inputTitle}
      />
      <textarea
        class="textarea"
        placeholder="Write Something Here"
        bind:value={inputText}
      />
    </form>
    <footer>
      <img
        class="logo"
        src="./image/save.png"
        alt="save"
        on:click={storeInputFromUser}
      />
    </footer>
  </div>
  {#if reminderActive}
    <div class="reminder">
      <label class="date-component">
        <input type="date" bind:value={dateString} />
        <input type="time" bind:value={timeString} style="margin-left: 5px;" />
        <img
          class="logo"
          src="./image/save.png"
          alt="save"
          on:click={activateReminder}
        />
      </label>
    </div>
  {/if}
</div>

{#if dataPresent}
  <div class="container-2">
    {#each dataFromStore as data}
      <div class="box">
        <header class="header-align">
          <h2 class="heading">{data.title}</h2>
        </header>
        <p class="paragraph">{data.text}</p>
        <footer class="footer-align">
          <img
            on:click={() => moveToAchives(data.id)}
            class="logos"
            src="./image/ar.png"
            alt="archive"
          />
          <img
            on:click={() => deleteItem(data.id)}
            class="logos"
            src="./image/delete.png"
            alt="delete"
          />
          <img
            class="logos"
            src="./image/remind.png"
            alt="reminder"
            on:click={inputForReminder(data.id)}
          />
        </footer>
      </div>
    {/each}
  </div>
{/if}

<style>
  @media (min-width: 700px) {
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      min-height: 250px;
      padding: 20px;
      border-radius: 5px;
    }
    .container-2 {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      min-height: 250px;
      flex-wrap: wrap;
      padding: 10px;
    }
    .date-component {
      display: flex;
      justify-content: space-around;
      padding: 10px;
    }
  }
  .entry-field {
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex-basis: 40%;
    min-height: 200px;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 0 2px 8px rgb(134, 134, 134);
    border-radius: 10px;
    margin: 10px;
  }
  .entry-field .input {
    width: 100%;
    border: none;
    border-bottom: 2px solid rgb(0, 162, 255);
  }
  .entry-field .textarea {
    width: 100%;
    min-height: 150px;
  }
  .logo {
    width: 22px;
    height: 22px;
    padding: 5px;
    cursor: pointer;
  }

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    margin: 5px;
    box-shadow: 0 2px 8px rgb(134, 134, 134);
  }
  .heading {
    margin: 10px;
    text-align: center;
    color: #fff;
    font-family: 'Barlow', sans-serif;
  }
  .paragraph {
    text-align: center;
    margin: 25px;
    text-align: justify;
    color: rgb(0, 0, 0);
    font-family: 'Barlow', sans-serif;
    font-weight: bold;
  }
  .header-align {
    width: 100%;
    border-radius: 10px 10px 0 0;
    background-color: rgb(0, 162, 255);
  }
  .logos {
    width: 22px;
    height: 22px;
    padding: 5px;
    cursor: pointer;
  }
  .reminder {
    display: flex;
    padding: 20px;
    align-items: center;
  }
  .footer-align {
    width: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    border-top: 2px solid rgb(164, 222, 255);
  }
</style>
