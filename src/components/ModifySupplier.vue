<template>
  <!-- 主容器 -->
  <el-container class="supplier">
    <!-- Header 区域 -->
    <el-header class="header">
      <!-- 返回按钮 -->
      <el-icon class="Back" @click="navigateTo('/Supplier')">
        <ArrowLeft />
      </el-icon>
      <!-- 首页按钮 -->
      <el-icon class="House" @click="navigateTo('/')">
        <House />
      </el-icon>
      <!-- 标题 -->
      <span class="title">Modify Supplier</span>
    </el-header>

    <!-- 主体内容区域 -->
    <br />
    <el-container>
      <!-- 如果已选中供应商，显示内容 -->
      <el-main class="main-content" v-if="selectedSupplier">
        <!-- 标签页 -->
        <el-tabs v-model="activeTab">
          <!-- 通用信息标签页 -->
          <el-tab-pane label="Common" name="common">
            <div>
              <!-- 主信息 -->
              <p class="text-title">Primary</p>
              <el-divider class="divider"></el-divider>
              <el-row :gutter="20">
                <!-- 供应商ID -->
                <el-col :span="8">
                  <span class="text-label">Supplier ID :</span>
                  <el-input
                    v-model="selectedSupplier.supplierID"
                    class="text-value"
                    disabled
                  />
                </el-col>
                <!-- 供应商名称 -->
                <el-col :span="8">
                  <span class="text-label">Supplier Name :</span>
                  <el-input
                    v-model="selectedSupplier.suppliername"
                    class="text-value"
                  />
                </el-col>
                <!-- BP角色 -->
                <el-col :span="8">
                  <span class="text-label">BP Role :</span>
                  <el-input
                    v-model="selectedSupplier.partnerFunctions"
                    class="text-value"
                  />
                </el-col>
              </el-row>

              <!-- 地址信息 -->
              <p class="text-title">Address</p>
              <el-divider class="divider"></el-divider>
              <el-row :gutter="20">
                <!-- 街道地址 -->
                <el-col :span="8">
                  <span class="text-label">Street Address :</span>
                  <el-input
                    v-model="selectedSupplier.streetAddress"
                    class="text-value"
                  />
                </el-col>
                <!-- 邮政编码 -->
                <el-col :span="8">
                  <span class="text-label">Postal Code :</span>
                  <el-input
                    v-model="selectedSupplier.postalCode"
                    class="text-value"
                  />
                </el-col>
                <!-- 国家 -->
                <el-col :span="8">
                  <span class="text-label">Country :</span>
                  <el-input
                    v-model="selectedSupplier.country"
                    class="text-value"
                  />
                </el-col>
                <!-- 地区 -->
                <el-col :span="8">
                  <span class="text-label">Region :</span>
                  <el-input
                    v-model="selectedSupplier.region"
                    class="text-value"
                  />
                </el-col>
                <!-- 城市 -->
                <el-col :span="8">
                  <span class="text-label">City :</span>
                  <el-input
                    v-model="selectedSupplier.city"
                    class="text-value"
                  />
                </el-col>
              </el-row>

              <!-- 通信信息 -->
              <p class="text-title">Communication</p>
              <el-divider class="divider"></el-divider>
              <el-row :gutter="20">
                <!-- 语言 -->
                <el-col :span="8">
                  <span class="text-label">Language :</span>
                  <el-input
                    v-model="selectedSupplier.communicationLang"
                    class="text-value"
                  />
                </el-col>
              </el-row>

              <!-- 联系信息 -->
              <p class="text-title">Name</p>
              <el-divider class="divider"></el-divider>
              <el-row :gutter="20">
                <!-- 联系方式 -->
                <el-col :span="8">
                  <span class="text-label">Contact Info :</span>
                  <el-input
                    v-model="selectedSupplier.contactInfo"
                    class="text-value"
                  />
                </el-col>
                <!-- 用户ID -->
                <el-col :span="8">
                  <span class="text-label">User ID:</span>
                  <el-input
                    v-model="selectedSupplier.userID"
                    class="text-value"
                  />
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>

          <!-- 供应商、账户及付款标签页 -->
          <el-tab-pane label="Vendor & Account & Payment" name="vendor">
            <div>
              <!-- 税务数据 -->
              <p class="text-title">Tax Data</p>
              <el-divider class="divider"></el-divider>
              <el-row :gutter="20">
                <!-- 税号 -->
                <el-col :span="8">
                  <span class="text-label1">Tax Number :</span>
                  <el-input
                    v-model="selectedSupplier.taxNumber"
                    class="text-value"
                  />
                </el-col>
              </el-row>

              <!-- 账户管理 -->
              <p class="text-title">Account Management</p>
              <el-divider class="divider"></el-divider>
              <el-row :gutter="20">
                <!-- 对账账户 -->
                <el-col :span="8">
                  <span class="text-label1">Reconciliation Acct :</span>
                  <el-input
                    v-model="selectedSupplier.reconciliationAcct"
                    class="text-value"
                  />
                </el-col>
              </el-row>

              <!-- 付款数据 -->
              <p class="text-title">Payment Data</p>
              <el-divider class="divider"></el-divider>
              <el-row :gutter="20">
                <!-- 付款条款 -->
                <el-col :span="8">
                  <span class="text-label1">Terms of Payments :</span>
                  <el-input
                    v-model="selectedSupplier.termsOfPayment"
                    class="text-value"
                  />
                </el-col>
                <!-- 双重发票检查 -->
                <el-col :span="8">
                  <span class="text-label1">Check Double Invoice :</span>
                  <el-input
                    v-model="selectedSupplier.checkDoubleInvoice"
                    class="text-value"
                  />
                </el-col>
              </el-row>

              <!-- 通讯信息 -->
              <p class="text-title">Correspondence</p>
              <el-divider class="divider"></el-divider>
              <el-row :gutter="20">
                <!-- 供应商处的职员 -->
                <el-col :span="8">
                  <span class="text-label">Clerk at Vendor :</span>
                  <el-input
                    v-model="selectedSupplier.clerkName"
                    class="text-value"
                  />
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>

          <!-- 采购标签页 -->
          <el-tab-pane label="Purchasing" name="purchasing">
            <div>
              <!-- 采购组织 -->
              <p class="text-title">Purchasing Organization</p>
              <el-divider class="divider"></el-divider>
              <el-row :gutter="20">
                <!-- 采购组织 -->
                <el-col :span="8">
                  <span class="text-label1">Purch. Organization :</span>
                  <el-input
                    v-model="selectedSupplier.purchasingOrg"
                    class="text-value"
                  />
                </el-col>
              </el-row>

              <!-- 采购数据 -->
              <p class="text-title">Purchase Data</p>
              <el-divider class="divider"></el-divider>
              <el-row :gutter="20">
                <!-- 订单货币 -->
                <el-col :span="8">
                  <span class="text-label1">Order Currency :</span>
                  <el-input
                    v-model="selectedSupplier.orderCurrency"
                    class="text-value"
                  />
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
        <br />
        <!-- 根据当前激活的标签页，动态显示按钮 -->
        <el-button
          type="primary"
          plain
          @click="activeTab !== 'purchasing' ? nextTab() : handleSave()"
        >
          {{ activeTab !== 'purchasing' ? 'Next Tab' : 'Save' }}
        </el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref, onMounted } from 'vue'; // 引入 Vue 的 ref 和 onMounted 函数
