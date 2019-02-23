<template>
    <div class="m-index-manage">
      <el-table
        :data="img_data"
        style="width: 100%">
        <el-table-column
          label="顺序"
          align="center"
          width="180">
          <template slot-scope="scope">
            {{scope.$index +1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="img"
          label="轮播图"
          align="center"
          width="380">
          <template slot-scope="scope">
            <div class="m-up-img-box" >
              <div class="inputbg m-img-xl el-upload-list--picture-card" v-if="scope.row.loadpic_pic">
                <img :src="scope.row.loadpic_pic"   style="width: 3.2rem;height:1.2rem;"/>
                <span class="el-upload-list__item-actions" v-if="scope.row.click">
                      <span class="el-upload-list__item-preview" @click="CardPreviewMain(scope.$index)">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span class="el-upload-list__item-delete" @click="imgRemoveMain(scope.$index)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
              </div>
              <div class="inputbg m-img-xl" v-else><span>+添加图片</span><input type="file" :id="scope.row.index" accept="image/*" @change="imgUploadDetailMain($event,scope.$index)"></div>
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
            <!--<el-select v-model="value8" filterable placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in options"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
            <el-input v-model="scope.row.loadpic_url" placeholder="" :disabled="!scope.row.click"></el-input>
          </template>

        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <div class="m-flex-center">
              <div class="m-icon-div" v-if="!scope.row.click" @click="changeClick(scope.$index)">
                <svg-icon icon-class="icon-editor"></svg-icon>
                <p>修改</p>
              </div>
              <span class="m-table-btn" v-if="scope.row.click" @click="sureClick(scope.$index)">确定</span>
              <span class="m-table-btn cancel" v-if="scope.row.click" @click="cancelClick(scope.$index)"> 取消</span>
              <div class="m-icon-div" @click="deleteImg(scope.row.loadpic_id)">
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
      <p class="m-add-text" v-if="img_data.length <5">
        <span @click="addRow">新增</span>
      </p>
      <!--<div class="m-bottom-btn m-flex-center">-->
        <!--<span class="m-btn active">保存</span>-->
        <!--<span class="m-btn cancel">取消</span>-->
      <!--</div>-->
    </div>
</template>

<script>
  import axios from 'axios';
  import api from '../../api/api'
    export default {
        name: "index",
      data(){
          return{
            img_data:[],
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
      mounted(){
          this.getData();
      },
      methods:{
        //  获取产品
        getData(){
          this.loading = true;
          axios.get(api.get_loadpic_list).then(res => {
            if(res.data.status == 200){
              let arr = [].concat(res.data.data);
              for(let i=0;i<arr.length;i++){
                arr[i].click= false;
              }
              this.img_data = [].concat(arr);
              this.loading = false;
            }else{
              this.$message.error(res.data.message);
            }
          })
        },
        /*商品主图片删除*/
        imgRemoveMain(index){
          let that =this;
          this.$confirm('确认要删除这张图片吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.img_data[index].loadpic_pic = '';
            var file = document.getElementById(index);
            file.value ='';
          }).catch(() => {

          });

        },
        /*商品主图片大图显示*/
        CardPreviewMain(index){
          this.imageUrl =  this.img_data[index].loadpic_pic;
          this.dialogVisible = true;
        },
        /*商品主图片上传重定向*/
        imgUploadDetailMain(event,index){
          if(this.img_data[index].loadpic_pic.length > 0){
            this.$message({
              type:'warning',
              message:'一个类型只能上传1张照片'
            });
            return false;
          }
          let form = new FormData();
          form.append("file", event.target.files[0]);
          form.append("FileType", 'scrollview');
          axios.post(api.upload_files ,form).then(res => {
            if(res.data.status == 200){
              let arr = [].concat(this.img_data);
             arr[index].loadpic_pic = res.data.data;
              this.img_data = [].concat(arr);
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

        //点击修改
        changeClick(index){
          let arr = [].concat(this.img_data);
          arr[index].click = true;
          this.img_data = [].concat(arr);
        },
        //确定
        sureClick(index){
          console.log(this.img_data[index].loadpic_id)
          if(this.img_data[index].loadpic_id){
            axios.post(api.update_loadpic +'?loadpic_id=' +this.img_data[index].loadpic_id,{
              loadpic_pic:this.img_data[index].loadpic_pic,
              loadpic_url: this.img_data[index].loadpic_url
            }).then(res => {
              if(res.data.status == 200){
                this.getData();
                this.$message({
                  type: 'success',
                  message: res.data.message
                });
              }else{
                this.$message({
                  type: 'error',
                  message: res.data.message
                });
              }
            })
          }else{
            axios.post(api.add_loadpic,{
              loadpic_pic:this.img_data[index].loadpic_pic,
              loadpic_url: this.img_data[index].loadpic_url
            }).then(res => {
              if(res.data.status == 200){
                this.getData();
                this.$message({
                  type: 'success',
                  message: res.data.message
                });
              }else{
                this.$message({
                  type: 'error',
                  message: res.data.message
                });
              }
            })
          }

        },
        cancelClick(index){
          let arr = [].concat(this.img_data);
          arr[index].click = false;
          this.img_data = [].concat(arr);
        },
        deleteImg(item){
          this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.get(api.delete_loadpic,
              {
                params:{
                  loadpic_id:item
                }
              }
            ).then(res => {
              if(res.data.status == 200){
                this.getData();
                this.$notify.success(res.data.message)
              }else{
                this.$message.error(res.data.message);
              }
            })
          }).catch(() => {

          });
        },
        addRow(){
          if(this.img_data.length > 4){
            this.$message.error('最多只支持5张轮播图');
            return false;
          }else{
            this.img_data.push({
              loadpic_id: "",
              loadpic_pic: "",
              loadpic_url: "",
              click:true
            })
          }
        }
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
    .m-add-text{
      margin-top: 30px;
      span{
        color: #409EFF;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .m-table-btn{
      display: inline-block;
      padding: 0 10px;
      background-color: #2D3A4B;
      color: #fff;
      margin-right: 10px;
      &.cancel{
        background-color: #F8F8F8;
        color: #2D3A4B;
      }
    }
  }

</style>
