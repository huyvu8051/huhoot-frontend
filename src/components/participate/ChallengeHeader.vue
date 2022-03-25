<template>
  <div>
    <v-btn dark color="cyan" fixed left bottom style="z-index: 1">
      {{ $store.state.username }}
    </v-btn>
    <v-btn dark color="cyan" fixed right bottom style="z-index: 1">
      {{ parseInt($store.state.totalPoints) }}
    </v-btn>
  </div>
</template>