import { useRoute, useRouter } from 'vue-router'; // 引入 Vue Router 的相关函数
import axios from 'axios'; // 引入 axios 库，用于发送 HTTP 请求
import { ElMessageBox } from 'element-plus'; // 引入 Element Plus 的消息盒子组件

export default {
  setup() {
    // 创建响应式数据和方法
    const route = useRoute(); // 获取当前路由信息
    const router = useRouter(); // 获取路由实例
    const activeTab = ref('common'); // 当前激活的标签页，默认是 'common'
    const selectedSupplier = ref(null); // 当前选中的供应商，初始为 null

    // 异步函数：根据供应商ID获取供应商详细信息
    const fetchSupplierDetails = async supplierID => {
      try {
        const response = await axios.post('/api/supplier/query', 
          { supplierID }, 
          { 
            headers: {
              Authorization: `Bearer ${token_value}`, // 添加授权令牌
              'Content-Type': 'application/json' // 设置内容类型
            }
          }
        );

        // 如果返回数据正常，更新 selectedSupplier，否则显示错误提示
        if (response.data.code === 200 && response.data.data.length > 0) {
          selectedSupplier.value = response.data.data[0];
        } else {
          ElMessageBox.alert(
            'No supplier found with the given ID.', // 提示信息
            'Search Failed', // 弹窗标题
            {
              confirmButtonText: 'OK', // 确认按钮文本
              type: 'error', // 弹窗类型
            }
          );
          selectedSupplier.value = null; // 如果未找到供应商，重置 selectedSupplier
        }
      } catch (error) {
        console.error('Error fetching supplier data:', error); // 输出错误信息到控制台
        ElMessageBox.alert('Failed to fetch supplier data!', 'Error', {
          confirmButtonText: 'OK',
          type: 'error',
        });
      }
    };

    // 组件挂载后执行
    onMounted(() => {
      const supplierID = route.params.id; // 从路由参数中获取供应商ID
      if (supplierID) {
        fetchSupplierDetails(supplierID); // 如果供应商ID存在，则获取供应商详情
      } else {
        ElMessageBox.alert('No Supplier ID provided!', 'Error', {
          confirmButtonText: 'OK',
          type: 'error',
        });
      }
    });

    // 导航到指定路径
    const navigateTo = (path) => {
      router.push(path); // 使用 router.push 方法导航
    };

    // 切换到下一个标签页
    const nextTab = () => {
      const tabs = ['common', 'vendor', 'purchasing']; // 标签页顺序
      const currentIndex = tabs.indexOf(activeTab.value); // 当前标签页索引
      if (currentIndex < tabs.length - 1) {
        activeTab.value = tabs[currentIndex + 1]; // 切换到下一个标签页
      }
    };

    // 保存供应商信息
    const handleSave = async () => {
      try {
        const response = await axios.post('/api/supplier/save',
          selectedSupplier.value,
          {
            headers: {
              Authorization: `Bearer ${token_value}`, // 添加授权令牌
              'Content-Type': 'application/json' // 设置内容类型
            }
          }
        );

        // 如果保存成功，显示成功消息，否则显示错误消息
        if (response.data.code === 200) {
          ElMessageBox.alert('Supplier details saved successfully!', 'Success', {
            confirmButtonText: 'OK',
            type: 'success',
          });
        } else {
          ElMessageBox.alert('Failed to save supplier details.', 'Error', {
            confirmButtonText: 'OK',
            type: 'error',
          });
        }
      } catch (error) {
        console.error('Error saving supplier data:', error); // 输出错误信息到控制台
        ElMessageBox.alert('Failed to save supplier details!', 'Error', {
          confirmButtonText: 'OK',
          type: 'error',
        });
      }
    };

    // 返回 setup 函数中的响应式数据和方法
    return {
      selectedSupplier,
      activeTab,
      navigateTo,
      nextTab,
      handleSave,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

.supplier {
  background: linear-gradient(
    to bottom,
    rgba(127, 167, 226, 1),
    rgba(197, 217, 247, 1),
    rgba(255, 255, 255, 1)
  ); /* 设置背景为渐变色 */
  height: 100vh;
  margin: 0;
  padding: 0 80px;
  box-sizing: border-box; /* 盒模型设置为 border-box */
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
  overflow-y: auto; /* 内容溢出时添加滚动条 */
}

.text-title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}

.text-label1 {
  font-size: 14px;
  margin-bottom: 5px;
  display: inline-block;
  width: 160px;
  font-family: 'Inter', sans;
  color: #498be6;
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
