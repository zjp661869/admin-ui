<template>
  <div class="issue-class">
    <nf-table
      ref="ruleManagementRef"
      class="nf-list-table"
      :cal-height="true"
      :loading="tableData.loading"
      :data="tableData.list"
      :columns="tableColumns"
      :column-check-get-all-check-desc="length => '全选' + '（' + length + '）'"
      :column-check-get-checked-length-desc="length => '已选' + '（' + length + '）'"
      :page-attrs="{
        'current-page': tableData.page.currentNo,
        'page-size': tableData.page.pageSize,
        'total': tableData.total,
        'disabled': tableData.loading
      }"
    >
      <template #searchBox>
        <nf-search-form
          ref="nfSearchForm"
          class="search-form"
          :form-options="searchOption"
          :item-width="227"
          btn-model="inline"
          expand-btn-tooltip-desc="展开"
          shrink-btn-tooltip-desc="收起"
          column-check-clear-desc="清除"
          @on-change="searchChange"
        >
          <template #btnBox>
            <nf-button type="primary" @click="searchTableList('reset')">查询</nf-button>
          </template>
        </nf-search-form>
      </template>
      <template #operation="scope">
        <nf-action :span="0" :unique="scope.index">
          <nf-button type="text" @click="editRule(scope.row)">编辑</nf-button>
        </nf-action>
      </template>
    </nf-table>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const tableData = ref({
  loading: false,
  list: [],
  total: 0,
  page: {
    currentNo: 1,
    pageSize: 10,
  }
})
const searchTableList = () => {
  console.log(111)
}
const searchChange = (value) => {
  console.log(111)
}
const editRule = (row) => {
  console.log(111)
}
const searchOption = ref([
  {
    label: '测试',
    prop: 'name',
    element: 'el-input',
    maxlength: '8',
    placeholder: '请输入'
  }
])
const tableColumns = ref([
  {
    label: '测试',
    prop: 'keywords',
  }
])
</script>

<style lang="scss" scoped>
.issue-class {
  height: calc(100vh - 174px);
  .nf-table {
    height: 100%;
  }
}
</style>