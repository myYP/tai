<template>
  <div class="container m-index">
    <el-row v-if="order_data">
      <el-col :span="6" >
        <el-card  >
          <div class="box-card" @click="toOrder">
            <svg-icon icon-class="icon-order-index"/>
            <div class="m-order-content">
              <p>订单管理</p>
              <p>{{order_data.count}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import axios from 'axios';
  import api from '../../api/api'
  export default {
    name: 'ProfileIndex',

    components: {},

    data() {
      return {
       order_data:null
      }
    },

    computed: {},

    methods: {
      getData(){
        axios.get(api.get_order_count).then(res => {
            if(res.data.status == 200){

             this.order_data = res.data.data;

            }
        })
      },
      toOrder(){
        console.log('asdasas')
        this.$router.push('/product/appoint')
      }
    },

    created() {
      this.getData();
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/myIndex";
.m-index{
    .box-card{
      display: flex;
      flex-flow: row;
      align-items: flex-start;
      justify-content: flex-start;
      .svg-icon{
        height: 80px;
        width: 80px;
        margin-right: 36px;
      }
      .m-order-content{
        height: 80px;
        font-size: 20px;
        font-weight: bold;
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        justify-content: space-between;
      }
    }

}
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  .m-scroll::-webkit-scrollbar
  {
    width: 4px;
    height: 4px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  .m-scroll::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 2px #fff;
    border-radius: 20px;
    background-color: #Fff;
  }

  /*定义滑块 内阴影+圆角*/
  .m-scroll::-webkit-scrollbar-thumb
  {
    border-radius: 20px;
    -webkit-box-shadow: inset 0 0 6px #BBBBBB;
    background-color: #fff;
  }

  .m-modal{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    .m-modal-state{
      margin: 10% auto ;
      width: 680px;
      /*height: 25%;*/
      background-color: #fff;
      border-radius: 8px;
      .m-modal-head{
        padding: 25px;
        background-color: #F5F6FF;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        .m-close{
          color: #A9A9A9;
          cursor: pointer;
        }
      }
      .m-modal-content{
        padding: 25px 50px;
      }
    }
  }
</style>
