<div class="card m-4 rounded-md bg-base-100 shadow-2xl">
  <div class="card-body">
    {#if $$slots.title}
      <h2 class="card-title">
        <slot name="title" />
      </h2>
    {/if}
    <slot />
  </div>
</div>
