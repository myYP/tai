<template>
  <div class="order-table">
    <el-table :data="orderList" style="width: 100%" class="out-table" :default-expand-all="expandAll" stripe size="mini">
      <!--<el-table-column type="expand" width="30">-->
        <!--<template slot-scope="scope">-->
          <!--<el-table class="demo-table-expand" :data="scope.row" border style="width: 100%" stripe size="mini">-->
            <!--<el-table-column align="center" prop="sku_pic" label="商品图片">-->
              <!--<template slot-scope="scope">-->
                <!--<img  :src="scope.row.sku_pic" alt="" style="width: 0.5rem;height: 0.5rem">-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" prop="products_name" label="商品名称">-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" prop="sku_price" label="单价">-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" prop="product_num" label="数量">-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="订单号" prop="order_no" width="200">
      </el-table-column>
      <el-table-column align="center" label="订单状态" prop="order_status" >
      </el-table-column>
      <el-table-column align="center" label="订单价格" prop="order_price" >
      </el-table-column>
      <el-table-column align="center" prop="medical_pic" label="商品图片">
        <template slot-scope="scope">
          <img  :src="scope.row.medical_pic[0]" alt="" style="width: 50px;height: 50px;">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="medical_name" label="商品名称">
      </el-table-column>
      <el-table-column align="center" label="体检人" prop="order_user_name" width="190">
      </el-table-column>
      <el-table-column align="center" label="联系方式" prop="order_user_telphone" width="120">
      </el-table-column>
      <el-table-column align="center" label="下单时间" prop="createtime" width="200">
      </el-table-column>
      <!--<el-table-column align="center" label="订单备注" prop="ordermain_message">-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <span class="m-table-link" @click="orderDetails(scope.row)">详情</span>
          <!--<span class="m-table-link">退款</span>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="page-button">
      <Pagination :total="total_page" @pageChange="pageChange"></Pagination>
    </div>
  </div>
</template>

<script>
  // 0: "已取消", 7: "未支付", 14: "支付中", 21: "已支付",28: "已发货", 35: "已收货", 42: "已完成", 49: "已评价", 56: "退款中"
  import Pagination from "../../components/common/page";
  import {Message} from 'element-ui';
  export default {
    props: ["order"],
    name: "all-order-table",
    data() {
      return {
        expandAll: false,
        orderList: [],
        total_page: 0,
        current_page: 1,
        OMstatus: ''
      }
    },
    components: { Pagination },
    methods: {
      // 去往订单详情 orderDetails
      orderDetails(order) {
        let order_id = order.order_id;
        this.$router.push({path: '/product/orderDetail', query: {order_id:order_id}});
      },
      // 接收数据并赋值给 this.orderList
      getOrderList(data) {
        this.orderList = data.data;
        console.log(data)
        // console.log(this.orderList)
        this.total_page = data.total_page;
      },
      // 分页组件的提示
      pageChange(v){
        if(v == this.current_page){
          this.$message({
            message: '这已经是第' + v + '页数据了',
            type: 'warning'
          });
          return false;
        }
        this.current_page = v;
        this.$emit('toPage', v)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  /*@import "../../common/css/_variate.less";*/
  .order-table {
    .out-table {
      font-size: 14px;
    }
    .page-button {
      margin-top: 0.3rem;
    }
    .order-details {
      background-color: #2D3A4B;
      color: #fff;
      font-size: 14px;
    }
    .m-table-link{
      color: #0051BB;
      display: inline-block;
      padding: 0 18px;
      cursor: pointer;
    }
  }

</style>
