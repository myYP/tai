<template>
  <div class="m-imageText">

    <div class="m-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="文章标题：" prop="science_name">
          <el-input v-model="form.science_name"></el-input>
          <p class="m-alert-text">建议问题文字在x字以内</p>
        </el-form-item>
        <el-form-item label="文章主图：" prop="science_pic">
          <div class="m-up-img-box" >
            <div class="inputbg m-img-xl el-upload-list--picture-card" v-if="form.science_pic">
              <img :src="form.science_pic"   style="width: 137px;height:137px;"/>
              <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="CardPreviewMain">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span class="el-upload-list__item-delete" @click="imgRemoveMain">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
            </div>
            <div class="inputbg m-img-xl"><span>+添加图片</span><input type="file" id="main" accept="image/*" @change="imgUploadDetailMain"></div>
          </div>
          <p class="m-alert-text">建议尺寸：2:1，大小在xmb以内</p>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"  :src="imageUrl" >
          </el-dialog>
        </el-form-item>
        <el-form-item label="文章内容：" prop="science_message">
          <!--<div class="edit_container">-->
            <quill-editor
              v-model="form.science_message"
              ref="myQuillEditor"
              class="editer"
              :options="editorOption" @ready="onEditorReady($event)">
            </quill-editor>
          <!--</div>-->
        </el-form-item>
        <el-form-item label="是否推荐：">
          <el-switch
            v-model="form.science_type"
            active-color="#409EFF"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>

      </el-form>

      <div class="m-flex-center" style="margin-top: 100px;">
        <span class="m-btn " @click="saveBtn">确定</span>
        <span class="m-btn cancel" @click="cancelValue"> 取消</span>
      </div>
    </div>
  </div>
</template>

<script>
  // import pageNav from '../../components/common/pageNav';
  import axios from 'axios';
  import api from '../../api/api';
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor' //调用编辑器
  export default {
    data(){
      return {
        editorOption:{
        },
        imageUrl:'',
        dialogVisible:false,
        select_value:'',
        form: {
          science_name: '',
          science_pic: '',
          science_message: '',
          science_type:false
        },
        rules:{
          science_name:[
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          science_pic:[
            { required: true, message: '请输入折扣', trigger: 'blur' }
          ],
          science_message:[
            { required: true, message: '请输入使用条件', trigger: 'blur' }
          ]
        },
      }
    },
    components:{
      // pageNav
      quillEditor
    },
    inject: ['reload'],
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted(){
      if(this.$route.query.science_id){
        this.getInfo();
      }

    },
    methods:{
      onEditorReady(editor) {
      },
      saveBtn(){
        let that = this,_form=[];
        _form = Object.assign(that.form);
        if(_form.science_type){
          _form.science_type = 1
        }else{
          _form.science_type = 0
        }
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if(this.$route.query.science_id){
              delete _form.updatetime;
              axios.post(api.update_science + '?science_id='+this.$route.query.science_id,_form).then(res => {
                if(res.data.status == 200){
                  this.$notify.success(res.data.message);
                  this.$router.push('/material');
                }else{
                  this.$message({
                    type: 'error',
                    message: res.data.message
                  });
                }
              })
            }else{
              axios.post(api.new_science,_form).then(res => {
                if(res.data.status == 200){
                  this.$notify.success(res.data.message);
                  this.$router.push('/material');
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
      },
      cancelValue(){
        this.reload();
      },
      //  获取参数
      getInfo(){
        axios.get(api.get_science_message,{
          params:{
            science_id:this.$route.query.science_id
          }
        }).then(res => {
          if(res.data.status == 200){
           this.form = res.data.data;
            this.form.science_type = Boolean(this.form.science_type);
          }
        })
      },
      /*商品主图片删除*/
      imgRemoveMain(index){
        this.form.science_pic = '';
        var file = document.getElementById('main');
        file.value ='';
      },
      /*商品主图片大图显示*/
      CardPreviewMain(index){
        this.imageUrl =  this.form.science_pic;
        this.dialogVisible = true;
      },
      /*商品主图片上传重定向*/
      imgUploadDetailMain(event,index){
        if(this.form.science_pic.length > 0){
          this.$message({
            type:'warning',
            message:'只能上传1张照片'
          });
          return false;
        }
        let form = new FormData();
        form.append("file", event.target.files[0]);
        form.append("FileType", 'science_pic');
        axios.post(api.upload_files ,form).then(res => {
          if(res.data.status == 200){
            this.form.science_pic = res.data.data;
            var file = document.getElementById('main');
            file.value ='';
          }else{
            this.$message({
              type: 'error',
              message: '服务器请求失败，请稍后再试 '
            });
          }
        },error =>{
          this.$message({
            type: 'error',
            message: '服务器请求失败，请稍后再试 '
          });
        })
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .m-imageText{
    .m-part-title{
      margin-bottom: 20px;
    }
  }
  .el-upload-list--picture-card .el-upload-list__item-actions:hover {
    opacity: 1;
  }
  .m-up-img-box{
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
    .el-upload-list__item-actions {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0,0,0,.5);
      -webkit-transition: opacity .3s;
      transition: opacity .3s;
      border-radius: 6px;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: center;
      span {
        cursor: pointer;
      }
    }
  }
  .inputbg{
    margin-left: 10px;
    color: #97ADCB;
    border: 1px solid #eeeeee;
    background-color: #fbfdff;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    width: 137px;
    height: 137px;
    line-height: 137px;
    text-align: center;
    &.m-img-l{
      width: 137px;
      height: 127px;
      line-height: 127px;
      input{
        width: 137px;
        height: 127px;
        line-height: 127px;
      }
    }
  }
  .inputbg input{
    position: absolute;
    top: 0;
    left: 0;
    opacity:0;
    filter:alpha(opacity=0);
    width: 137px;
    height: 127px;
    line-height: 127px;
    cursor: pointer;
  }
</style>
