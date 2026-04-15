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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!isAuthenticated()) {
      router.push("/auth");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, [mounted]);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="text-center py-20 text-[#6E6E73]">
        Cargando dashboard...
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 py-8 md:py-10 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#1D1D1F]">
          Mi cuenta
        </h1>
        <p className="text-sm text-[#6E6E73] mt-1">
          Gestiona tu información y revisa tus compras
        </p>
      </div>

      {/* USER CARD */}
      {user && (
        <div className="bg-white border border-[#E8E8ED] rounded-2xl p-5 md:p-6 mb-10 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-lg font-semibold">
              {user.name?.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-semibold text-[#1D1D1F]">
                {user.name}
              </h2>
              <p className="text-sm text-[#6E6E73]">{user.email}</p>
              <p className="text-sm text-[#6E6E73]">{user.address}</p>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#1D1D1F]">
          Mis compras
        </h2>

        {orders.length === 0 ? (
          <p className="text-[#6E6E73] text-sm">
            No has realizado compras aún.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="bg-white border border-[#E8E8ED] rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="font-semibold text-[#1D1D1F] text-sm md:text-base">
                    Compra #{order.id}
                  </p>
                  <p className="text-xs md:text-sm text-[#6E6E73]">
                    Fecha: {order.date}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-[#0071E3] font-semibold text-sm md:text-base">
                    ${order.total}
                  </span>

                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-md">
                    Completado
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
