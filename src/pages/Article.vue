<template>
  <div class="row flex q-col-gutter-lg" v-scroll="updateActiveToc">
    <div class="col-12 col-md-10 bg-white">
      <div class="row justify-center q-pt-lg">
        <q-item-label class="text-h4">{{article.title}}</q-item-label>
      </div>
      <div id="content" class="markdown-body">
        <div class="q-pa-md" v-html="article.content"></div>
      </div>
      <div class="q-pt-lg row justify-end text-caption">
        <div class="q-pa-sm">阅读({{ article.views }})</div>
        <div class="q-pa-sm">评论({{ article.countComments }})</div>
        <div class="q-pa-sm">updated@{{ article.updateTime | formatDate }}</div>
      </div>
      <q-separator />
      <div class="q-pt-md q-pb-md row justify-between text-caption">
        <div class="q-pa-sm" v-if="previous">上一篇:<q-btn flat dense size="0.75rem" color="primary" :label="previous.title" :to="'/article/' + previous.id" no-caps stretch/></div>
        <div class="q-pa-sm" v-if="next">下一篇:<q-btn flat dense size="0.75rem" color="primary" :label="next.title" :to="'/article/' + next.id" no-caps stretch/></div>
      </div>
      <q-separator />
      <div>
        <div class="q-pa-md">
          <q-card flat dense>
            <q-card-section class="text-caption text-grey">
              评论区
            </q-card-section>
            <q-card-section :horizontal="!$q.screen.lt.sm">
              <q-card-section class="col-12 col-md-4">
                <q-input ref="nickname" filled v-model="comment.author" label="昵称" lazy-rules=""
                :rules="[val => val && val.length >= 2 && val.length < 20 || '请输入昵称，长度为2-20个字符']"
                hint="长度为2-20个字符"/>
              </q-card-section>
              <q-card-section class="col-12 col-md-8">
                <q-input filled v-model="comment.email" label="邮箱" hint="请输入正确邮箱，有回复博主会邮件通知哦"/>
              </q-card-section>
            </q-card-section>
            <q-card-section>
              <q-input ref="comment" v-model="comment.content" filled type="textarea" counter maxlength="300" label="评论"
                lazy-rules
                :rules="[val => val && val.length > 0 || '请输入评论']"/>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn color="primary" label="确认" @click="addComment()" />
            </q-card-actions>
          </q-card>
        </div>
        <q-separator />
        <q-card v-for="comment in comments" :key="comment.id" flat>
          <q-item >
            <q-item-section side>
              <q-avatar size="24px" color="secondary" text-color="white">
                {{ comment.author | formatAvatar}}
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ comment.author }}<span class="text-red">{{comment.admin ? '(博主)':'' }}</span></q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ comment.createTime | formatDate }}
            </q-item-section>
          </q-item>
          <q-card-section class="q-pt-none q-pb-none q-pr-none" style="max-width: 1140px">
            <div v-if="comment.status" class="comment-content">
              {{ comment.content }}
              <q-btn dense flat size="xs" color="primary" icon="message" label="回复" @click="openDailogReply({ parentId: comment.id, replyTo: comment.author, replyToId: comment.id })"/>
            </div>
            <div v-if="!comment.status" class="comment-content text-grey text-center">
              评论待审核......
            </div>
          </q-card-section>
          <q-card-section>
            <div class="comment-content row justify-center q-pt-md q-pb-md" style="max-width: 1100px">
              <div v-for="reply in comment.replies" :key="reply.id" class="row bg-grey-2" style="width: 100%; max-width: 900px;">
                <y-comment v-bind="reply" @new-comment="openDailogReply($event)"/>
              </div>
            </div>
          </q-card-section>
          <q-separator />
        </q-card>
      </div>
    </div>
    <div class="col-12 col-md-2">
      <div class="bg-grey-1" style="position: sticky; top: 80px">
        <q-list dense>
          <q-item class="bg-grey-2">
            目录
          </q-item>
          <q-item clickable
            v-for="(anchor, index) in titles"
            :key="index"
            :active="activeIndex === index"
            active-class="bg-white"
            :class="getPaddingH(anchor.name[1])"
            @click="handleAnchorClick(anchor.id)">
              {{ anchor.title }}
          </q-item>
        </q-list>
      </div>
    </div>
    <q-dialog v-model="dailogReply">
      <div class="bg-white q-pa-md q-gutter-md" style="width: 100%; max-width: 800px">
        <q-card flat>
          <q-card-section class="text-h6">
            发表评论
          </q-card-section>
          <q-card-section :horizontal="!$q.screen.lt.sm">
            <q-card-section class="col-12 col-md-4">
              <q-input ref="nicknameDailog" filled v-model="comment.author" label="昵称" lazy-rules
              :rules="[val => val && val.length >= 2 && val.length < 20 || '请输入昵称，长度为2-20个字符']"
              hint="长度为2-20个字符"/>
            </q-card-section>
            <q-card-section class="col-12 col-md-8">
              <q-input filled v-model="comment.email" label="邮箱" hint="请输入正确邮箱，有回复博主会邮件通知哦"/>
            </q-card-section>
          </q-card-section>
          <q-card-section>
            <q-input ref="commentDailog" v-model="comment.content" filled type="textarea" counter maxlength="300"
              lazy-rules
              :rules="[val => val && val.length > 0 || '请输入评论']">
              <template v-slot:prepend>
                <span style="font-size: 12px" >回复{{ comment.replyTo }}: </span>
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions align="around">
            <q-btn color="red" label="取消" v-close-popup />
            <q-btn color="primary" label="确认" @click="postReply()" />
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import 'github-markdown-css/github-markdown.css'
import { date } from 'quasar'
import { mapGetters } from 'vuex'
import YComment from 'components/YComment'
import notify from '../scripts/notify'

