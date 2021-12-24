import axios from 'axios'
import store from '@/store/store'
import EventBus from '@/EventBus'


export default () => {

  var instance = axios.create({
    baseURL: "http://localhost:8081/",
    headers: {
      Authorization: `${store.state.token}`,
    }
  });


  instance.interceptors.response.use(response => {
    return response;
  }, err => {
    EventBus.$emit("nofication", {
      message: err.response.data,
      status: "error",
    });


    return Promise.reject(err);

  })




  return instance;
}