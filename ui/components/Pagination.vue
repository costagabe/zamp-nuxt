<script setup lang="ts">
  import type { Pagination } from "~/ui/types/PaginationTypes";

  const [pagination] = defineModel<Pagination>("pagination", {
    default: {
      pagination: {
        page: 0,
        size: 10,
        totalItems: 0,
        totalPages: 3,
        sorted: false,
        isFirst: true,
        isLast: true,
      },
    },
  });

  const route = useRoute();
  const router = useRouter();


  watch(
    () => [pagination.value.page, pagination.value.size],
    ([page, size]) => {
      router.replace({ query: { ...route.query, page, size } });
    }
  );

  const page = computed({
    get(){
      return pagination.value.page + 1;
    }, set(value: number){
      pagination.value.page = value - 1;
    }
  })
</script>

<template>
  <div class="flex justify-between w-full">
    <div>Página {{ pagination.page + 1 }} de {{ pagination.totalPages }}</div>
    <div class=" min-w-32 flex">
      <u-pagination
        v-model="page"
        :page-count="pagination.size"
        :total="pagination.totalItems ?? 0"
      />
    </div>
    <div class=" min-w-32">
      <u-select v-model="pagination.size" :options="[2,5,10,15,20]"/>
    </div>
  </div>
</template>
