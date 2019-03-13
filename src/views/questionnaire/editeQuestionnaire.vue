<template>
    <div class="m-editeQuestionnaire">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="left">
        <el-form-item label="问题:" prop="question_title">
          <el-input v-model="form.question_title" class="m-input-l"></el-input>
          <p class="m-alert-text">建议问题文字在50字以内</p>
        </el-form-item>


        <el-form-item label="分类:" required>
          <el-select v-model="form.question_type" placeholder="请选择活动区域">
            <el-option label="单选" value="0"></el-option>
            <el-option label="多选" value="1"></el-option>
            <el-option label="问答" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选项" v-if="form.question_type != 2" v-for="(item,index) in form.question_choose" :key="index">
          <el-input v-model="form.question_choose[index]" class="m-input-xs"></el-input>
          <img src="../../common/images/icon-cut.png" v-if="index>0" class="m-icon-cut" @click="deleteChoose(index)">
        </el-form-item>
      </el-form>
      <p v-if="form.question_type != 2">
        <span class="m-add" @click="addXuan">新增选项</span>
      </p>
      <div class="m-btn-box">
        <span class="m-btn active" @click.stop="addAdmin(true)">保存</span>
        <span class="m-btn cancel" @click.stop="addAdmin(false)">重置</span>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import api from '../../api/api';
    export default {
        name: "edite-questionnaire",
      data(){
          return{
            question_id:'',
            form: {
              question_title: '',
              question_type: "0",
              question_choose:['']
            },
            rules:{
              question_title:[
                { required: true, message: '请输入问题名称', trigger: 'blur' }
              ]
            }
          }
      },
      mounted(){
        if(this.$route.query.question_id){
          this.getQues();
        }
      },
      methods:{
        getQues(){
          this.loading = true;
          axios.get(api.get_question_message,{
            params:{
              question_id:this.$route.query.question_id
            }
          }).then(res => {
            if(res.data.status == 200){
              this.form = Object.assign(res.data.data);
              this.total_page = res.data.total_page;
              this.loading = false;
            }else{
              this.$message.error(res.data.message);
            }
          })
        },
        addXuan(){
          this.form.question_choose.push('');
        },
        addAdmin(bool){
          if(bool){
            let that = this,_form=null;
            this.$refs['form'].validate((valid) => {
              if (valid) {
                _form = that.form;
                if(_form.question_type == '2'){
                  _form.question_choose = [];
                }else{
                 for(let i=0;i<_form.question_choose.length;i++){
                   if(_form.question_choose[i] == '' ){
                     this.$notify.error('请填写完整的选项名称');
                     return false;
                   }
                 }
                }
                _form.question_type = Number(_form.question_type);
                if(this.$route.query.question_id){
                  axios.post(api.update_questiion + '?question_id='+that.$route.query.question_id,_form).then(res => {
                    if(res.data.status == 200){
                      this.$notify.success(res.data.message);
                      this.$router.push('/questionnaire/addQuestionnaire');
                    }else{
                      this.$message({
                        type: 'error',
                        message: res.data.message
                      });
                    }
                  })
                }else{
                  axios.post(api.new_question,_form).then(res => {
                    if(res.data.status == 200){
                      this.$notify.success(res.data.message);
                      this.$router.push('/questionnaire/addQuestionnaire');
                    }else{
                      this.$message({
                        type: 'error',
                        message: res.data.message
                      });
                    }
                  })
                }

              }
            })
          }else{
            if(this.$route.query.question_id){
              this.getQues();
            }else{
              this.form = {
                  question_title: '',
                  question_type: "0",
                  question_choose:['']
              }
            }
          }
        },
        deleteChoose(i){

          this.$confirm('确定删除此选项吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.form.question_choose.splice(i,1);
          }).catch(() => {
          });
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-editeQuestionnaire{
  .m-add{
    color: #409EFF;
    text-decoration: underline;
    margin-top: 30px;
    display: block;
    cursor: pointer;
  }
  .m-btn-box{
    position: fixed;
    bottom: 76px;
    width: 80%;
    text-align: center;
  }
  .m-alert-text{
    color: #999;
    font-size: 12px;
  }
  .m-icon-cut{
    display: inline-block;
    width: 32px;
    height: 32px;
    cursor: pointer;
    vertical-align: top;
  }
}
</style>
