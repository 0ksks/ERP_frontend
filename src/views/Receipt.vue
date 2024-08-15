<template>
        <!-- 本页面为基础页面，仅包含示例图中分界线以上部分，其余部分使用routerlink路由实现内容切换，
        路由将重定向到REmain组件，即Receipt模块的初始页面 -->
    <div class="whole">
      <el-container class="total">
        <el-header class="topheader">

            <!-- 回到主页按钮，显示不出来 -->
            <el-button class="custom-icon-button" icon="el-icon-s-home" plain @click="back">
                <el-icon><HomeFilled /></el-icon>
            </el-button>
            
            <div class="title-container">
                <div class="title">
                    Create Goods Receipt for Purchase Order
                </div>
            </div>
        </el-header>

            <!-- 无法设置分界线颜色 -->
         <el-divider class="divider"></el-divider>       

        <RouterView></RouterView>
           
      </el-container>
    </div>

</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { HomeFilled } from '@element-plus/icons-vue';

const router = useRouter();

const back = () => {
  router.push('/');
};
</script>



<style scoped>
.total{
    height: 100vh;
    width: 100vw;
}

.title-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  display: flex;
  /* justify-content: center; */
  height: 100%;   
  font-size: 30px;
  font-weight: bold;
  margin-right: 160px;
}

.topheader{
    color:  rgba(197, 217, 247, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.divider{
    /* background-color: black; */
    display: flex;
    width: 120vh;
    margin-left: 280px;

}

.whole {
  background: linear-gradient(to bottom, rgba(127, 167, 226, 1), rgba(197, 217, 247, 1), rgba(255, 255, 255, 1));
  height: 100vh;
  margin: 0;
  background-repeat: no-repeat;
  background-size: cover;
}

.custom-icon-button {
  background-color: white;
  opacity: 0.7;
  font-size: 4vh;
  width: 8vh; 
  height: 8vh; 
  border: none;
  margin-right: 100px;
}
</style>