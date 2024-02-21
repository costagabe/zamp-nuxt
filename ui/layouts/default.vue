<script setup lang="ts"></script>

<template>
  <u-container class="sm:px-0 lg:px-0 max-w-full mx-0 px-0" >
    <drawer>
      <slot />
    </drawer>
    <u-notifications />
  </u-container>
</template>
