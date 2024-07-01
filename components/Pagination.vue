<template>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  interface PaginationProps {
    currentPage: number;
    totalPages: number;
  }
  
  export default defineComponent({
    name: 'Pagination',
    props: {
      currentPage: {
        type: Number as PropType<number>,
        required: true,
      },
      totalPages: {
        type: Number as PropType<number>,
        required: true,
      },
    },
    methods: {
      prevPage() {
        this.$emit('update:currentPage', this.currentPage - 1);
      },
      nextPage() {
        this.$emit('update:currentPage', this.currentPage + 1);
      },
    },
  });
  </script>
  
  <style>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  
  button {
    margin: 0 5px;
  }
  </style>
  