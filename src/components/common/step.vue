<template>
  <div class="m-progress-box">
    <template v-for="(item,index) in list" >
      <div class="m-progress-one " :class="item.active?'active':''">
        <p>{{item.name}}</p>
        <div class="m-progress-icon">
          <span class="m-progress-line"></span>
          <span class="m-progress-circle">{{index+1}}</span>
          <span class="m-progress-line" ></span>
        </div>
        <div style="height: 0.15rem">
          <div class="time">{{item.time == '' ?'未完成':item.time}}</div>
        </div>
      </div>
    </template>

  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    props:{
      list:{
        type:Array,
        default:null
      }
    },
    methods: {

    },
    created() {

    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  /*@import "../../common/css/index";*/
.m-progress-box{
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
  .m-progress-one{
    p{
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      color: #B8B8B8;
    }
    .time {
      margin-top: 10px;
      text-align: center;
      color: #B8B8B8;
    }
    .m-progress-icon{
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      span{
        display: block;
        &.m-progress-line{
          width: 60px;
          height: 5px;
          background-color: #DBDCDC;
          &.active{
            background-color: #2D3A4B;
          }
        }
        &.m-progress-circle{
          width: 33px;
          height: 33px;
          line-height: 33px;
          font-size: 18px;
          color: #fff;
          border-radius: 50%;
          background-color: #DBDCDC;
          text-align: center;
        }
      }
    }
    &:first-child{
      .m-progress-icon{
        span{
          &.m-progress-line{
            &:first-child{
              background-color: transparent;
              width: 0;
            }
          }
        }
      }
    }
    &:last-child{
      .m-progress-icon{
        span{
          &.m-progress-line{
            &:last-child{
              background-color: transparent!important;
              //width: 0;
            }
          }
        }
      }
    }
    &.active{
      p{
        color: #2D3A4B;
      }
      .m-progress-icon{
        span{
          &.m-progress-line{
            background-color: #2D3A4B;
            /*&:last-child{*/
              /*background-color: #efefef;*/
            /*}*/
            &.active{
              background-color: #2D3A4B;
            }
          }
          &.m-progress-circle{
            background-color: #2D3A4B;
          }
        }
      }
    }
  }
}
</style>
