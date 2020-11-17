<template>
  <div class="q-pa-lg">
    <div class="row flex">
      <div class="col-12 col-md-9">
        <router-view/>
      </div>
      <div class="col-12 col-md-3 q-pa-sm q-gutter-md">
        <q-card>
          <q-item>
            <q-item-section avatar>
              <q-icon name="menu"  color="red"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>文章分类</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item  v-for="category in categories" :key="category.id" clickable
            :to="'/category/' + category.id + '/page/'"
            active-class="bg-grey-2 text-primary">
            <q-item-section avatar>
              <!-- <q-icon name="menu"  color="red"/> -->
            </q-item-section>
            <q-item-section>
              <q-item-label>{{category.name}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
         <q-card>
          <q-item>
            <q-item-section avatar>
              <q-icon name="o_whatshot"  color="red"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>最热文章</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-card-actions vertical>
            <q-btn  v-for="article in top10" :key="article.id" flat dense color="grey" type="a" :href="'/article/' + article.id" :label="article.title" target="__blank" no-caps/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'
import { mapGetters } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'Category',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    // const page = currentRoute.params.page ? currentRoute.params.page : 1
    // const categoryId = currentRoute.params.categoryId ? currentRoute.params.categoryId : -1
    // if (categoryId === -1) {
    //   redirect('/404')
    // }
    // const pPage = store.dispatch('page/fetchData', { page: page, categoryId: categoryId })
    // const pCate = store.dispatch('category/fetchData', categoryId)
    // return Promise.all([pPage, pCate])
    return store.dispatch('navigations/fetchCategories')
  },
  methods: {
    getTitle () {
      return '文章分类: ' + this.currentCate.name + '——' + this.site.siteName
    }
  },
  computed: {
    ...mapGetters('blog', [
      'site',
      'top10'
    ]),
    ...mapGetters('navigations', [
      'categories',
      'currentCate'
    ])
  },
  meta () {
    return {
      title: this.getTitle(),
      meta: {
        keywords: { name: 'keywords', content: this.site.keywords },
        description: { name: 'description', content: this.site.description }
      }
    }
  },
  mounted () {
    this.currentPage = this.$store.getters['page/current']
  },
  filters: {
    formatDate: function (value) {
      return date.formatDate(value, 'YYYY-MM-DD')
    }
  }
}
</script>

<style scoped>
.abstract {
  /* height: 100px; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.router {
  text-decoration: none;
}
</style>
