<template>
  <el-container class="material">
    <!-- Header 区域 -->
    <el-header class="header">
      <el-icon class="Back" @click="navigateTo('/Material')">
        <ArrowLeft />
      </el-icon>
      <el-icon class="House" @click="navigateTo('/')">
        <House />
      </el-icon>
      <span class="title">Create New Material</span>
    </el-header>

    <!-- Header 下方的一排内容 -->
    <br />

    <!-- 主体内容区域 -->
    <el-container>
      <!-- 主内容 -->
      <el-main class="main-content">
        <div>
          <p class="text-title">General</p>
          <el-divider class="divider"></el-divider>
          <el-form :model="selectedMaterial" label-width="150px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Material Name:">
                  <el-input
                    v-model="selectedMaterial.materialName"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Description:">
                  <el-input
                    v-model="selectedMaterial.description"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Base Unit:">
                  <el-input
                    v-model="selectedMaterial.baseUnit"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Material Group:">
                  <el-input
                    v-model="selectedMaterial.materialGroup"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Division:">
                  <el-input
                    v-model="selectedMaterial.division"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="text-title">Dimensions</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Gross Weight:">
                  <el-input
                    v-model="selectedMaterial.grossWeight"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Net Weight:">
                  <el-input
                    v-model="selectedMaterial.netWeight"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Weight Unit:">
                  <el-input
                    v-model="selectedMaterial.weightUnit"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Volume:">
                  <el-input
                    v-model="selectedMaterial.volume"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Volume Unit:">
                  <el-input
                    v-model="selectedMaterial.volumeUnit"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="text-title">Shipping Data(times in days)</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Trans.Grp:">
                  <el-input
                    v-model="selectedMaterial.transportationGroup"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Pack Material:">
                  <el-input
                    v-model="selectedMaterial.packMaterial"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Avail.Check:">
                  <el-input
                    v-model="selectedMaterial.availabilityCheck"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Loading Group:">
                  <el-input
                    v-model="selectedMaterial.loadingGroup"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="text-title">MRP Procedure</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="MRP Type:">
                  <el-input
                    v-model="selectedMaterial.mrpType"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="MRP Controller:">
                  <el-input
                    v-model="selectedMaterial.mrpTController"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="text-title">Lot Size Data</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Lot Sizing Proc:">
                  <el-input
                    v-model="selectedMaterial.lotSize"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="text-title">Scheduling</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Plan.Deliv.Time:">
                  <el-input
                    v-model="selectedMaterial.plannedDeliveryTime"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="text-title">Lot Size Data</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Valuation Class:">
                  <el-input
                    v-model="selectedMaterial.valuationClass"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Moving Price:">
                  <el-input
                    v-model="selectedMaterial.movingPrice"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Price Unit:">
                  <el-input
                    v-model="selectedMaterial.pricUnit"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Standard Price:">
                  <el-input
                    v-model="selectedMaterial.standardPrice"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br />

        <el-button type="primary" plain @click="saveMaterial()">
          Save
        </el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ElMessageBox } from 'element-plus';

// 设置模拟请求
const mock = new MockAdapter(axios);

// 模拟POST /material/create请求的响应
mock.onPost('/api/material/create_success').reply(200, {
  code: 1,
  message: 'success',
  data: {
    materialID: 'materialID_value',
  },
});

export default {
  setup() {
    const router = useRouter();
    const form = ref({
      businessPartner: '',
      bpRole: '',
      companyCode: '',
    });

    const selectedMaterial = ref({});
    const activeTab = ref('common');

    function navigateTo(path) {
      router.push(path);
    }

    async function saveMaterial() {
      // 验证表单是否填写完整
      if (
        !form.value.businessPartner ||
        !form.value.bpRole ||
        !form.value.companyCode
      ) {
        ElMessageBox.alert(
          'Please fill in all required fields.',
          'Incomplete Information',
          {
            confirmButtonText: 'OK',
            type: 'warning',
          }
        );
        return;
      }

      try {
        // 发送请求保存供应商数据
        const response = await axios.post(
          '/api/material/create_success',
          form.value
        );

        if (response.data.code === 1) {
          ElMessageBox.alert(
            `Material created successfully! Material ID: ${response.data.data.materialID}`,
            'Success',
            {
              confirmButtonText: 'OK',
              type: 'success',
            }
          );
          // 清空表单
          form.value = {
            businessPartner: '',
            bpRole: '',
            companyCode: '',
          };
        } else {
          ElMessageBox.alert(
            'Failed to create material. Please try again.',
            'Error',
            {
              confirmButtonText: 'OK',
              type: 'error',
            }
          );
        }
      } catch (error) {
        console.error('Error saving material data:', error);
        ElMessageBox.alert(
          'Failed to create material. Please try again.',
          'Error',
          {
            confirmButtonText: 'OK',
            type: 'error',
          }
        );
      }
    }

    return {
      form,
      selectedMaterial,
      activeTab,
      navigateTo,
      saveMaterial,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

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
  font-family: 'Inter', sans;
  color: #498be6;
}

.text-value {
  font-size: 14px;
  margin-bottom: 20px;
  display: inline-block;
  width: 190px;
  font-family: 'Inter', sans;
}

.divider {
  margin-top: 15px;
  margin-bottom: 15px;
}

.label {
  font-size: 14px;
  display: inline-block;
  font-family: 'Inter', sans;
}

.value {
  display: inline-block;
  width: 150px; /* 设置标签的固定宽度 */
  font-family: 'Inter', sans;
}

.top {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
}
</style>
