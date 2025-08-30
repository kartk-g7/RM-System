// src/pages/admin/Suppliers.js
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import AdminLayout from "./AdminLayout";

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({ name: "", contact: "" });

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        const snapshot = await getDocs(collection(db, "suppliers"));
        setSuppliers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const addSupplier = async () => {
        await addDoc(collection(db, "suppliers"), newSupplier);
        setNewSupplier({ name: "", contact: "" });
        fetchSuppliers();
    };

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-4">Suppliers</h2>
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Supplier name"
                    className="border p-2"
                    value={newSupplier.name}
                    onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Contact info"
                    className="border p-2"
                    value={newSupplier.contact}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                />
                <button onClick={addSupplier} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add
                </button>
            </div>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2 text-left">Supplier Name</th>
                        <th className="border px-4 py-2 text-left">Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((s) => (
                        <tr key={s.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{s.name}</td>
                            <td className="border px-4 py-2">{s.contact || "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </AdminLayout>
    );
}

export default Suppliers;
