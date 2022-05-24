<template>
  <div>
    <v-btn dark depressed color="cyan" class="btn-bot btn-left">
      <b class="btn-text">
        {{ $store.state.username }} : {{ parseInt($store.state.totalPoints) }}
      </b>
    </v-btn>
  </div>
</template>

