const perks = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0071E3"
        strokeWidth={1.8}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    title: "Envío rápido",
    desc: "Recibí tu pedido en 24-48hs hábiles en todo el país.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0071E3"
        strokeWidth={1.8}
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Garantía oficial",
    desc: "Todos nuestros productos tienen garantía del fabricante.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0071E3"
        strokeWidth={1.8}
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: "Pago seguro",
    desc: "Múltiples métodos de pago con encriptación SSL.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0071E3"
        strokeWidth={1.8}
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Soporte 24/7",
    desc: "Nuestro equipo está disponible para ayudarte siempre.",
  },
];

const WhyUs = () => {
  return (
    <section className="px-8 py-10 bg-[#F5F5F7] border border-[#ede8e8]">
      <div className="text-center mb-10">
        <h2 className="text-[#1D1D1F] text-2xl font-semibold tracking-tight mb-2">
          ¿Por qué elegirnos?
        </h2>
        <p className="text-[#6E6E73] text-sm max-w-md mx-auto">
          Nos comprometemos a darte la mejor experiencia de compra.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {perks.map((perk, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 flex flex-col items-center text-center border border-[#E8E8ED]"
          >
            <div className="w-12 h-12 bg-[#E8F0FE] rounded-full flex items-center justify-center mb-4">
              {perk.icon}
            </div>
            <h3 className="text-[#1D1D1F] text-sm font-semibold mb-2">
              {perk.title}
            </h3>
            <p className="text-[#6E6E73] text-xs leading-relaxed">
              {perk.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
