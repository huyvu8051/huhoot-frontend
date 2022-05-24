<template>
  <div>
    <v-btn dark color="cyan" fixed left bottom style="z-index: 1">
      {{ $store.state.username }} : {{parseInt($store.state.totalPoints)}}
    </v-btn>
  </div>
</template>

