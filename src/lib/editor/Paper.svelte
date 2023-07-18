<div class="paper">
  <slot />
</div>

<style lang="postcss">
  @media screen {
    .paper {
      @apply h-full w-full;
      @apply bg-white;
      @apply rounded shadow-2xl;
      @apply box-border;
      @apply mx-auto mt-4;
    }
  }

  .paper {
    width: var(--page-width);
    height: var(--page-height);
  }
  .paper:not(:last-child) {
    @apply break-after-page;
  }
</style>
