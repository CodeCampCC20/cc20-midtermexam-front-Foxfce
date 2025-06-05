import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(persist((set) => ({
  token: '',

  actionGetToken: (token)=>{
    set ({token});
  }

}), {
  name: "token-store"
}))

export default useAuthStore