export default {
  components: { YComment },
  data () {
    return {
      activeIndex: -1,
      dailogReply: false,
      comment: {
        author: '',
        email: '',
        content: '',
        replyToId: -1,
        parentId: -1,
        replyTo: '',
        articleId: -1
      }
    }
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    return store.dispatch('article/fetchArticle', currentRoute.params.id)
  },
  methods: {
    initForm () {
      const articleId = this.$route.params.id
      this.comment.articleId = articleId
      if (this.$q.cookies.has('guest')) {
        const guest = this.$q.cookies.get('guest')
        this.comment.author = guest.name
        this.comment.email = guest.email
      }
    },
    generateTocs () {
      const anchors = document.getElementById('content').querySelectorAll('h1, h2, h3')
      const titles = []
      anchors.forEach(element => {
        titles.push({
          id: element.firstElementChild.id,
          name: element.localName,
          title: element.innerText
        })
      })
      this.$store.commit('article/setTitles', titles)
    },
    getPaddingH (num) {
      return 'padding-h' + num
    },
    handleAnchorClick (id) {
      // const selector = this.getSelector(id)
      document.getElementById(id).scrollIntoView({
        alignToTop: true,
        behavior: 'smooth'
      })
    },
    updateActiveToc () {
      const position = document.documentElement.scrollTop || document.body.scrollTop
      let last = -1
      const titles = this.$store.getters['article/titles']
      for (const i in titles) {
        const section = titles[i]
        const item = document.getElementById(section.id)
        if (item === null) {
          continue
        }
        if (item.offsetTop + 30 >= position) {
          if (last === -1) {
            last = parseInt(i)
          }
          break
        } else {
          last = parseInt(i)
        }
      }
      this.activeIndex = last
    },
    openDailogReply (value) {
      this.comment.replyToId = value.replyToId
      this.comment.replyTo = value.replyTo
      this.comment.parentId = value.parentId
      this.dailogReply = true
    },
    addComment () {
      if (!this.$refs.comment.validate() || !this.$refs.nickname.validate()) {
        return
      }
      this.saveGuest()
      this.$axios.post('/api/comment', {
        articleId: this.comment.articleId,
        content: this.comment.content,
        author: this.comment.author,
        email: this.comment.email
      })
        .then(response => {
          notify.success('评论成功啦，等博主审核完毕才会显示哦！', 'center')
          this.comment.content = ''
          this.$store.commit('article/addComment', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    saveGuest () {
      this.$q.cookies.set('guest', {
        name: this.comment.author,
        email: this.comment.email
      }, {
        expires: 14
      })
    },
    postReply () {
      if (!this.$refs.commentDailog.validate() || !this.$refs.nicknameDailog.validate()) {
        return
      }
      this.$axios.post('/api/comment', this.comment)
        .then(response => {
          notify.success('回复成功啦，等博主审核完毕才会显示哦！', 'center')
          this.dailogReply = false
          this.$store.commit('article/addReply', response.data)
          this.comment.content = ''
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // for meta
    getKeywords () {
      const list = []
      this.article.labels.forEach(label => {
        list.push(label.name)
      })
      return list.join(',')
    }
  },
  mounted () {
    this.generateTocs()
    this.initForm()
  },
  computed: {
    ...mapGetters('article', [
      'article',
      'titles',
      'comments',
      'previous',
      'next'
    ])
  },
  meta () {
    return {
      title: this.article.title,
      meta: {
        keywords: { name: 'keywords', content: this.getKeywords() },
        description: { name: 'description', content: this.article.abstractText }
      },
      link: {
        github: { rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/highlight.js/10.1.0/styles/github.min.css' },
        katex: { rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/KaTeX/0.11.1/katex.min.css' }
      }
    }
  },
  filters: {
    formatDate: function (value) {
      return date.formatDate(value, 'YYYY-MM-DD')
    },
    formatAvatar: function (value) {
      return value.charAt(0)
    }
  }
}
</script>

<style scoped>
.active-class{
  background-color: #b2dfdb;
  border-radius: 0.4rem;
}
.padding-h1{
  padding: 2px 10px 2px 10px;
}
.padding-h2{
  padding: 2px 10px 2px 20px;
}
.padding-h3{
  padding: 2px 10px 2px 30px;
}
.comment-content {
  padding-left: 40px;
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>
