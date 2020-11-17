<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-black justify-center row shaow-2" dark>
      <div style="max-width: 1260px; width: 100%">
      <q-toolbar>
        <q-btn-dropdown v-show="hasNavigations && $q.screen.lt.sm" color="black" dropdown-icon="menu">
          <q-list>
            <q-item v-for="nav in navigations" :key="nav.id" :to="nav.link" :target="nav.newBlank ? '_blank' : '_self' " clickable v-close-popup class="bg-black text-white">
              <q-item-section>
                <q-item-label>{{nav.label}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn stretch flat no-caps :label="site.siteName" style="font-size: 20px;" to="/"/>
        <div v-show="hasNavigations && !$q.screen.lt.sm" class="row">
          <q-btn v-for="nav in navigations" :key="nav.id" stretch flat no-caps :label="nav.label" :to="nav.link"/>
        </div>
        <q-space />
      </q-toolbar>
      </div>
    </q-header>
    <q-page-container class="row justify-center bg-grey-2">
      <q-page style="max-width: 1260px; width: 100%" class="justify-center">
        <router-view />
        <q-separator/>
        <div v-if="hasFooters" class="row justify-center text-black q-pt-lg">
          <q-btn v-for="link in footers" :key="link.id" no-caps flat :to="link.link" :target="link.newBlank ? '_blank' : '_self'" :label="link.label" color="grey"/>
        </div>
         <div class="row justify-center">
          <q-btn no-caps flat type="a" label="powered by YeBlog" icon-right="ion-logo-github" color="black" class="q-pt-none" href="https://github.com/yeyeck/yeblog-backend" target="_blank"/>
        </div>
        <div class="row justify-center text-black q-pb-md">
          <q-btn flat no-caps to="/" target="_blank" :label="site.siteName" color="primary"/>
          <q-btn v-if="site.icpRecord && site.icpRecord !== ''" flat type="a" :href="site.icpRecordUrl" target="_blank" :label="site.icpRecord" color="grey" />
          <q-btn v-if="site.psRecord && site.psRecord !== ''" flat icon="img:api/file/system/gongan.png" type="a" :href="site.psRecordUrl" target="_blank" :label="site.psRecord" color="grey" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MainLayout',
  data () {
    return {
      signTab: 'signIn'
    }
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    return store.dispatch('blog/fetchMain')
  },
  computed: {
    ...mapGetters('blog', [
      'site',
      'navigations',
      'footers',
      'hasNavigations',
      'hasFooters'
    ])
  }
}
</script>
