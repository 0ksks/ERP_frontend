<template>
  <el-container class="material">
    <!-- Header 区域 -->
    <el-header class="header">
      <!-- 返回按钮，点击时跳转到材料列表页 -->
      <el-icon class="Back" @click="navigateTo('/Material')">
        <ArrowLeft />
      </el-icon>
      <!-- 返回首页按钮，点击时跳转到首页 -->
      <el-icon class="House" @click="navigateTo('/')">
        <House />
      </el-icon>
      <!-- 页面标题 -->
      <span class="title">Create New Material</span>
    </el-header>

    <!-- Header 下方的一排内容 -->
    <br />

    <!-- 主体内容区域 -->
    <el-container>
      <!-- 主内容 -->
      <el-main class="main-content">
        <div>
          <!-- General 部分标题 -->
          <p class="text-title">General</p>
          <el-divider class="divider"></el-divider>
          <!-- 表单区域，使用 el-form 组件绑定 model 为 form -->
          <el-form :model="form" label-width="150px">
            <el-row :gutter="20">
              <!-- 材料名称 -->
              <el-col :span="8">
                <el-form-item label="Material Name:">
                  <el-input
                    v-model="form.materialName" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 描述 -->
              <el-col :span="8">
                <el-form-item label="Description:">
                  <el-input
                    v-model="form.description" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 基本单位 -->
              <el-col :span="8">
                <el-form-item label="Base Unit:">
                  <el-input
                    v-model="form.baseUnit" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 材料组 -->
              <el-col :span="8">
                <el-form-item label="Material Group:">
                  <el-input
                    v-model="form.materialGroup" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 部门 -->
              <el-col :span="8">
                <el-form-item label="Division:">
                  <el-input
                    v-model="form.division" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- Dimensions 部分标题 -->
            <p class="text-title">Dimensions</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <!-- 毛重 -->
              <el-col :span="8">
                <el-form-item label="Gross Weight:">
                  <el-input
                    v-model="form.grossWeight" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 净重 -->
              <el-col :span="8">
                <el-form-item label="Net Weight:">
                  <el-input
                    v-model="form.netWeight" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 重量单位 -->
              <el-col :span="8">
                <el-form-item label="Weight Unit:">
                  <el-input
                    v-model="form.weightUnit" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 体积 -->
              <el-col :span="8">
                <el-form-item label="Volume:">
                  <el-input
                    v-model="form.volume" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 体积单位 -->
              <el-col :span="8">
                <el-form-item label="Volume Unit:">
                  <el-input
                    v-model="form.volumeUnit" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- Shipping Data 部分标题 -->
            <p class="text-title">Shipping Data (times in days)</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <!-- 运输组 -->
              <el-col :span="8">
                <el-form-item label="Trans.Grp:">
                  <el-input
                    v-model="form.transportationGroup" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 包装材料 -->
              <el-col :span="8">
                <el-form-item label="Pack Material:">
                  <el-input
                    v-model="form.packMaterial" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 可用性检查 -->
              <el-col :span="8">
                <el-form-item label="Avail.Check:">
                  <el-input
                    v-model="form.availabilityCheck" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 装载组 -->
              <el-col :span="8">
                <el-form-item label="Loading Group:">
                  <el-input
                    v-model="form.loadingGroup" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- MRP Procedure 部分标题 -->
            <p class="text-title">MRP Procedure</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <!-- MRP 类型 -->
              <el-col :span="8">
                <el-form-item label="MRP Type:">
                  <el-input
                    v-model="form.mrpType" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- MRP 控制器 -->
              <el-col :span="8">
                <el-form-item label="MRP Controller:">
                  <el-input
                    v-model="form.mrpController" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- Lot Size Data 部分标题 -->
            <p class="text-title">Lot Size Data</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <!-- 批量定尺寸 -->
              <el-col :span="8">
                <el-form-item label="Lot Sizing Proc:">
                  <el-input
                    v-model="form.lotSize" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 最小批量尺寸 -->
              <el-col :span="8">
                <el-form-item label="Minimum Lot Size:">
                  <el-input
                    v-model="form.minimumLotSize" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- Scheduling 部分标题 -->
            <p class="text-title">Scheduling</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <!-- 计划交货时间 -->
              <el-col :span="8">
                <el-form-item label="Plan.Deliv.Time:">
                  <el-input
                    v-model="form.plannedDeliveryTime" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- Accounting -->
            <p class="text-title">Accounting</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <!-- 评估类别 -->
              <el-col :span="8">
                <el-form-item label="Valuation Class:">
                  <el-input
                    v-model="form.valuationClass" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 移动价格 -->
              <el-col :span="8">
                <el-form-item label="Moving Price:">
                  <el-input
                    v-model="form.movingPrice" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 价格单位 -->
              <el-col :span="8">
                <el-form-item label="Price Unit:">
                  <el-input
                    v-model="form.priceUnit" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 标准价格 -->
              <el-col :span="8">
                <el-form-item label="Standard Price:">
                  <el-input
                    v-model="form.standardPrice" 
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br />

        <!-- 保存按钮，点击时调用 saveMaterial 方法 -->
        <el-button type="primary" plain @click="saveMaterial()">
          Save
        </el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";

