<template>
  <div class="text-center q-pa-lg">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">
      Sorry, nothing here...<strong>(404)</strong>
    </p>
    <q-btn
      color="primary"
      to="/"
      label="回到主页"
    />
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
