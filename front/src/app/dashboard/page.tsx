"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/helpers/fetchAuth";
import { fetchOrders } from "@/helpers/fetchOrders";

const Dashboard = () => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  //  evitar hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    //  proteger ruta
    if (!isAuthenticated()) {
      router.push("/auth");
      return;
    }

    //  obtener usuario
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    //  obtener compras
    fetchOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, [mounted]);

  if (!mounted) return null;

  if (loading) {
    return <p className="text-center py-10">Cargando dashboard...</p>;
  }

  return (
    <div className="px-8 py-10 max-w-5xl mx-auto">
      {/*  DATOS DEL USUARIO */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold mb-4">Mi cuenta</h1>

        {user && (
          <div className="bg-white border rounded-xl p-4">
            <p>
              <strong>Nombre:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Dirección:</strong> {user.address}
            </p>
          </div>
        )}
      </div>

      {/*  COMPRAS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Mis compras</h2>

        {orders.length === 0 ? (
          <p className="text-[#6E6E73]">No has realizado compras aún.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order: any) => (
              <div key={order.id} className="border rounded-lg p-4 bg-white">
                <p>
                  <strong>Compra #{order.id}</strong>
                </p>
                <p>Total: ${order.total}</p>
                <p>Fecha: {order.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
