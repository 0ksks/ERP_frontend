<template>
  <!-- 主要容器，包含整个页面 -->
  <el-container class="supplier">
    <!-- Header 区域 -->
    <el-header class="header">
      <!-- 返回按钮，点击后跳转到供应商列表页 -->
      <el-icon class="Back" @click="navigateTo('/Supplier')">
        <ArrowLeft />
      </el-icon>
      <!-- 首页按钮，点击后跳转到首页 -->
      <el-icon class="House" @click="navigateTo('/')">
        <House />
      </el-icon>
      <!-- 页标题 -->
      <span class="title">Create New Supplier</span>
    </el-header>

    <!-- Header 下方的一排内容 -->
    <br />
    <el-row class="top">
      <!-- 空列，用于布局 -->
      <el-col :span="1"></el-col>
      <!-- 业务合作伙伴标签 -->
      <el-col :span="3">
        <span class="label">Business Partner:</span>
      </el-col>
      <!-- 显示供应商 ID 的输入框，禁用状态 -->
      <el-col :span="5">
        <el-input v-model="form.supplierIDr" class="value" disabled></el-input>
      </el-col>
      <!-- 创建业务合作伙伴角色标签 -->
      <el-col :span="3">
        <span class="label">Create in BP Role:</span>
      </el-col>
      <!-- 输入框，用于填写业务合作伙伴角色 -->
      <el-col :span="5">
        <el-input v-model="form.partnerFunctions" class="value"></el-input>
      </el-col>
      <!-- 公司代码标签 -->
      <el-col :span="3">
        <span class="label">Company Code:</span>
      </el-col>
      <!-- 输入框，用于填写公司代码 -->
      <el-col :span="4">
        <el-input v-model="form.companyCode" class="value"></el-input>
      </el-col>
    </el-row>

    <!-- 主体内容区域 -->
    <el-container>
      <!-- 主内容 -->
      <el-main class="main-content">
        <!-- 标签页组件，用于切换不同的内容 -->
        <el-tabs v-model="activeTab">
          <!-- 常见信息标签页 -->
          <el-tab-pane label="Common" name="common">
            <div>
              <!-- 标题：Name -->
              <p class="text-title">Name</p>
              <el-divider class="divider"></el-divider>
              <!-- 表单，用于填写常见信息 -->
              <el-form :model="selectedSupplier" label-width="150px">
                <el-row :gutter="20">
                  <!-- 供应商名称 -->
                  <el-col :span="8">
                    <el-form-item label="Supplier Name:">
                      <el-input
                        v-model="selectedSupplier.suppliername"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 标题：Address -->
                <p class="text-title">Address</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <!-- 街道地址 -->
                  <el-col :span="8">
                    <el-form-item label="Street Address:">
                      <el-input
                        v-model="selectedSupplier.streetAddress"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- 邮政编码 -->
                  <el-col :span="8">
                    <el-form-item label="Postal Code:">
                      <el-input
                        v-model="selectedSupplier.postalCode"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- 国家 -->
                  <el-col :span="8">
                    <el-form-item label="Country:">
                      <el-input
                        v-model="selectedSupplier.country"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- 地区 -->
                  <el-col :span="8">
                    <el-form-item label="Region:">
                      <el-input
                        v-model="selectedSupplier.region"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- 城市 -->
                  <el-col :span="8">
                    <el-form-item label="City:">
                      <el-input
                        v-model="selectedSupplier.city"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 标题：Communication -->
                <p class="text-title">Communication</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <!-- 语言 -->
                  <el-col :span="8">
                    <el-form-item label="Language:">
                      <el-input
                        v-model="selectedSupplier.communicationLang"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 标题：Name -->
                <p class="text-title">Name</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <!-- 联系信息 -->
                  <el-col :span="8">
                    <el-form-item label="Contact Info:">
                      <el-input
                        v-model="selectedSupplier.contactInfo"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- 用户 ID -->
                  <el-col :span="8">
                    <el-form-item label="User ID:">
                      <el-input
                        v-model="selectedSupplier.userID"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>

          <!-- 供应商、账户和支付标签页 -->
          <el-tab-pane label="Vendor & Account & Payment" name="vendor">
            <div>
              <!-- 标题：Tax Data -->
              <p class="text-title">Tax Data</p>
              <el-divider class="divider"></el-divider>
              <!-- 表单，用于填写税务数据 -->
              <el-form :model="selectedSupplier">
                <el-row :gutter="20">
                  <!-- 税号 -->
                  <el-col :span="8">
                    <el-form-item label="Tax Number:">
                      <el-input
                        v-model="selectedSupplier.taxNumber"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 标题：Account Management -->
                <p class="text-title">Account Management</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <!-- 对账账户 -->
                  <el-col :span="8">
                    <el-form-item label="Reconciliation Acct:">
                      <el-input
                        v-model="selectedSupplier.reconciliationAcct"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 标题：Payment Data -->
                <p class="text-title">Payment Data</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <!-- 付款条款 -->
                  <el-col :span="8">
                    <el-form-item label="Terms of Payments:">
                      <el-input
                        v-model="selectedSupplier.termsOfPayment"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- 检查双重发票 -->
                  <el-col :span="8">
                    <el-form-item label="Check Double Invoice:">
                      <el-input
                        v-model="selectedSupplier.checkDoubleInvoice"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 标题：Correspondence -->
                <p class="text-title">Correspondence</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <!-- 供应商联系人 -->
                  <el-col :span="8">
                    <el-form-item label="Clerk at Vendor:">
                      <el-input
                        v-model="selectedSupplier.clerkName"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>

          <!-- 采购标签页 -->
          <el-tab-pane label="Purchasing" name="purchasing">
            <div>
              <!-- 标题：Purchasing Organization -->
              <p class="text-title">Purchasing Organization</p>
              <el-divider class="divider"></el-divider>
              <!-- 表单，用于填写采购组织信息 -->
              <el-form :model="selectedSupplier" label-width="150px">
                <el-row :gutter="20">
                  <!-- 采购组织 -->
                  <el-col :span="8">
                    <el-form-item label="Purch. Organization:">
                      <el-input
                        v-model="selectedSupplier.purchasingOrg"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 标题：Purchase Data -->
                <p class="text-title">Purchase Data</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <!-- 订单货币 -->
                  <el-col :span="8">
                    <el-form-item label="Order Currency:">
                      <el-input
                        v-model="selectedSupplier.orderCurrency"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
        <br />

        <!-- 根据当前激活的标签页，动态显示按钮 -->
        <el-button
          type="primary"
          plain
          @click="activeTab !== 'purchasing' ? nextTab() : saveSupplier()"
        >
          {{ activeTab !== 'purchasing' ? 'Next Tab' : 'Save' }}
        </el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
