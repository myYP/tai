<template>
    <div  class="m-addProduct">
      <!--<h3 class="m-part-title" style="margin-bottom: 20px;">-->
        <!--<span class="m-part-title-icon"></span>-->
        <!--<span>发布商品</span>-->
      <!--</h3>-->
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="right" class="demo-ruleForm">
        <h3 class="m-form-part-title">
          <span class="m-part-title-icon"></span>
          <span>基本信息</span>
        </h3>
        <el-form-item label="商品名称：" prop="medical_name" required>
          <el-input v-model="form.medical_name" class="m-input-m" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="商品主图：" prop="medical_pic"  required>
          <div class="m-up-img-box">
            <div class="inputbg m-img-xl el-upload-list--picture-card" v-for="(item,index) in form.medical_pic">
              <img :src="item"   style="width: 1.2rem;height:1.2rem;"/>
              <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="CardPreviewMain(index)">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span class="el-upload-list__item-delete" @click="imgRemoveMain(index)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
            </div>
            <div class="inputbg m-img-xl"><span>+添加图片</span><input type="file" id="main" accept="image/*" @change="imgUploadDetailMain"></div>
          </div>
          <p class="m-alert-text">建议尺寸：1:1，大小在xmb以内，最多上传5张商品图片</p>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"  :src="imageUrl" >
          </el-dialog>
        </el-form-item>
        <h3 class="m-form-part-title">
          <span class="m-part-title-icon"></span>
          <span>商品价格</span>
        </h3>

        <el-form-item label="商品价格：" required prop="medical_price">
          <span>￥</span>
          <el-input v-model="form.medical_price" type="number" class="m-input-s" placeholder="￥"></el-input>
          <span>元</span>
        </el-form-item>
        <!--<el-form-item label="商品库存：" >-->
          <!--<el-input v-model="form.prstocks" type="number" class="m-input-s" placeholder=""></el-input>-->
          <!--<span>件</span>-->
        <!--</el-form-item>-->

        <h3 class="m-form-part-title">
          <span class="m-part-title-icon"></span>
          <span>商品详情</span>
        </h3>
        <el-form-item label="商品详情：" prop="medical_message">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :http-request="imgUploadDetail"
            :file-list="form.medical_message"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <p class="m-alert-text">建议尺寸：x*xpx，大小在xmb以内，最多上传x张商品图片</p>
          <!--<el-dialog :visible.sync="dialogVisible">-->
          <!--<img width="100%" :src="dialogImageUrl" alt="">-->
          <!--</el-dialog>-->
        </el-form-item>


        <h3 class="m-form-part-title">
          <span class="m-part-title-icon"></span>
          <span>其他</span>
        </h3>
        <el-form-item label="使用人群："  prop="medical_for">
          <el-input v-model="form.medical_for"  class="m-input-s"></el-input>
        </el-form-item>
        <el-form-item label="体检方式："  prop="location_list">
          <el-select v-model="form.location_list" multiple placeholder="请选择">
            <el-option
              v-for="item in category"
              :key="item.location_id"
              :label="item.location_name"
              :value="item.location_id">
            </el-option>
          </el-select>
          <el-popover
            placement="right"
            width="450"
            trigger="manual"
            v-model="show_tab">
            <h3 class="m-flex-between">
              <span>编辑体检医院</span>
              <span @click="show_tab = false">X</span>
            </h3>
            <div style="margin: 20px 0;">
              <div class="m-category-content">
                <div class="m-scroll">
                  <div class="m-one-category"  :key="Math.random()">
                    <!--<div class="m-search-box">-->
                    <!--<span class="icon icon-search"></span>-->
                    <!--<input type="text" v-model="category_input[index]" placeholder=""  @change="changeInput(index)">-->
                    <!--</div>-->
                    <div class="m-add-box" @click="addTab(0)">
                      <span class="m-btn">
                        <svg-icon icon-class="icon-add" />
                        新增
                      </span>
                    </div>
                    <div class="m-classify">
                      <ul>
                        <template v-for="(item,i) in category">
                          <!--<template v-for="(itemss,i) in item">-->
                          <li  :key="Math.random()">
                            <span class="m-category-name">{{item.location_name}}</span>
                            <span class="m-edit-box" >
                              <span class="m-edit" @click.stop="editCate(item,0)">编辑</span>
                              <span class="m-edit m-delete" @click.stop="deleteCate(item,0)">删除</span>
                            </span>

                          </li>
                          <!--</template>-->
                        </template>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--<div class="m-modal-btn-box" style="text-align: center;">-->
            <!--<span class="m-btn active" @click="saveTab">保存</span>-->
            <!--<span class="m-btn " @click="show_tab = false">取消</span>-->
            <!--</div>-->
            <span class="m-add-text" slot="reference" @click="show_tab = !show_tab">+编辑体检医院</span>
          </el-popover>
        </el-form-item>
        <el-form-item label="" prop="location_list2">
          <el-select v-model="form.location_list2" multiple placeholder="请选择">
            <el-option
              v-for="item in category2"
              :key="item.location_id"
              :label="item.location_name"
              :value="item.location_id">
            </el-option>
          </el-select>
          <el-popover
            placement="right"
            width="450"
            trigger="manual"
            v-model="show_tab2">
            <h3 class="m-flex-between">
              <span>编辑直营门店</span>
              <span @click="show_tab2 = false">X</span>
            </h3>
            <div style="margin: 20px 0;">
              <div class="m-category-content">
                <div class="m-scroll">
                  <div class="m-one-category"  :key="Math.random()">
                    <!--<div class="m-search-box">-->
                    <!--<span class="icon icon-search"></span>-->
                    <!--<input type="text" v-model="category_input[index]" placeholder=""  @change="changeInput(index)">-->
                    <!--</div>-->
                    <div class="m-add-box" @click="addTab(1)">
                      <span class="m-btn">
                        <svg-icon icon-class="icon-add" />
                        新增
                      </span>
                    </div>
                    <div class="m-classify">
                      <ul>
                        <template v-for="(item,i) in category2">
                          <!--<template v-for="(itemss,i) in item">-->
                          <li  :key="Math.random()">
                            <span class="m-category-name">{{item.location_name}}</span>
                            <span class="m-edit-box" >
                              <span class="m-edit" @click.stop="editCate(item,1)">编辑</span>
                              <span class="m-edit m-delete" @click.stop="deleteCate(item,1)">删除</span>
                            </span>

                          </li>
                          <!--</template>-->
                        </template>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--<div class="m-modal-btn-box" style="text-align: center;">-->
            <!--<span class="m-btn active" @click="saveTab">保存</span>-->
            <!--<span class="m-btn " @click="show_tab = false">取消</span>-->
            <!--</div>-->
            <span class="m-add-text" slot="reference" @click="show_tab2 = !show_tab2">+编辑直营门店</span>
          </el-popover>

        </el-form-item>
      </el-form>
      <el-dialog
        title="编辑标签"
        :visible.sync="show_edit"
        width="30%">
        <el-input v-model="tabs_name" placeholder="请输入标签名称"></el-input>
        <span slot="footer" class="dialog-footer">
    <el-button @click="cancelTab">取 消</el-button>
    <el-button type="primary" @click="saveTab">确 定</el-button>
  </span>
      </el-dialog>
      <div class="m-form-btn-box m-flex-center">
        <span class="m-btn active" @click="submitSure">确定</span>
        <span class="m-btn cancel" @click="cancelClick"> 取消</span>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import api from '../../api/api';
    export default {
        data() {
            return {
              inputVisible: false,
              inputValue: '',
              nav_list:[],
              medical_id:'',
              form:{
                medical_name:'',
                medical_price:0,
                medical_pic:[],
                medical_for:'',
                medical_message:[],
                location_list2:[],
                location_list:[]
              },
              rules:{
                medical_name:[
                  { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                medical_message:[
                  { required: true, message: '请输入商品详情', trigger: 'blur' }
                ],
                medical_pic:[
                  { required: true, message: '请输入商品图片', trigger: 'blur' }
                ],
                medical_price:[
                  { required: true, message: '请输入商品价格', trigger: 'blur' }
                ],
                medical_for:[
                  { required: true, message: '请输入使用人群', trigger: 'blur' }
                ],
                location_list:[
                  { required: true, message: '请选择医院', trigger: 'blur' }
                ],
                location_list2:[
                  { required: true, message: '请选择门店', trigger: 'blur' }
                ]
              },
              show_tab:false,
              show_tab2:false,
              tab:0,
              tabs_name:'',
              tabs_id:'',
              imageUrl:'',
              dialogVisible:false,
              category_list:[],
              show_edit:false,
              category:[],
              category2:[],
              select_category:[],
              show_gui:false,
              props: {
                label: 'tabs_name',
                children: 'children',
                value:'tabs_id'
              },

            }
        },
        components: {
        },
      inject: ['reload'],
      computed: {
      },
        mounted(){
          // this.getTab();
          if(this.$route.query.medical_id){
            this.getProduct();
          }
          this.getLog(0);
          this.getLog(1)
        },
        methods: {
          //获取商品详情
          getProduct(){
            axios.get(api.get_medical_message,{
              params:{
                medical_id:this.$route.query.medical_id
              }
            }).then(res => {
                if(res.data.status == 200){
                  let _product = res.data.data;
                  this.medical_id = _product.medical_id;
                  this.form ={
                    medical_name: _product.medical_name,
                    medical_price:_product.medical_price,
                    medical_pic:[].concat(_product.medical_pic),
                    medical_for: _product.medical_for,
                    medical_message:[].concat(_product.medical_message),
                    location_list:[].concat(_product.location_list),
                    location_list2:[].concat(_product.location_list2)
                  }
                  let arr = [];
                  for(let i=0;i<_product.medical_message.length;i++){
                    arr.push({name:_product.medical_message[i],url:_product.medical_message[i]});
                  }
                  this.form.medical_message = [].concat(arr);
                }
              }
            )
          },
          //获取标签
          getLog(type){
            axios.get(api.get_location,{
              params:{
                location_type:type,
                medical_id:''
              }
            }).then(res => {
              if(res.data.status == 200){
                if(type == 1){
                  this.category2 = [].concat(res.data.data);
                }else{
                  this.category = [].concat(res.data.data);
                }
              }
            })
          },
          //addTab
          addTab(type){
            this.show_edit = true;
            this.tab = type;
          },
          //保存标签
          saveTab(){
            if(!this.tabs_name){
              return false;
            }
            if(this.tabs_id){
              axios.post(api.update_location + '?location_id='+this.tabs_id,{
                location_name:this.tabs_name,
                location_type:this.tab
              }).then(res => {
                if(res.data.status == 200){
                  this.$notify.success(res.data.message);
                  this.getLog(this.tab);
                  this.show_edit = false;
                  this.tabs_name = '';
                  this.tabs_id = '';
                }else{
                  this.$message({
                    message: res.data.message,
                    duration:1000,
                    type: 'error'
                  });
                }
              })
            }else{
              axios.post(api.new_location,{
                location_name:this.tabs_name,
                location_type:this.tab
              }).then(res => {
                if(res.data.status == 200){
                  this.$notify.success(res.data.message);
                  this.getLog(this.tab);
                  this.show_edit = false;
                  this.tabs_name = '';
                }else{
                  this.$message({
                    message: res.data.message,
                    duration:1000,
                    type: 'error'
                  });
                }
              })
            }

          },
          //取消
          cancelTab(){
            this.show_edit = false;
            this.tabs_name = '';
            this.sku_value = [];
            this.tabs_id = '';
          },
          //编辑类目
          editCate(item,i){
            this.show_edit = true;
            this.tab = i;
            this.tabs_name = item.location_name;
            this.tabs_id = item.location_id;
          },
          /**/
          deleteCate(item,i){
            this.$confirm('确认要删除这个标签吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              axios.get(api.delete_location,{
                params:{
                  location_id: item.location_id
                }
              }).then(res => {
                if(res.data.status == 200){
                  this.$notify.success(res.data.message);
                  this.getLog(i);
                }else{
                  this.$message({
                    message: res.data.message,
                    duration:1000,
                    type: 'error'
                  });
                }
              })
            }).catch(() => {
            });
          },

          /*商品主图片删除*/
          imgRemoveMain(index){
            let arr = [].concat(this.form.medical_pic);
            arr.splice(index,1);
            this.form.medical_pic = [].concat(arr);
            var file = document.getElementById('main');
            file.value ='';
          },
          /*商品主图片大图显示*/
          CardPreviewMain(index){
            this.imageUrl =  this.form.medical_pic[index];
            this.dialogVisible = true;
          },
          /*商品主图片上传重定向*/
          imgUploadDetailMain(event,index){
            if(this.form.medical_pic.length > 4){
              this.$message({
                type:'warning',
                message:'一个类型只能上传5张照片'
              });
              return false;
            }
            let form = new FormData();
            form.append("file", event.target.files[0]);
            form.append("FileType", 'medical_pic');
            axios.post(api.upload_files ,form).then(res => {
              if(res.data.status == 200){
                this.form.medical_pic.push(res.data.data);
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
          handleRemove(file, fileList) {
            this.form.medical_message = fileList;
          },
          handlePictureCardPreview(file) {
            this.imageUrl = file.url;
            this.dialogVisible = true;
          },
          changeRoute(v){
            if(v == '-1'){
              this.$router.go(-1)
            }else{
              let that = this;

              this.$refs['form'].validate((valid) => {
                if (valid) {
                  for(let i = 0;i<that.form.skus.length;i++){
                    for(let key in that.form.skus[i]){
                      if(!that.form.skus[i][key]){
                        this.$message({
                          type:'warning',
                          duration:800,
                          message:'请先设置商品具体属性'
                        });
                        return false;
                      }
                    }
                  }
                  let arr = [];
                  for(let i = 0;i<that.form.images.length;i++){
                   arr.push({pipic:that.form.images[i],pisort:i})
                  }
                  let _form  = JSON.parse(JSON.stringify(this.form));
                  _form.pskuvalue = [].concat(that.sku_list);
                  _form.images = [].concat(arr);
                  this.$router.push({path:v,query:{form:Object.assign(_form,that.$route.query.form)}})
                }
              })

            }
          },
          /*商品样式图片删除*/
          imgRemove(index){
            this.form.sku_list[index].sku_pic = '';
            var file = document.getElementById(index);
            file.value ='';
          },
          /*商品样式图片大图显示*/
          CardPreview(index){
            this.imageUrl =  this.form.sku_list[index].sku_pic;
            this.dialogVisible = true;
          },
          /*商品样式图片上传重定向*/
          imgUploadDetail(event){
            let form = new FormData();
            form.append("file",event.file );
            form.append("FileType", 'medical_piclong');
            axios.post(api.upload_files,form).then(res => {
              if(res.data.status == 200){
                this.form.medical_message.push({name:res.data.data,url:res.data.data});
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
          cancelClick(){
            this.reload();
          },
          submitSure(){
            // let str = '[';
            // let _form = JSON.parse(JSON.stringify(this.form))
            // for(let i=0;i<_form.sku_list.length;i++){
            //   _form.sku_list[i].sku_detail = str + _form.sku_list[i].sku_detail.toString() + ']'
            // }
            let arr = [];
            for(let i=0;i<this.form.medical_message.length;i++){
              if(this.form.medical_message[i].uid){
                arr.push(this.form.medical_message[i].url)
              }else{
                arr.push(this.form.medical_message[i]);
              }
            }
            this.form.medical_message = [].concat(arr);
            // console.log(_form);
            // return false;
            let that = this,_form=null;
            this.$refs['form'].validate((valid) => {
              if (valid) {
                _form = that.form;
                if(this.medical_id){
                  axios.post(api.update_medical + '?medical_id='+that.medical_id,_form).then(res => {
                    if(res.data.status == 200){
                      this.$notify.success(res.data.message);
                      this.$router.push('/product/examination');
                    }else{
                      this.$message({
                        type: 'error',
                        message: res.data.message
                      });
                    }
                  })
                }else{
                  axios.post(api.new_medical,_form).then(res => {
                    if(res.data.status == 200){
                      this.$notify.success(res.data.message);
                      this.$router.push('/product/examination');
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
          }
        },
        created() {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .m-addProduct{

    .m-form-part-title{
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 20px;
      .m-part-title-icon{
        display: inline-block;
        width: 20px;
        height: 20px;
        /*background: url("../../common/images/icon-title-child.png") no-repeat;*/
        background-size: 100% 100%;
        vertical-align: text-bottom;
        margin-right: 10px;
      }
    }
    .m-form-btn-box{
      margin-top: 160px;
    }
    .m-inline-block{
      display: inline-block;
    }
    .m-search-box{
     padding-top: 0;
    }
    .m-different-price-box{
      padding: 0 0 20px 0;
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
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
      &.m-img-l{
        width: 110px;
        height: 110px;
        line-height: 110px;
        input{
          width: 110px;
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
      width: 120px;
      height: 120px;
      line-height: 120px;
      cursor: pointer;
    }
    .m-alert-text {
      color: #999999;
      font-size: 12px;
    }
    .m-add-text{
      color: #409EFF;
      text-decoration: underline;
    }
  }
</style>
