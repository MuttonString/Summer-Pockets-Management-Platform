export const getTime = () => {
    const hours = new Date().getHours();
    return hours <= 11 ? '上午' : hours <= 16 ? '下午' : '晚上';
};