export default {
  setup() {
    const router = useRouter();
    // 定义表单数据的响应式对象
    const form = ref({
      materialName: '',
      description: '',
      baseUnit: '',
      materialGroup: '',
      division: '',
      grossWeight: '',
      netWeight: '',
      weightUnit: '',
      volume: '',
      volumeUnit: '',
      packMaterial: '',
      availabilityCheck: '',
      transportationGroup: '',
      loadingGroup: '',
      mrpType: '',
      mrpController: '',
      lotSize: '',
      minimumLotSize: '',
      plannedDeliveryTime: '',
      valuationClass: '',
      movingPrice: '',
      priceUnit: '',
      standardPrice: ''
    });

    // 导航到指定路径的方法
    function navigateTo(path) {
      router.push(path);
    }

    // 保存材料的方法
    async function saveMaterial() {
      // 检查表单字段是否全部填写
      if (
        !form.value.materialName ||
        !form.value.description ||
        !form.value.baseUnit ||
        !form.value.materialGroup ||
        !form.value.division ||
        !form.value.grossWeight ||
        !form.value.netWeight ||
        !form.value.weightUnit ||
        !form.value.volume ||
        !form.value.volumeUnit ||
        !form.value.packMaterial ||
        !form.value.availabilityCheck ||
        !form.value.transportationGroup ||
        !form.value.loadingGroup ||
        !form.value.mrpType ||
        !form.value.mrpController ||
        !form.value.lotSize ||
        !form.value.minimumLotSize ||
        !form.value.plannedDeliveryTime ||
        !form.value.valuationClass ||
        !form.value.movingPrice ||
        !form.value.priceUnit ||
        !form.value.standardPrice
      ) {
        // 如果有未填写的字段，弹出警告框
        ElMessageBox.alert(
          "Please fill in all required fields.",
          "Incomplete Information",
          {
            confirmButtonText: "OK",
            type: "warning",
          }
        );
        return;
      }

      try {
        // 发送 POST 请求以保存材料
        const response = await axios.post(
          "/api/material/create",
          form.value
        );

        // 根据响应的状态码显示不同的提示信息
        if (response.data.code === 201) {
          ElMessageBox.alert(
            `Material created successfully! Material ID: ${response.data.data.materialID}`,
            "Success",
            {
              confirmButtonText: "OK",
              type: "success",
            }
          );
          // 清空表单
          form.value = {};
        } else {
          ElMessageBox.alert(
            "Failed to create material. Please try again.",
            "Error",
            {
              confirmButtonText: "OK",
              type: "error",
            }
          );
        }
      } catch (error) {
        console.error("Error saving material data:", error);
        ElMessageBox.alert(
          "Failed to create material. Please try again.",
          "Error",
          {
            confirmButtonText: "OK",
            type: "error",
          }
        );
      }
    }

    // 返回要在模板中使用的数据和方法
    return {
      form,
      navigateTo,
      saveMaterial,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

.material {
  background: linear-gradient(
    to bottom,
    rgba(127, 167, 226, 1),
    rgba(197, 217, 247, 1),
    rgba(255, 255, 255, 1)
  );
  height: 100vh;
  margin: 0;
  padding: 0 80px;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  padding: 20px 80px;
  border-bottom: 2px solid black;
}

.title {
  flex-grow: 1;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: white;
}

.House {
  font-size: 25px;
  right: 50px;
}

.Back {
  font-size: 25px;
  right: 60px;
}

.main-content {
  padding: 20px;
  background-color: #fff;
  margin-bottom: 40px;
  overflow-y: auto;
}

.text-title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}

.text-label {
  font-size: 14px;
  margin-bottom: 5px;
  display: inline-block;
  width: 120px;
  font-family: "Inter", sans;
  color: #498be6;
}

.text-value {
  font-size: 14px;
  margin-bottom: 20px;
  display: inline-block;
  width: 190px;
  font-family: "Inter", sans;
}

.divider {
  margin-top: 15px;
  margin-bottom: 15px;
}

.label {
  font-size: 14px;
  display: inline-block;
  font-family: "Inter", sans;
}

.value {
  display: inline-block;
  width: 150px; /* 设置标签的固定宽度 */
  font-family: "Inter", sans;
}

.top {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
}
</style>
