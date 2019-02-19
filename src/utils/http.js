import tip from './tip'
import Promise from 'promise';
 const wxRequest = (options,url,method) => {
     tip.loading();
     return new Promise( (resolve, reject) => {
         let params = {
             url,
             method,
             success(res){
                 console.log(res);
                 tip.loaded();
                 resolve(res)
             },
             fail(err){
                 tip.loaded();
                 reject(err)
             }
         };
         if(options) params = Object.assign(params,options);
         wx.request(params);
     })
}
module.exports = {
    wxRequest
}