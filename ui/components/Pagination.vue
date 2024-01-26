<script setup lang="ts">
  import type { Pagination } from "~/ui/types/PaginationTypes";

  type PaginationProps = {
    pagination?: Pagination;
  };
  const props = withDefaults(defineProps<PaginationProps>(), {
    pagination: {
      page: 0,
      size: 10,
      totalItems: 0,
      totalPages: 3,
      sorted: false,
      isFirst: true,
      isLast: true,
    },
  });

  const model = useModel(props, "pagination");
  const route = useRoute();
  const router = useRouter();

  const page = ref(props.pagination.page);
  const size = ref(props.pagination.size);

  watch(
    () => [page.value, size.value],
    ([page, size]) => {
      router.replace({ query: { ...route.query, page, size } });
    }
  );
</script>

<template>
  <div class="flex justify-between w-full">
    <div>Página {{ model.page + 1 }} de {{ model.totalPages }}</div>
    <div class="join min-w-32 flex">
      <input
        :checked="model.isFirst"
        @input="page = 0"
        class="join-item btn btn-square w-6/12"
        type="radio"
        name="options"
        aria-label="Primeira"
      />
      <template v-if="!(model.isFirst && model.isLast) && model.totalPages > 2">
        <input
          v-for="i in model.totalPages - 2"
          :checked="page === i"
          @input="page = i"
          :aria-label="(i + 1).toString()"
          class="join-item btn btn-square"
          type="radio"
          name="options"
        />
      </template>

      <input
        v-if="!(model.isFirst && model.isLast)"
        :checked="model.isLast && !model.isFirst"
        @input="page = model.totalPages - 1"
        class="join-item btn btn-square w-6/12"
        type="radio"
        name="options"
        aria-label="Última"
      />
    </div>
    <div class="join min-w-32">
      <select
        v-model="size"
        class="select select-bordered w-full max-w-xs"
      >
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="15">15</option>
        <option :value="20">20</option>
      </select>
    </div>
  </div>
</template>
