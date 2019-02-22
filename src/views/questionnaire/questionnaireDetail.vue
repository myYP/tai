<template>
    <div class="m-questionnaireDetail">
        <div class="m-title">
          <p class="m-row">
            <span class="m-label">提交人：</span>
            <span>{{examiner_name}}</span>
          </p>
          <p class="m-row">
            <span class="m-label">提交时间：</span>
            <span>{{createtime}}</span>
          </p>
        </div>
      <div class="m-question-one" v-for="(item,index) in answer_list">
        <p class="m-row">
          <span class="m-label">问题{{index +1}}：</span>
          <span>{{item.question_title}}？【{{item.question_type}}】</span>
        </p>
        <div class="m-row">
          <span class="m-label">回答{{index +1}}：</span>
          <div class="m-radio-box" v-if="item.question_type != '问答'">
            <!--<span class="m-radio">-->
                <!--<svg-icon icon-class="icon-radio"></svg-icon>-->
               <!--选项1-->
            <!--</span>-->
            <!--<span class="m-radio">-->
                <!--<svg-icon icon-class="icon-radio-active"></svg-icon>-->
               <!--选项1-->
            <!--</span>-->
            <el-radio-group v-if="item.question_type == '单选'" v-model="item.answer_choose[0]">
              <el-radio :label="i" v-for="(i,j) in item.question_choose" :disabled="true" :key="j">{{i}}</el-radio>
            </el-radio-group>
            <el-checkbox-group v-model="item.answer_choose" v-if="item.question_type == '多选'" >
              <el-checkbox :label="i" :value="i"  disabled v-for="(i,j) in item.question_choose" :key="j"></el-checkbox>
            </el-checkbox-group>
          </div>
          <span v-else>{{item.answer_choose}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import api from '../../api/api'
    export default {
        name: "questionnaire-detail",
      data(){
          return {
            answer_list:[],
            createtime:'',
            examiner_name:'',
            loading:false
          }
      },
      mounted(){
          this.getDetail();
      },
      methods:{
        getDetail(){
          this.loading = true;
          axios.get(api.get_answer_message,{
            params:{
              answeruser_id:this.$route.query.answeruser_id
            }
          }).then(res => {
            if(res.data.status == 200){
              this.answer_list =res.data.data.answer_list;
              this.createtime = res.data.data.createtime;
              this.examiner_name = res.data.data.examiner_name;
              this.loading = false;
            }else{
              this.$message.error(res.data.message);
            }
          })
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-questionnaireDetail{
  color:#595757;
  .m-title{
    margin-bottom: 50px;
  }
  .m-row{
    margin-bottom: 20px;
    .m-label{
      display: inline-block;
      width: 100px;
    }
  }
  .m-question-one{
    border-bottom: 1px solid #B8B8B8;
    margin-bottom: 20px;
    .m-radio-box{
      display: inline-block;
      .m-radio{
        margin-right: 60px;
      }
    }
  }
}
</style>
