<template>
  <q-field filled dense bg-color="grey-2">
    <template v-slot:prepend>
      <q-avatar rounded size="24px" color="secondary" text-color="white">
        {{ author | formatAvatar }}
      </q-avatar>
    </template>
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">
        <span class="text-primary">{{ author }}<span class="text-red">{{admin ? '(博主)':'' }}</span></span>
        <span class="">回复</span>
        <span class="text-primary">{{ replyTo }}</span>
        <span>:</span>
        {{ status? content: '评论审核中' }}
        <q-btn v-if="status" flat dense size="xs" color="primary" icon="message" label="回复" @click="editComment()"/>
      </div>
    </template>
    <!-- <template v-slot:after>
      <q-btn flat dense size="12" color="primary" icon="message" label="回复" @click="editComment()"/>
    </template> -->
  </q-field>
</template>
<script>
export default {
  name: 'YComment',
  props: {
    id: {
      type: Number
    },
    content: {
      type: String
    },
    author: {
      type: String
    },
    replyToId: {
      type: Number
    },
    replyTo: {
      type: String
    },
    createTime: {
      type: Number
    },
    parentId: {
      type: Number
    },
    admin: {
      type: Boolean
    },
    status: {
      type: Boolean
    }
  },
  methods: {
    editComment () {
      this.$emit('new-comment', { parentId: this.parentId, replyTo: this.author, replyToId: this.id })
    }
  },
  filters: {
    formatAvatar (value) {
      return value.charAt(0)
    }
  }
}
</script>
<style scoped>
</style>
