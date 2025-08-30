import AdminLayout from "./AdminLayout";
import { useEffect, useState, useCallback } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

function Dashboard() {
    const [usageData, setUsageData] = useState([]);
    const [purchaseVsUsage, setPurchaseVsUsage] = useState([]);
    const [stockLevels, setStockLevels] = useState([]);
    const [supplierData, setSupplierData] = useState([]);
    const [filter, setFilter] = useState("daily"); // daily/weekly/monthly
    const [logs, setLogs] = useState([]); // store all logs
    const [stockMap, setStockMap] = useState({}); // id => name map for stock items

    const applyFilter = useCallback(
        () => {
            const now = new Date();
            let filteredLogs = [...logs];

            if (filter === "daily") {
                filteredLogs = logs.filter((log) => {
                    const logDate = log.date?.toDate ? log.date.toDate() : new Date(log.date);
                    return logDate.toDateString() === now.toDateString();
                });
            } else if (filter === "weekly") {
                const weekAgo = new Date();
                weekAgo.setDate(now.getDate() - 7);
                filteredLogs = logs.filter((log) => {
                    const logDate = log.date?.toDate ? log.date.toDate() : new Date(log.date);
                    return logDate >= weekAgo && logDate <= now;
                });
            } else if (filter === "monthly") {
                const monthAgo = new Date();
                monthAgo.setMonth(now.getMonth() - 1);
                filteredLogs = logs.filter((log) => {
                    const logDate = log.date?.toDate ? log.date.toDate() : new Date(log.date);
                    return logDate >= monthAgo && logDate <= now;
                });
            }

            // --- 1. Usage per item ---
            const usageAgg = filteredLogs.reduce((acc, log) => {
                console.log(stockMap)
                console.log(log.item)
                console.log(typeof log.item); // should be "string"

                console.log(stockMap[log.item])
                console.log("log.item length:", log.item.length);
                const arr = Object.keys(stockMap);
                console.log("stockMap length:", arr);


                const itemName = stockMap[log.item] || log.item;
                if (log.type === "usage") {
                    acc[itemName] = (acc[itemName] || 0) + log.quantity;
                }
                return acc;
            }, {});
            setUsageData(Object.entries(usageAgg).map(([item, qty]) => ({ item, qty })));

            // --- 2. Purchase vs Usage per item ---
            const pvuAgg = filteredLogs.reduce((acc, log) => {
                const itemName = stockMap[log.item] || log.item;
                if (!acc[log.item]) acc[log.item] = { item: itemName, purchased: 0, used: 0 };
                if (log.type === "purchase") acc[log.item].purchased += log.quantity;
                if (log.type === "usage") acc[log.item].used += log.quantity;
                return acc;
            }, {});
            setPurchaseVsUsage(Object.values(pvuAgg));

            // --- 3. Supplier Contribution ---
            const supplierAgg = filteredLogs.reduce((acc, log) => {
                if (log.type === "purchase") {
                    acc[log.supplier] = (acc[log.supplier] || 0) + log.quantity;
                }
                return acc;
            }, {});
            setSupplierData(Object.entries(supplierAgg).map(([supplier, value]) => ({ name: supplier, value })));
        }, [filter, logs, stockMap]

    )
    useEffect(() => {
        fetchReports();
    }, []);

    useEffect(() => {
        if (logs.length) applyFilter();
    }, [filter, logs, stockMap, applyFilter]);

    const fetchReports = async () => {
        // Fetch logs
        const logSnap = await getDocs(collection(db, "logs"));
        const fetchedLogs = logSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setLogs(fetchedLogs);

        // Fetch stock
        const stockSnap = await getDocs(collection(db, "stock"));
        const stock = stockSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const stockMapTemp = {}
        stockSnap.forEach((doc) => {
            stockMapTemp[doc.id] = doc.data().name;
        });

        setStockMap(stockMapTemp);



        // Stock levels snapshot (independent of logs)
        setStockLevels(stock.map((s) => ({ name: s.name, value: s.quantity })));
    };


    const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];

    return (
        <AdminLayout>
            {/* --- Filter --- */}
            <div className="mb-4">
                <label className="mr-2 font-semibold">Show data for:</label>
                <select
                    className="border px-3 py-1 rounded"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Usage Report */}
                <div className="w-full h-80 bg-white p-4 rounded-xl shadow">
                    <h3 className="font-semibold mb-2">Top Items Usage</h3>
                    <ResponsiveContainer>
                        <BarChart data={usageData}>
                            <XAxis dataKey="item" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="qty" fill="#3B82F6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Purchase vs Usage */}
                <div className="w-full h-80 bg-white p-4 rounded-xl shadow">
                    <h3 className="font-semibold mb-2">Purchase vs Usage</h3>
                    <ResponsiveContainer>
                        <BarChart data={purchaseVsUsage}>
                            <XAxis dataKey="item" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="purchased" fill="#10B981" />
                            <Bar dataKey="used" fill="#EF4444" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Stock Levels Snapshot */}
                <div className="w-full h-80 bg-white p-4 rounded-xl shadow">
                    <h3 className="font-semibold mb-2">Stock Levels Snapshot</h3>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={stockLevels}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                                dataKey="value"
                            >
                                {stockLevels.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Supplier Contribution */}
                <div className="w-full h-80 bg-white p-4 rounded-xl shadow">
                    <h3 className="font-semibold mb-2">Supplier Contribution</h3>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={supplierData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {supplierData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Dashboard;

