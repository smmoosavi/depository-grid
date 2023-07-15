<script lang="ts">
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

  import Button from './Button.svelte';

  let count = 0;
  function handleClick() {
    count += 1;
  }
  let argTypes = {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  };
</script>

<Meta title="Example/Button" component={Button} {argTypes} />

<Template let:args>
  <Button {...args} on:click={handleClick}>
    You clicked: {count}
  </Button>
</Template>

<Story name="Primary" args={{ primary: true }} />
<Story name="Secondary" args={{}} />
<Story name="large" args={{ size: 'large' }} />
<Story name="small" args={{ size: 'small' }} />

<Story name="Button No Args">
  <Button>Label <span class="text-red-600">red</span></Button>
</Story>
