<script lang="ts">
  import Paper from './Paper.svelte';
  import EditorLayout from './EditorLayout.svelte';
</script>

<EditorLayout>
  <svelte:fragment slot="preview">
    <Paper>page 1</Paper>
    <Paper>page 2</Paper>
  </svelte:fragment>
</EditorLayout>
