<template>
  <div class="all-order">
    <h3 class="m-part-title">
         <span>订单管理</span>
    </h3>
    <div class="all-order-content" >
      <div class="m-search-box">
        <div>
          <el-input v-model="form.order_user_name" class="m-input-s" placeholder="用户名称"></el-input>
          <el-input v-model="form.order_user_telphone" class="m-input-s" placeholder="手机号"></el-input>
          <span class="m-btn m-search-btn" @click="topSearch">
            <svg-icon icon-class="icon-search" />
            <span>搜索</span>
          </span>
        </div>
        <div>
          <span class="m-btn active" @click="downloadExcel">
            <!--<svg-icon icon-class="icon-add"></svg-icon>-->
            <span>导出表格</span>
          </span>
        </div>
      </div>


      <div class="all-order-tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <div v-for="item in tabList">
            <el-tab-pane :label="item.name" :name="item.name" :value="item.status" :lazy="lazyStatus">
              <span slot="label"> {{item.name}}</span>
              <all-order-table ref="child" :order="order" @toPage="getData"></all-order-table>
            </el-tab-pane>
          </div>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import allOrderTable from '../../components/common/all-order-table';
  import api from '../../api/api';
  import {Message} from 'element-ui';
  import axios from 'axios';
  import index from "../../router";
  export default {
    data() {
      return {
        // name: '所有订单',
        activeName: '全部',
        form:{
          order_user_name:'',
          order_user_telphone:''
        },
        lazyStatus: false,
        orderList: [],
        search: {},
        order: {},
        page_size: 10,
        tabList:[
          {
            name:'全部',
            status:''
          },
          {
            name:'待付款',
            status:'待付款'
          },
          {
            name:'已取消',
            status:'已取消'
          },
          {
            name:'已支付',
            status:'已支付'
          },
          {
            name:'已完成',
            status:'已完成'
          }
        ],
        // tabList: ['全 部', '已取消','未支付','支付中', '已支付','已发货','已收货', '已完成','已评价','退款中'],
        index: 0
      }
    },
    components: {  allOrderTable },
    mounted(){
      // this.getStatus();
      this.getData(1)
    },
    methods: {
      // 获取点击tab的label
      handleClick(tab) {
        // 判断要调用哪个子组件的方法
        if(tab.index == 4) {
          this.index = 0
        }else {
          this.index = parseInt(tab.index) + 1
        }

        // this.tabList = ['全 部', '已取消','未支付','支付中', '已支付','已发货','已收货', '已完成','已评价','退款中']
        // tab.label含"0"则不调用接口
        // if(tab.label.indexOf("0") == -1) {
        this.getData(1,tab.$attrs.value)
        // }
      },
      // 获取订单数据
      getData(v,status){
        let params = {
          order_status: status,
          page_num: v,
          page_size: this.page_size,
        }
        Object.assign(params,this.form);

        axios.get(api.get_all_order,{params:params}).then(res => {
          if(res.data.status == 200) {
            this.orderList = res.data;
            this.order = res.data;
            // 仅在查询和点击“全部”Tab标签时，对tabList进行一次添加数量操作
            // if(this.tabList[0].length == 3) {
            //   this.getTabs(this.order.OMcount)
            // }
          }else{
            this.$message.error(res.data.message);
          }
        })
      },
      // 头部查询条件
      topSearch() {
        let status = '';
        for(let i=0;i<this.tabList.length;i++){
          if(this.tabList[i].name == this.activeName){
            status = this.tabList[i].status;
          }
        }
        this.getData(1,status);
      },
      downloadExcel(){
        let elemIF = document.createElement("iframe");
        elemIF.src = api.export_xls;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
      }
    },
    created() {
      // this.getData(1)
    },
    watch: {
      // 依据order变化来传递对应的新的order给对应的this.index的子组件，并调用该子组件的getOrderList方法
      order(newValue, oldValue) {
        console.log(newValue,'asdasd')
        console.log(this.$refs.child[this.index])
        this.$refs.child[this.index].getOrderList(newValue)
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  /*@import "../../common/css/_variate.less";*/
  .all-order {
    .m-part-title{
      font-size: 18px;
      margin-bottom: 20px;
    }
    .all-order-content {

      .all-order-search {
        margin: 15px 20px 0 20px;
        .m-mr-top{
          margin-top: 30px;
        }
        .m-excel-btn{
          display: inline-block;
          padding: 0 8px;
          border: 1px solid #2D3A4B;
          border-radius: 5px;
          color: #595757;
          height: 35px;
          line-height: 35px;
          font-size: 16px;
          .m-icon-make-report{
            display: inline-block;
            width: 25px;
            height: 25px;
            /*background: url("../../common/images/icon-make-report.png") no-repeat;*/
            background-size: 100% 100%;
            vertical-align: middle;
          }
        }
      }
      .all-order-tabs {
        width: 100%;

        margin-top: 20px;
        .el-tabs {
          padding: 20px;
        }
      }
    }
  }
  .search-text-input {
    float: left;
    width: 320px;
    margin-bottom: 10px;
    .search-text {
      float: left;
      margin-left: 40px;
      line-height: 22px;
      font-size: 14px;
    }
    .search-text-middle {
      float: left;
      font-size: 14px;
      line-height: 22px;
      margin: 0 10px 0 10px;
    }
    .el-input {
      float: left;
      width: 160px;
    }
  }
</style>
