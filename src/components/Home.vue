<template>
  <div class="supplier">
    <div class="header">
      <el-icon class="House" @click="navigateToHTMLPage('/PersonalSpace.html')">
        <UserFilled />
      </el-icon>
      <span class="title">Create New Supplier</span>
    </div>
    <div class="content">
      <button class="patch" @click="navigateTo('/Supplier')" type="button">
        <div style="font-size: 2vh; margin-left: 3vh; margin-top: 3vh">
          New Supplier
        </div>
        <div style="font-size: 3.5vh; margin-right: 3vh; margin-top: 7vh">
          <el-icon> <User /> </el-icon>
        </div>
      </button>

      <button class="patch" @click="navigateTo('/Material')" type="button">
        <div style="font-size: 2vh; margin-left: 3vh; margin-top: 3vh">
          Material Maters For Trading Goods
        </div>
        <div style="font-size: 3.5vh; margin-right: 3vh; margin-top: 7vh">
          <el-icon> <Document /> </el-icon>
        </div>
      </button>

      <button class="patch" @click="navigateTo('/DocumentFlow')" type="button">
        <div style="font-size: 2vh; margin-left: 3vh; margin-top: 3vh">
          Document Flow
        </div>
        <div style="font-size: 3.5vh; margin-right: 3vh; margin-top: 7vh">
          <el-icon> <Document /> </el-icon>
        </div>
      </button>

      <button class="patch" @click="navigateTo('/po')" type="button">
        <div style="font-size: 2vh; margin-left: 3vh; margin-top: 3vh">PO</div>
        <div style="font-size: 3.5vh; margin-right: 3vh; margin-top: 7vh">
          <el-icon> <Document /> </el-icon>
        </div>
      </button>

      <button class="patch" @click="navigateTo('/rec')" type="button">
        <div style="font-size: 2vh; margin-left: 3vh; margin-top: 3vh">
          Receipt
        </div>
        <div style="font-size: 3.5vh; margin-right: 3vh; margin-top: 7vh">
          <el-icon> <Document /> </el-icon>
        </div>
      </button>

      <!-- <el-button @click="navigateTo('/Stock')"></el-button> -->
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    function navigateTo(path) {
      router.push(path);
    }

    function navigateToHTMLPage(path) {
      window.location.href = path;
    }

    return { navigateTo, navigateToHTMLPage };
  },
};
</script>

<style scoped>
.supplier {
  background: linear-gradient(
    to bottom,
    rgba(127, 167, 226, 1),
    rgba(197, 217, 247, 1),
    rgba(255, 255, 255, 1)
  );
  height: 100vh;
  margin: 0;
  padding: 0 80px; /* 设置页面两侧的内边距 */
  box-sizing: border-box; /* 包括内边距和边框在内 */
}

.header {
  display: flex;
  align-items: center;
  padding: 20px 80px; /* 设置 header 的内边距 */
  border-bottom: 2px solid black; /* 修改为黑色边框 */
}

.title {
  flex-grow: 1;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: white; /* 修改为白色 */
}

.House {
  font-size: 30px;
  right: 60px;
}

.content {
  display: flex; /* 使用 Flexbox 布局 */
  gap: 20px; /* 设置卡片之间的间隙 */
  padding: 20px 80px;
}

.patch {
  display: flex;
  justify-content: space-between;
  width: 30vh;
  height: 15vh;
  border: solid rgb(214, 214, 214);
  border-radius: 2vh;
  box-shadow: 0 0.5vh 0.8vh rgba(0, 0, 0, 0.2);
  background-color: white;
  cursor: pointer;
}
.patch:hover {
  background-color: rgb(249, 248, 248);
}
</style>
