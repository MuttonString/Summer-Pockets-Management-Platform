import { defineStore } from 'pinia';

const useLayoutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false,
            refresh: false,
            showCrud: false,
            changeDisabled: true,
            selectedRowsCnt: 0
        };
    }
});

export default useLayoutSettingStore;