import axios from 'src/utils/myAxios';
import api from 'src/api/api'

export const login = (username, password) => axios(api.login, {
  noLoading: true,
  method: 'post',
  data: {
    admin_idno: username,
    admin_password: password
  },
});
