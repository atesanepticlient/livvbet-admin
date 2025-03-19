import { create } from "zustand";

interface UserFilterProps {
  search: string;
  userType: string;

  setSearch: (search: string) => void;
  setUserType: (userType: string) => void;
}
export const useUserFilter = create<UserFilterProps>((set) => ({
  search: "",
  userType: "all",

  setSearch: (search) => set((state) => ({ ...state, search })),
  setUserType: (userType) => set((state) => ({ ...state, userType })),
}));
