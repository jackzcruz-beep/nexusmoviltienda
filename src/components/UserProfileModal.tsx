import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  User,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  PackageCheck,
  LogOut,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const {
    isProfileOpen,
    setIsProfileOpen,
    currentUser,
    logout,
    orders,
    setActiveTrackingId,
    setIsTrackingOpen,
    updateProfile,
    addToCart,
    products
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    city: currentUser?.city || '',
    address: currentUser?.address || ''
  });

  if (!isProfileOpen || !currentUser) return null;

  // Filter orders made by this user
  const userOrders = orders.filter(
    o =>
      currentUser.orders.includes(o.id) ||
      o.customerEmail?.toLowerCase() === currentUser.email.toLowerCase() ||
      o.customerName.toLowerCase() === currentUser.name.toLowerCase()
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleReorder = (item: { productId: string; color: string; format: string }) => {
    const prod = products.find(p => p.id === item.productId);
    if (prod) {
      addToCart(prod, item.color, item.format, 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0d131f] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d16]">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full border-2 border-cyan-400/60 object-cover"
            />
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>{currentUser.name}</span>
                <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                  Google Account
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">{currentUser.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                setIsProfileOpen(false);
              }}
              className="text-xs text-slate-400 hover:text-rose-400 p-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
            <button
              onClick={() => setIsProfileOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="px-6 py-2.5 bg-[#0b0f17] border-b border-slate-800 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-1 cursor-pointer transition-colors ${
              activeTab === 'orders'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Historial de Compras ({userOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-1 cursor-pointer transition-colors ${
              activeTab === 'profile'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Datos de Envío Guardados
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'orders' ? (
            userOrders.length > 0 ? (
              <div className="space-y-4">
                {userOrders.map(order => (
                  <div
                    key={order.id}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white text-sm">
                            Pedido #{order.id}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">{order.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveTrackingId(order.id);
                            setIsProfileOpen(false);
                            setIsTrackingOpen(true);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer"
                        >
                          <PackageCheck className="w-3.5 h-3.5" />
                          <span>Rastrear en Vivo</span>
                        </button>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <img
                              src={item.image}
                              alt={item.productName}
                              referrerPolicy="no-referrer"
                              className="w-9 h-9 rounded object-cover bg-slate-950 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-medium text-white truncate max-w-[260px]">
                                {item.quantity}x {item.productName}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {item.color} · {item.format}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-mono text-cyan-300">
                              ${item.subtotal.toFixed(2)} USD
                            </span>
                            <button
                              onClick={() => handleReorder(item)}
                              className="text-[10px] text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
                              title="Volver a comprar"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Pago: <strong>{order.paymentMethod}</strong>
                      </span>
                      <span className="text-sm font-bold font-mono text-white">
                        Total: ${order.total.toFixed(2)} USD
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">No tienes compras registradas aún</p>
                <p className="text-xs text-slate-400 mt-1">
                  Cuando finalices una compra por WhatsApp, aparecerá automáticamente aquí.
                </p>
              </div>
            )
          ) : (
            /* Tab: Saved Shipping Data */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Dirección para Compras Express por WhatsApp
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
                >
                  {isEditing ? 'Cancelar' : 'Editar Dirección'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Nombre completo:</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Teléfono WhatsApp:</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Ciudad:</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Dirección de entrega:</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Guardar Cambios
                  </button>
                </form>
              ) : (
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <User className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Nombre: <strong className="text-white">{currentUser.name}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Email: <strong className="text-white">{currentUser.email}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>WhatsApp: <strong className="text-white">{currentUser.phone || 'No configurado'}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Dirección: <strong className="text-white">{currentUser.address}, {currentUser.city}</strong></span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
