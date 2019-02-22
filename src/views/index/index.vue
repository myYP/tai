<template>
    <div class="m-index-manage">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="num"
          label="顺序"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="img"
          label="轮播图"
          align="center"
          width="380">
          <template slot-scope="scope">
            <div class="m-up-img-box" >
              <div class="inputbg m-img-xl el-upload-list--picture-card" v-if="scope.row.img">

                <img :src="scope.row.img"   style="width: 3.2rem;height:1.2rem;"/>
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
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%"  :src="imageUrl" >
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column
          prop="correlation"
          align="center"
          label="关联">
          <template slot-scope="scope">
            <el-select v-model="value8" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>

        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <div class="m-flex-center">
              <div class="m-icon-div">
                <svg-icon icon-class="icon-editor"></svg-icon>
                <p>修改</p>
              </div>
              <div class="m-icon-div">
                <svg-icon icon-class="icon-delete"></svg-icon>
                <p>删除</p>
              </div>
            </div>


          </template>
        </el-table-column>
      </el-table>
      <p class="m-alert">
        建议宽高750*270px,限制大小在xxM内，限制5张。
      </p>
      <div class="m-bottom-btn m-flex-center">
        <span class="m-btn active">保存</span>
        <span class="m-btn cancel">取消</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            tableData:[
              {
                num:1,
                img:'',
                correlation:''
              }
            ],
            imageUrl:'',
            dialogVisible:false,
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            value8: ''
          }
      },
      methods:{
        /*商品主图片删除*/
        imgRemoveMain(index){
          this.select_value = '';
          var file = document.getElementById('main');
          file.value ='';
        },
        /*商品主图片大图显示*/
        CardPreviewMain(index){
          this.imageUrl =  this.select_value;
          this.dialogVisible = true;
        },
        /*商品主图片上传重定向*/
        imgUploadDetailMain(event,index){
          if(this.select_value.length > 0){
            this.$message({
              type:'warning',
              message:'一个类型只能上传1张照片'
            });
            return false;
          }
          let form = new FormData();
          form.append("file", event.target.files[0]);
          form.append("FileType", 'pic');
          axios.post(api.upload_files ,form).then(res => {
            if(res.data.status == 200){
              this.select_value = res.data.data;
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
  .m-index-manage{
    .svg-icon{
      width: 27px;
      height: 27px;
      cursor: pointer;
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
      width: 220px;
      height: 120px;
      line-height: 120px;
      text-align: center;
      &.m-img-l{
        width: 210px;
        height: 110px;
        line-height: 110px;
        input{
          width: 210px;
          height: 110px;
          line-height: 110px;
        }
      }
    }
    .inputbg input{
      position: absolute;
      top: 0;
      left: 0;
      opacity:0;
      filter:alpha(opacity=0);
      width: 220px;
      height: 120px;
      line-height: 120px;
      cursor: pointer;
    }
    .m-alert{
      color:#B8B8B8;
      font-size: 12px;
      margin-top: 10px;
    }
    .m-bottom-btn{
      margin-top: 80px;
    }
  }

</style>
