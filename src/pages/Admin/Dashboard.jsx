import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import InfoCard from '../../components/Cards/InfoCard';
import { addThousandsSeparator } from '../../utils/helper';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../components/layouts/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';
const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const Dashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [dashboardData,setDashboardData]=useState(null)
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;
    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ]
    setPieChartData(taskDistributionData);

    const PriorityLevelData = [
      {priority: "Low", count: taskPriorityLevels?.Low || 0},
      {priority: "Medium", count: taskPriorityLevels?.Medium || 0},
      {priority: "High", count: taskPriorityLevels?.High || 0},
    ]
    setBarChartData(PriorityLevelData);
  }

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);

      }
    } catch (error) {
      console.log("Error fetching users",error)
    }
  }

  const onSeeMore = () => {
    navigate("/admin/tasks");
  }
  useEffect(() => {
    getDashboardData();
    return () => {};
  }, []);


  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Header Section */}
      <div className="card my-4 px-4 py-5">
        <h2 className="text-xl md:text-2xl font-semibold">
          Hello, {user?.name} 👋
        </h2>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          {moment().format("dddd, Do MMM YYYY")}
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-primary"
          />
          <InfoCard
            label="Pending"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-violet-500"
          />
          <InfoCard
            label="In Progress"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color="bg-cyan-500"
          />
          <InfoCard
            label="Completed"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 my-4">
        {/* Pie Chart */}
        <div className="card px-4 py-5">
          <h5 className="font-medium mb-4">Task Distribution</h5>
          <CustomPieChart
            data={pieChartData}
            label="Task Balance"
            colors={COLORS}
          />
        </div>

        {/* Bar Chart */}
        <div className="card px-4 py-5">
          <h5 className="font-medium mb-4">Task Priority Level</h5>
          <CustomBarChart data={barChartData} label="Task Balance" />
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="card px-4 py-5 mb-10">
        <div className="flex items-center justify-between">
          <h5 className="text-lg font-semibold">Recent Tasks</h5>
          <button className="card-btn" onClick={onSeeMore}>
            See All <LuArrowRight className="text-base ml-1" />
          </button>
        </div>

        <TaskListTable tableData={dashboardData?.recentTasks || []} />
      </div>
    </DashboardLayout>
  );

}

export default Dashboard