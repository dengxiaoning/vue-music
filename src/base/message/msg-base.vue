<template>
  <div class="app-toast"
       v-if="isShow"
       :class="{'info': type === 'info','success': type === 'success','warning': type=== 'warning','danger': type=== 'danger'}">
    {{text}}
  </div>
</template>
<style scoped>
  .app-toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background: #ccc;
    padding: 10px;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    color: #fff;
    z-index: 99999;
  }

  .info {
    background: #00aaee;
  }

  .success {
    background: #00ee6b;
  }

  .warning {
    background: #eea300;
  }

  .danger {
    background: #ee000c;
  }
</style>
