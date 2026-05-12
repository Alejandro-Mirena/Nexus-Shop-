"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/helpers/fetchAuth";
import { fetchOrders } from "@/helpers/fetchOrders";
import { ChevronDown, ShoppingBag } from "lucide-react";

// ─── Types ────────────────────────────────────────────────
interface IUser {
  name: string;
  email: string;
  address?: string;
}

// IOrder
interface IOrder {
  id: number;
  date: string;
  total: number;
  status?: "completed" | "pending" | "cancelled";
  orderDetails?: IOrderDetail[];
}

interface IOrderDetail {
  id: number;
  quantity: number;
  unitPrice: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

// ─── Helpers ──────────────────────────────────────────────
const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const statusMap: Record<string, { label: string; className: string }> = {
  completed: { label: "Completado", className: "bg-green-100 text-green-600" },
  pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-600" },
  cancelled: { label: "Cancelado", className: "bg-red-100 text-red-500" },
};

// ─── Component ────────────────────────────────────────────
const Dashboard = () => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [openOrder, setOpenOrder] = useState<number | null>(null);

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    router.push("/");
  };

  const toggleOrder = (id: number) => {
    setOpenOrder((prev) => (prev === id ? null : id));
  };

  const totalSpent = orders.reduce((acc, o) => acc + Number(o.total), 0);

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
        <div className="bg-white border border-[#E8E8ED] rounded-2xl p-5 md:p-6 mb-6 shadow-sm ">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-lg font-semibold shrink-0">
              {getInitials(user.name)}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-semibold text-[#1D1D1F]">
                {user.name}
              </h2>
              <p className="text-sm text-[#6E6E73]">{user.email}</p>
              {user.address && (
                <p className="text-sm text-[#6E6E73]">{user.address}</p>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="self-start sm:self-center text-sm text-red-500 hover:text-red-600 border border-red-200 hover:border-red-300 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Compras", value: orders.length },
          { label: "Total gastado", value: `$${totalSpent.toFixed(2)}` },
          { label: "Estado", value: "Activo" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-[#E8E8ED] rounded-xl p-4 text-center shadow-sm"
          >
            <p className="text-xl font-semibold text-[#1D1D1F]">{stat.value}</p>
            <p className="text-xs text-[#6E6E73] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#1D1D1F]">
          Mis compras
        </h2>

        {orders.length === 0 ? (
          <div className="text-center py-12 border border-[#E8E8ED] rounded-2xl bg-white">
            <ShoppingBag className="mx-auto mb-3 text-[#6E6E73]" size={36} />
            <p className="text-[#6E6E73] text-sm mb-4">
              No has realizado compras aún.
            </p>
            <button
              onClick={() => router.push("/products")}
              className="text-sm bg-[#0071E3] text-white px-4 py-2 rounded-lg hover:bg-[#005BBB] transition cursor-pointer"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order, index) => {
              const isOpen = openOrder === order.id;
              const status =
                statusMap[order.status ?? ""] ?? statusMap["completed"];

              return (
                <div
                  key={order.id}
                  className="bg-white border border-[#E8E8ED] rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow"
                >
                  {/* Order header */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 cursor-pointer"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div>
                      <p className="font-semibold text-[#1D1D1F] text-sm md:text-base">
                        Compra #{index + 1}
                      </p>
                      <p className="text-xs md:text-sm text-[#6E6E73]">
                        Fecha: {formatDate(order.date)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <span className="text-[#0071E3] font-semibold text-sm md:text-base">
                        ${Number(order.total).toFixed(2)}
                      </span>

                      <span
                        className={`text-xs px-2 py-1 rounded-md ${status.className}`}
                      >
                        {status.label}
                      </span>

                      <ChevronDown
                        size={16}
                        className={`text-[#6E6E73] transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Order products (accordion) */}
                  {isOpen && (
                    <div className="mt-3 border-t border-[#E8E8ED] pt-3">
                      {order.orderDetails && order.orderDetails.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          {order.orderDetails.map((detail) => (
                            <div
                              key={detail.id}
                              className="flex justify-between text-sm text-[#1D1D1F]"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xs bg-[#F5F5F7] text-[#6E6E73] px-2 py-0.5 rounded-md">
                                  x{detail.quantity}
                                </span>
                                <span>{detail.product.name}</span>
                              </div>
                              <span className="text-[#0071E3] font-medium">
                                $
                                {(detail.unitPrice * detail.quantity).toFixed(
                                  2,
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-[#6E6E73]">
                          Detalle no disponible para esta compra.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
