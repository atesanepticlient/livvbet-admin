// import { INTERNAL_SERVER_ERROR } from "@/error";
// import { db } from "@/lib/db";

// export const GET = async () => {
//   try {
//     const metrics = [];

//     const totalDeposit =
//       (
//         await db.deposit.aggregate({
//           where: { status: "ACCEPTED" },
//           _sum: { amount: true },
//         })
//       )._sum.amount || 0;

//     const currentMonthDeposit =
//       (
//         await db.deposit.aggregate({
//           where: {
//             status: "ACCEPTED",
//             createdAt: {
//               gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of this month
//             },
//           },
//           _sum: { amount: true },
//         })
//       )._sum.amount || 0;

//     const lastMonthDeposit =
//       (
//         await db.deposit.aggregate({
//           where: {
//             status: "ACCEPTED",
//             createdAt: {
//               gte: new Date(
//                 new Date().getFullYear(),
//                 new Date().getMonth() - 1,
//                 1
//               ), // Start of last month
//               lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of this month
//             },
//           },
//           _sum: { amount: true },
//         })
//       )._sum.amount || 0;

//     const percentageChange = lastMonthDeposit
//       ? ((currentMonthDeposit - lastMonthDeposit) / lastMonthDeposit) * 100
//       : currentMonthDeposit > 0
//       ? 100
//       : 0;

//     metrics.push({
//       title: "Total Deposits",
//       value: `$${totalDeposit}`,
//       change: percentageChange,
//       message: "from the last month",
//     });

//     const totalPayouts =
//       (
//         await db.withdraw.aggregate({
//           where: { status: "ACCEPTED" },
//           _sum: { amount: true },
//         })
//       )._sum.amount || 0;

//     const currentMonthPayouts =
//       (
//         await db.withdraw.aggregate({
//           where: {
//             status: "ACCEPTED",
//             createdAt: {
//               gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of this month
//             },
//           },
//           _sum: { amount: true },
//         })
//       )._sum.amount || 0;

//     const lastMonthPayouts =
//       (
//         await db.withdraw.aggregate({
//           where: {
//             status: "ACCEPTED",
//             createdAt: {
//               gte: new Date(
//                 new Date().getFullYear(),
//                 new Date().getMonth() - 1,
//                 1
//               ), // Start of last month
//               lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of this month
//             },
//           },
//           _sum: { amount: true },
//         })
//       )._sum.amount || 0;

//     const payoutPercentageChange = lastMonthPayouts
//       ? ((currentMonthPayouts - lastMonthPayouts) / lastMonthPayouts) * 100
//       : currentMonthPayouts > 0
//       ? 100
//       : 0;

//     metrics.push({
//       title: "Total Payouts",
//       value: `$${totalPayouts}`,
//       change: payoutPercentageChange,
//       message: "from the last month",
//     });

//     const totalActiveUsers = await db.users.count({
//       where: { isBanned: false },
//     });

//     const currentMonthActiveUsers = await db.users.count({
//       where: {
//         isBanned: false,
//         createdAt: {
//           gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of this month
//         },
//       },
//     });
//     const lastMonthActiveUsers = await db.users.count({
//       where: {
//         isBanned: false,
//         createdAt: {
//           gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), // Start of last month
//           lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of this month
//         },
//       },
//     });

//     const activeUsersPercentageChange = lastMonthActiveUsers
//       ? ((currentMonthActiveUsers - lastMonthActiveUsers) /
//           lastMonthActiveUsers) *
//         100
//       : currentMonthActiveUsers > 0
//       ? 100
//       : 0;

//     metrics.push({
//       title: "Active Users",
//       value: `+${totalActiveUsers}`,
//       change: activeUsersPercentageChange,
//       message: "from the last month",
//     });

//     const totalAgents = await db.agent.count({ where: { isVerified: true } });
//     const currentMonthAgents = await db.agent.count({
//       where: {
//         isVerified: true,
//         createdAt: {
//           gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of this month
//         },
//       },
//     });
//     const lastMonthAgents = await db.agent.count({
//       where: {
//         isVerified: true,
//         createdAt: {
//           gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), // Start of last month
//           lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of this month
//         },
//       },
//     });

//     const agentsPercentageChange = lastMonthAgents
//       ? ((currentMonthAgents - lastMonthAgents) / lastMonthAgents) * 100
//       : currentMonthAgents > 0
//       ? 100
//       : 0;

//     metrics.push({
//       title: "Active Agents",
//       value: `+${totalAgents}`,
//       change: agentsPercentageChange,
//       message: "from the last month",
//     });

//     return Response.json({ payload: metrics }, { status: 200 });
//   } catch {
//     return Response.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
//   }
// };

export const GET = ()=>{
  return Response.json({message : "GET"})
}