<template>
  <ConfirmDialog :action="action" v-slot="{attrs, on}">
    <v-icon small class="mr-2" v-bind="attrs" v-on="on"> code </v-icon>
  </ConfirmDialog>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog";
export default {
  props: {
    itemId: Number,
  },

  components: {
    ConfirmDialog,
  },
  data() {
    return {
      action: {
        confirm: () => {
          console.log("Delete " + this.itemId);
        },
      },
    };
  },
};
</script>

<style>
</style>