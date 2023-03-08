import axios from "axios";
import { useState, useEffect } from "react";
const ProfileHistory = () => {
  const [foodHistory, setFoodHistory] = useState([]);
  useEffect(() => {
    async function getHistory() {
      const foodHistoryData = await axios.get("/api/foodList");
      setFoodHistory(foodHistoryData);
    }
    getHistory();
  }, []);

  console.log("foodHistory");
  return (
    <>
      <div className="m-5 text-lg">ProfileHistory</div>
      <table className="table-auto rounded-md bg-slate-50">
        <thead>
          <tr>
            <th>FoodList</th>
            <th>Creation date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

// export async function getServerSideProps() {
//   const foodHistory = axios.get("/api/foodList");
//   console.log(foodHistory);
//   return {
//     props: {
//       foodHistory: foodHistory,
//     },
//   };
// }
export default ProfileHistory;
