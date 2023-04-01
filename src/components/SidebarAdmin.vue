<template>
  <!-- Sidebar -->
  <b-collapse id="sidebar" class="border-right" v-model="sidebarShow">
    <div id="sidebar-wrapper">
      <div class="list-group list-group-flush">
        <ul class="list-group" @click="clickSidebar">
          <li
            class="
              list-group-item
              sidebar-separator-title
              text-muted
              d-flex
              align-items-center
              menu-collapsed
            "
          >
            <small>MAIN MENU </small>
          </li>
          <NuxtLink
            to="/inventory"
            class="
              list-group-item list-group-item-action
              flex-column
              align-items-start
            "
            v-if="this.authSarpras"
          >
            <div class="d-flex w-100 justify-content-start align-items-center">
              <span class="fa fa-home fa-fw mr-3"></span>
              <span class="menu-collapsed">Home</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </NuxtLink>
          <NuxtLink
            to="/inventory/items"
            class="
              list-group-item list-group-item-action
              flex-column
              align-items-start
            "
            v-if="this.authSarpras"
          >
            <div class="d-flex w-100 justify-content-start align-items-center">
              <span class="fa fa-cubes fa-fw mr-3"></span>
              <span class="menu-collapsed">Barang</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </NuxtLink>
          <NuxtLink
            to="/inventory/tooks?type=peminjaman"
            class="
              list-group-item list-group-item-action
              flex-column
              align-items-start
            "
            v-if="this.authSarpras"
          >
            <div class="d-flex w-100 justify-content-start align-items-center">
              <span class="fa fa-external-link-square fa-fw mr-3"></span>
              <span class="menu-collapsed">Peminjaman</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </NuxtLink>
          <NuxtLink
            to="/inventory/tooks?type=pengambilan"
            class="
              list-group-item list-group-item-action
              flex-column
              align-items-start
            "
            v-if="this.authSarpras"
          >
            <div class="d-flex w-100 justify-content-start align-items-center">
              <span class="fa fa-send fa-fw mr-3"></span>
              <span class="menu-collapsed">Pengambilan Inventaris</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </NuxtLink>
          <NuxtLink
            to="/inventory/orders"
            class="
              list-group-item list-group-item-action
              flex-column
              align-items-start
            "
            v-if="this.authSarpras"
          >
            <div class="d-flex w-100 justify-content-start align-items-center">
              <span class="fa fa-shopping-cart fa-fw mr-3"></span>
              <span class="menu-collapsed">Pemesanan</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </NuxtLink>
          <NuxtLink
            to="/inventory/reports"
            class="
              list-group-item list-group-item-action
              flex-column
              align-items-start
            "
            v-if="this.authSarpras"
          >
            <div class="d-flex w-100 justify-content-start align-items-center">
              <span class="fa fa-newspaper-o fa-fw mr-3"></span>
              <span class="menu-collapsed">Laporan</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </NuxtLink>
          <li
            class="
              list-group-item
              sidebar-separator-title
              text-muted
              d-flex
              align-items-center
              menu-collapsed
            "
          >
            <small>SETTING </small>
          </li>
          <NuxtLink
            to="/inventory/conditions"
            class="
              list-group-item list-group-item-action
              flex-column
              align-items-start
            "
            v-if="this.authSarpras"
          >
            <div class="d-flex w-100 justify-content-start align-items-center">
              <span class="fa fa-recycle fa-fw mr-3"></span>
              <span class="menu-collapsed">Kondisi</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </NuxtLink>
          <NuxtLink
            to="/inventory/item-categories"
            class="
              list-group-item list-group-item-action
              flex-column
              align-items-start
            "
            v-if="this.authSarpras"
          >
            <div class="d-flex w-100 justify-content-start align-items-center">
              <span class="fa fa-folder-open-o fa-fw mr-3"></span>
              <span class="menu-collapsed">Kategori barang</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </NuxtLink>
          <NuxtLink
            to="/inventory/specifications"
            class="
              list-group-item list-group-item-action
              flex-column
              align-items-start
            "
            v-if="this.authSarpras"
          >
            <div class="d-flex w-100 justify-content-start align-items-center">
              <span class="fa fa-sliders fa-fw mr-3"></span>
              <span class="menu-collapsed">Spesifikasi</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </NuxtLink>
          <NuxtLink
            to="/inventory/users"
            class="
              list-group-item list-group-item-action
              flex-column
              align-items-start
            "
            v-if="this.authSarpras"
          >
            <div class="d-flex w-100 justify-content-start align-items-center">
              <span class="fa fa-users fa-fw mr-3"></span>
              <span class="menu-collapsed">Users</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </NuxtLink>

          <a
            href="#logout"
            class="
              list-group-item list-group-item-action
              flex-column
              align-items-start
              bg-danger
              text-white
            "
            v-if="this.authSarpras && this.isApp"
          >
            <div class="d-flex w-100 justify-content-start align-items-center">
              <span class="fa fa-sign-out fa-fw mr-3"></span>
              <span class="menu-collapsed"
                >{{ this.$auth.user.name }} - logout
              </span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </a>
        </ul>
      </div>
    </div>
  </b-collapse>
  <!-- /#sidebar-wrapper -->
</template>
<script>
export default {
  data() {
    return {
      sidebarShow: true,
    }
  },
  computed: {
    authMedia() {
      var mediaPermission = [5, 6]
      if (mediaPermission.includes(this.$auth.user.privilege_id) == false) {
        return false
      } else {
        return true
      }
    },
    authSarpras() {
      var mediaPermission = [4, 6]
      if (mediaPermission.includes(this.$auth.user.privilege_id) == false) {
        return false
      } else {
        return true
      }
    },
    authAdmin() {
      var mediaPermission = [6]
      if (mediaPermission.includes(this.$auth.user.privilege_id) == false) {
        return false
      } else {
        return true
      }
    },
    articlesType() {
      return this.$store.state.web.articles_type.data
    },
  },

  mounted() {
    //this.$store.dispatch('web/articles_type/get')
    if (window.innerWidth < 768) {
      this.$root.$emit('bv::toggle::collapse', 'sidebar')
    }
  },
  methods: {
    clickSidebar() {
      if (window.innerWidth < 768) {
        this.sidebarShow = false
      }
    },
    async logout() {
      await this.$auth.logout()
      //document.querySelector('body').style.backgroundColor = '#fff'
    },
  },
}
</script>