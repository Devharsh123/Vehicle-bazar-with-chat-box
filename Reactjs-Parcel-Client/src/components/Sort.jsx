const Sort = ({ onPurchaseModeChange }) => {
  const handleChange = (e) => {
    e.preventDefault();
    onPurchaseModeChange(e.target.value);
  };
  return (
    <form class="">
      <select
        onChange={(e) => handleChange(e)}
        id="purchaseMode"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Choose Purchase Mode</option>
        <option value="TOBUY">TO BUY</option>
        <option value="TORENT">TO RENT</option>
      </select>
    </form>
  );
};

export default Sort;
