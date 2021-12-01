<script>
  import Header from './UI/Header.svelte';
  import Footer from './UI/Footer.svelte';
  import Tab1 from './Tabs/Tab1.svelte';
  import Tab2 from './Tabs/Tab2.svelte';
  import Tab3 from './Tabs/Tab3.svelte';
  import Tab4 from './Tabs/Tab4.svelte';
  import TabComponent from './UI/TabComponent.svelte';

  let items = [
    { label: 'Notes', value: 1, component: Tab1 },
    { label: 'Reminders', value: 2, component: Tab2 },
    { label: 'Archive', value: 3, component: Tab3 },
    { label: 'Trash', value: 4, component: Tab4 },
  ];
</script>

<Header />
<main>
  <TabComponent {items} />
</main>
<Footer />

<style>
  main {
    margin-top: 80px;
  }
</style>
