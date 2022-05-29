<template>
    <ListChallenge :findAllChallenge="findAllChallenge" />
</template>

<script>
import ListChallenge from "@/components/ListChallenge";
import AdminManageService from "@/services/AdminManageService";
export default {
  components: {
    ListChallenge,
  },
  data(){

    return {
      findAllChallenge: AdminManageService.getAllChallenge
    }
  }
  
};
</script>

<style>
</style>