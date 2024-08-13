const checkNull = (ref) => {
  if (ref.current.value != null && ref.current.value != "") {
    resetField(ref);
    return true;
  } else {
    setError(ref);
    return false;
  }
};
const resetField = (ref) => {
  ref.current.className =
    "block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1";
};
const setError = (ref) => {
  ref.current.className =
    "block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 border-red-600 dark:bg-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:shadow-outline-red dark:focus:shadow-outline-red mt-1";
};
export default checkNull;
export const disableRightBtn = (ref)=>{
    ref.current.className = "absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white "+
    " transition-colors duration-150 bg-purple-600 opacity-50 border border-transparent rounded-r-md "+
    "  focus:outline-none cursor-not-allowed "
}
export const enableRightBtn = (ref)=>{
    ref.current.className = "absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white "+
    " transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 "+
    "  hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
}