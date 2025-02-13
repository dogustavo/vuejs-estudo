<script setup lang="ts">
import { computed, defineProps, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface IProps {
  limit: number
  offset: number
  count: number
  next: null | string
  previous: null | string
}

const route = useRoute()
const router = useRouter()
const searchTerm = ref(route.query)

const paginationProps = defineProps<IProps>()

const page = reactive({
  ...paginationProps,
})

watch(
  () => paginationProps,
  (newVal) => {
    page.count = +newVal.count
    page.limit = +newVal.limit
    page.next = newVal.next
    page.offset = +newVal.offset
    page.previous = newVal.previous
  },
  { deep: true, immediate: true },
)

const totalPages = computed(() => {
  return Math.ceil(page.count / page.limit)
})
const currentPage = computed(() => {
  return Math.floor(page.offset / page.limit) + 1
})

const handlePagination = (type: string) => {
  const paginate = {
    first: 0,
    prev: page.offset - page.limit,
    next: page.offset + page.limit,
    last: (totalPages.value - 1) * page.limit,
  }[type]

  const filter = {
    ...searchTerm.value,
    offset: paginate,
  }

  router.replace({ path: route.path, query: filter })
}
</script>

<template>
  <div>
    <button @click="handlePagination('prev')" :disabled="currentPage < 2">Voltar</button>
  </div>

  <div class="paginate_pages">
    <div v-if="currentPage > 1">
      <button @click="handlePagination('prev')">
        {{ currentPage - 1 }}
      </button>
    </div>

    <div>
      <span>{{ currentPage }}</span>
    </div>

    <div v-if="currentPage < totalPages">
      <button @click="handlePagination('next')">
        {{ currentPage + 1 }}
      </button>
    </div>
  </div>

  <div>
    <button @click="handlePagination('next')" :disabled="currentPage >= totalPages">Próximo</button>
  </div>
</template>