import { ElMessageBox } from 'element-plus';

export default {
  setup() {
    const router = useRouter();
    // 供应商表单数据的响应式对象
    const form = ref({
      suppliername: '',
      communicationLang: '',
      taxNumber: '',
      companyCode: '',
      reconciliationAcct: '',
      termsOfPayment: '',
      checkDoubleInvoice: '',
      clerkName: '',
      purchasingOrg: '',
      orderCurrency: '',
      partnerFunctions: '',
      streetAddress: '',
      postalCode: '',
      city: '',
      country: '',
      region: '',
      contactInfo: '',
      userID: ''
    });

    // 当前激活的标签页
    const activeTab = ref('common');

    // 跳转到指定路径的函数
    function navigateTo(path) {
      router.push(path);
    }

    // 切换到下一个标签页
    const nextTab = () => {
      if (activeTab.value === 'common') {
        activeTab.value = 'vendor';
      } else if (activeTab.value === 'vendor') {
        activeTab.value = 'purchasing';
      }
    };

    // 保存供应商信息的函数
    async function saveSupplier() {
      // 验证表单是否填写完整
      if (!form.value.suppliername || !form.value.communicationLang || !form.value.taxNumber || !form.value.companyCode) {
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
        // 发送请求保存供应商信息
        const response = await axios.post(
          '/supplier/create',
          form.value,
          {
            headers: {
              Authorization: `Bearer ${token_value}`, // 请确保 token_value 已定义并且包含有效的令牌
              'Content-Type': 'application/json'
            }
          }
        );

        // 根据响应结果显示不同的提示信息
        if (response.data.code === 201) {
          ElMessageBox.alert(
            `Supplier created successfully! Supplier ID: ${response.data.data.supplierID}`,
            'Success',
            {
              confirmButtonText: 'OK',
              type: 'success',
            }
          );
          // 清空表单
          form.value = {
            suppliername: '',
            communicationLang: '',
            taxNumber: '',
            companyCode: '',
            reconciliationAcct: '',
            termsOfPayment: '',
            checkDoubleInvoice: '',
            clerkName: '',
            purchasingOrg: '',
            orderCurrency: '',
            partnerFunctions: '',
            streetAddress: '',
            postalCode: '',
            city: '',
            country: '',
            region: '',
            contactInfo: '',
            userID: ''
          };
        } else {
          ElMessageBox.alert(
            'Failed to create supplier. Please try again.',
            'Error',
            {
              confirmButtonText: 'OK',
              type: 'error',
            }
          );
        }
      } catch (error) {
        console.error('Error saving supplier data:', error);
        ElMessageBox.alert(
          'Failed to create supplier. Please try again.',
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
      activeTab,
      navigateTo,
      saveSupplier,
      nextTab,
    };
  },
};

</script>

<style scoped>
/* 引入 Google 字体 */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

/* 主要容器样式 */
.supplier {
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

/* Header 样式 */
.header {
  display: flex;
  align-items: center;
  padding: 20px 80px;
  border-bottom: 2px solid black;
}

/* 页标题样式 */
.title {
  flex-grow: 1;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: white;
}

/* 首页和返回按钮样式 */
.House, .Back {
  font-size: 25px;
}

.House {
  right: 50px;
}

.Back {
  right: 60px;
}

/* 主内容区域样式 */
.main-content {
  padding: 20px;
  background-color: #fff;
  margin-bottom: 40px;
  overflow-y: auto;
}

/* 标题样式 */
.text-title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* 标签和输入框样式 */
.text-label, .text-value {
  font-size: 14px;
  font-family: 'Inter', sans;
}

.text-label {
  margin-bottom: 5px;
  display: inline-block;
  width: 120px;
  color: #498be6;
}

.text-value {
  margin-bottom: 20px;
  display: inline-block;
  width: 190px;
}

/* 分隔线样式 */
.divider {
  margin-top: 15px;
  margin-bottom: 15px;
}

/* 标签样式 */
.label {
  font-size: 14px;
  display: inline-block;
  font-family: 'Inter', sans;
}

/* 输入框样式 */
.value {
  display: inline-block;
  width: 150px; /* 设置标签的固定宽度 */
  font-family: 'Inter', sans;
}

/* 顶部内容区域样式 */
.top {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
}
</style>
