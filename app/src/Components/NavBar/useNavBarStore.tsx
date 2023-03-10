import { create } from 'zustand';

type AppState = {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
};

const useNavBarStore = create<AppState>(set => ({
  isDropdownOpen: false,
  toggleDropdown: () =>
    set(state => ({ isDropdownOpen: !state.isDropdownOpen })),
}));

export default useNavBarStore;
