import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: '',

  actionGetToken: (token)=>{
    set ({token});
  }

}))

export default useAuthStore
