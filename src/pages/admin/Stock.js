// src/pages/admin/Stock.js
/* import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import AdminLayout from "./AdminLayout";

function Stock() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", quantity: 0 });
    const threshold = 5;

    const updateTimers = useRef({});

    useEffect(() => {
        fetchStock();
    }, []);

    const fetchStock = async () => {
        const snapshot = await getDocs(collection(db, "stock"));
        setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

    };

    const addItem = async () => {
        await addDoc(collection(db, "stock"), newItem);
        setNewItem({ name: "", quantity: 0 });
        fetchStock();
    };

    const updateQuantity = (id, quantity) => {
        if (updateTimers.current[id]) {
            clearTimeout(updateTimers.current[id]);
        }

        updateTimers.current[id] = setTimeout(async () => {
            await updateDoc(doc(db, "stock", id), { quantity });
            fetchStock();
            delete updateTimers.current[id];
        }, 300); 
    };


    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-4">Stock Tracking</h2>
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Item name"
                    className="border p-2"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    className="border p-2"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                />
                <button onClick={addItem} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add
                </button>
            </div>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Item</th>
                        <th className="p-2 border">Quantity</th>
                        <th className="p-2 border">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="text-center">
                            <td className={`p-2 border font-bold  ${item.quantity < threshold ? "text-red-600" : ""}`}>{item.name}</td>
                            <td className={`p-2 border font-bold  ${item.quantity < threshold ? "text-red-600" : ""}`}>{item.quantity}</td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => {
                                        updateQuantity(item.id, item.quantity + 1)
                                        setItems(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
                                    }
                                    }
                                    className="px-2 bg-green-500 text-white rounded"
                                >
                                    +1
                                </button>
                                <button
                                    onClick={() => {
                                        updateQuantity(item.id, item.quantity - 1)
                                        setItems(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
                                    }}
                                    className="px-2 ml-2 bg-red-500 text-white rounded"
                                >
                                    -1
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
}

export default Stock;
*/


// src/pages/admin/Stock.js
/* import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import AdminLayout from "./AdminLayout";

function Stock() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", quantity: 0 });
    const threshold = 5;

    const updateTimers = useRef({});

    useEffect(() => {
        fetchStock();
    }, []);

    const fetchStock = async () => {
        const snapshot = await getDocs(collection(db, "stock"));
        setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const addItem = async () => {
        await addDoc(collection(db, "stock"), newItem);
        setNewItem({ name: "", quantity: 0 });
        fetchStock();
    };

    const updateQuantity = (id, quantity) => {
        if (updateTimers.current[id]) {
            clearTimeout(updateTimers.current[id]);
        }

        updateTimers.current[id] = setTimeout(async () => {
            await updateDoc(doc(db, "stock", id), { quantity });
            fetchStock();
            delete updateTimers.current[id];
        }, 300);
    };

    const deleteItem = async (id, name) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
        if (!confirmDelete) return;

        await deleteDoc(doc(db, "stock", id));
        setItems(items.filter((item) => item.id !== id)); // update UI without refetch
    };

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-4">Stock Tracking</h2>
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Item name"
                    className="border p-2"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    className="border p-2"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                />
                <button onClick={addItem} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add
                </button>
            </div>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Item</th>
                        <th className="p-2 border">Quantity</th>
                        <th className="p-2 border">Update</th>
                        <th className="p-2 border">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="text-center">
                            <td className={`p-2 border font-bold ${item.quantity < threshold ? "text-red-600" : ""}`}>
                                {item.name}
                            </td>
                            <td className={`p-2 border font-bold ${item.quantity < threshold ? "text-red-600" : ""}`}>
                                {item.quantity}
                            </td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => {
                                        updateQuantity(item.id, item.quantity + 1);
                                        setItems(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
                                    }}
                                    className="px-2 bg-green-500 text-white rounded"
                                >
                                    +1
                                </button>
                                <button
                                    onClick={() => {
                                        updateQuantity(item.id, item.quantity - 1);
                                        setItems(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i));
                                    }}
                                    className="px-2 ml-2 bg-red-500 text-white rounded"
                                >
                                    -1
                                </button>
                            </td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => deleteItem(item.id, item.name)}
                                    className="px-2 bg-red-600 text-white rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
}

export default Stock; */


// src/pages/admin/Stock.js
import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import AdminLayout from "./AdminLayout";

function Stock() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", quantity: 0 });
    const threshold = 5;

    const updateTimers = useRef({});

    useEffect(() => {
        fetchStock();
    }, []);

    const fetchStock = async () => {
        const snapshot = await getDocs(collection(db, "stock"));
        setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const addItem = async () => {
        if (!newItem.name.trim()) return;
        await addDoc(collection(db, "stock"), newItem);
        setNewItem({ name: "", quantity: 0 });
        fetchStock();
    };

    const updateQuantity = (id, quantity) => {
        if (updateTimers.current[id]) {
            clearTimeout(updateTimers.current[id]);
        }

        updateTimers.current[id] = setTimeout(async () => {
            await updateDoc(doc(db, "stock", id), { quantity });
            fetchStock();
            delete updateTimers.current[id];
        }, 300);
    };

    const deleteItem = async (id, name) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
        if (!confirmDelete) return;

        await deleteDoc(doc(db, "stock", id));
        setItems(items.filter((item) => item.id !== id));
    };

    // Find low stock items
    const lowStockItems = items.filter(item => item.quantity < threshold);

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-4">Stock Tracking</h2>

            {/* Low Stock Alert Section */}
            {lowStockItems.length > 0 && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <strong>⚠ Low Stock Alert!</strong>
                    <ul className="list-disc list-inside mt-2">
                        {lowStockItems.map(item => (
                            <li key={item.id}>
                                {item.name} (Only {item.quantity} left)
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Add Item Section */}
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Item name"
                    className="border p-2"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    className="border p-2"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                />
                <button onClick={addItem} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add
                </button>
            </div>

            {/* Stock Table */}
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Item</th>
                        <th className="p-2 border">Quantity</th>
                        <th className="p-2 border">Update</th>
                        <th className="p-2 border">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="text-center">
                            <td className={`p-2 border font-bold ${item.quantity < threshold ? "text-red-600" : ""}`}>
                                {item.name}
                            </td>
                            <td className={`p-2 border font-bold ${item.quantity < threshold ? "text-red-600" : ""}`}>
                                {item.quantity}
                            </td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => {
                                        updateQuantity(item.id, item.quantity + 1);
                                        setItems(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
                                    }}
                                    className="px-2 bg-green-500 text-white rounded"
                                >
                                    +1
                                </button>
                                <button
                                    onClick={() => {
                                        updateQuantity(item.id, item.quantity - 1);
                                        setItems(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i));
                                    }}
                                    className="px-2 ml-2 bg-red-500 text-white rounded"
                                >
                                    -1
                                </button>
                            </td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => deleteItem(item.id, item.name)}
                                    className="px-2 bg-red-600 text-white rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
}

export default Stock;


