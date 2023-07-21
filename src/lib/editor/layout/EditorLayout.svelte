<div class="layout">
  <div class="editor">
    <slot name="editor" />
  </div>
  <div class="preview">
    <slot name="preview" />
  </div>
</div>

<style lang="postcss">
  @media screen {
    .layout {
      @apply h-screen w-screen overflow-hidden;
      @apply flex flex-row portrait:flex-col;
    }
    .editor {
      @apply flex-1;
      @apply overflow-y-scroll;
      @apply bg-gray-400;
    }
    .preview {
      @apply flex-1;
      @apply overflow-y-scroll;
      @apply bg-gray-200;
      @apply p-4;
    }
  }

  .editor {
    @apply print:hidden;
  }
</style>
