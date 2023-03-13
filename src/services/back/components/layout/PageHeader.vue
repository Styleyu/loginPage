<template>
  <div class="container">
    <el-breadcrumb separator="/" style="user-select: none;">
      <el-breadcrumb-item v-for="item, index in currentLocations" :key="index">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="user" @click.stop="onClickIcon">
      <div class="user-name">
        {{ username }}
      </div>
      <font-awesome-icon class="user-icon" icon="fa-solid fa-circle-user" />
    </div>
    <div :class="['user-info', { 'hide': isInfoHidden }]" @click.stop="">
      <ul>
        <li @click="goToDetail">
          <font-awesome-icon class="icon" icon="fa-solid fa-circle-info" />
          <span class="text">我的信息</span>
        </li>
        <li @click="logOut">
          <font-awesome-icon class="icon" icon="fa-solid fa-right-from-bracket" />
          <span class="text">登出</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';


export default {
  name: 'PageHeader',
  data() {
    return {
      isInfoHidden: true
    }
  },
  computed: {
    ...mapState('user', ['username']),
    ...mapState('nav', ['currentLocations'])
  },
  methods: {
    ...mapActions('user', ['logOut']),
    onClickIcon() {
      if (this.isInfoHidden)
        this.isInfoHidden = false
      else
        this.isInfoHidden = true
    },
    goToDetail() {
      this.$router.push('/user/detail')
    }
  },
  created() {
    window.addEventListener('click', () => this.isInfoHidden = true)
  }
}
</script>

<style lang="scss" scoped>
$paddingHorizontal: 20px;
$userIconHeight: 40px;

.container {
  position: relative;
  display: flex;
  height: var(--app-header);
  padding: 0 $paddingHorizontal;
  box-shadow: var(--shadow);
  justify-content: space-between;
  align-items: center;
}

// 用户框
.user {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: $userIconHeight;
  box-sizing: border-box;
  padding: 1rem;
  max-width: 11rem;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: var(--app-radius);
  transition: border-color .3s;

  &:hover {
    border-color: rgb(221, 221, 221);
    background-color: rgba(255, 255, 255, 0.3);
  }

  &:active {
    border-color: rgb(199, 199, 199);
    background-color: rgba(226, 226, 226, 0.3);
  }

  // 用户名
  &-name {
    overflow: hidden;
    word-break: keep-all;
    text-overflow: ellipsis;
    padding-right: 1em;
    user-select: none;
    font-size: 0.9rem;
  }

  // 图标  
  &-icon {
    font-size: calc($userIconHeight / 1.8);
    vertical-align: middle;
  }


  // 信息
  &-info {
    font-size: 1rem;
    position: absolute;
    top: calc(var(--app-header) - 6px);
    right: $paddingHorizontal;
    padding: 0.3em;
    border-radius: var(--app-radius);
    background-color: #fff;
    box-shadow: var(--shadow);
    transition: .3s opacity;

    ul {
      list-style: none;
      padding: 10px;

      >li {
        padding: 5px 10px;
        margin: 5px 0;
        display: flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
        border-radius: var(--app-radius);
        border: 1px solid transparent;
        transition: all .3s;

        &:hover {
          // border-color: rgb(234, 234, 234);
          background-color: rgba(231, 231, 231, 0.4);
        }

        &:active {
          border-color: rgb(218, 218, 218);
          background-color: rgba(215, 215, 215, 0.4);
        }

        .icon {
          font-size: .9rem;
        }

        .text {
          padding-left: 1em;
          font-size: 0.95rem;
        }

      }
    }
  }
}
</style>