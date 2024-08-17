<template>
  <!-- 本页面为基础页面，仅包含示例图中分界线以上部分，其余部分使用routerlink路由实现内容切换，
        路由将重定向到POmain组件，即PO模块的初始页面 -->
  <div class="whole">
    <el-container class="pad">
      <el-header class="header">
        <el-icon class="House" @click="navigateTo('/')">
          <House />
        </el-icon>
        <span class="title">Create Purchase Order</span>
      </el-header>
      <RouterView></RouterView>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateTo(path) {
  router.push(path);
}
</script>

<style scoped>
.title {
  flex-grow: 1;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: white; /* 修改为白色 */
}
.House {
  font-size: 25px;
  right: 60px;
}
.header {
  display: flex;
  align-items: center;
  padding: 20px 80px; /* 设置 header 的内边距 */
  border-bottom: 2px solid black; /* 修改为黑色边框 */
  margin-bottom: 20px;
  /* width: 1760px; */
}
.pad {
  padding: 0 80px; /* 设置页面两侧的内边距 */
  box-sizing: border-box; /* 包括内边距和边框在内 */
}
.whole {
  background: linear-gradient(
    to bottom,
    rgba(127, 167, 226, 1),
    rgba(197, 217, 247, 1),
    rgba(255, 255, 255, 1)
  );
  height: 100vh;
  margin: 0;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
