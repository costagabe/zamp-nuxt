<script setup lang="ts">
</script>
<template>
  <ul class="menu bg-base-200 w-56  min-h-full">
    <li>
      <h2 :class="'menu-title'">Sistema</h2>
      <ul>
        <li>
          <NuxtLink href="/" active-class="active">Aluguéis</NuxtLink>
        </li>
      </ul>
    </li>
    <li>
      <h2 class="menu-title">Configurações</h2>
      <ul>
        <li>
          <NuxtLink href="users" active-class="active">Users</NuxtLink>
        </li>
        <li><a>Item 2</a></li>
        <li><a>Item 3</a></li>
      </ul>
    </li>
  </ul>
</template>