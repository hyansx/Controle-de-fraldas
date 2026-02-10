'use client';

// Imports removed

interface whatsappData {
  daysRemaining: number;
  currentStock: number;
  currentMonthTotal: number;
  depletionDate: Date;
}

export default function WhatsAppButton({ data }: { data: whatsappData }) {
// mounted state removed as it is not needed for the static button rendering

  const handleShare = () => {
    const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const month = new Date().toLocaleDateString('pt-BR', { month: 'long' });
    
    // Status Logic
    let statusEmoji = "\u2705";
    let statusText = "Tudo sob controle.";
    if (data.daysRemaining < 7) {
        statusEmoji = "\u{1F6A8}";
        statusText = "URGENTE: Estoque acabando!";
    } else if (data.daysRemaining < 15) {
        statusEmoji = "\u26A0\uFE0F";
        statusText = "Atenção: Planejar compra.";
    }

    const messageLines = [
      `*\u{1F4CB} Relatório de Fraldas - ${date}*`,
      "",
      `${statusEmoji} *Status*: ${statusText}`,
      "",
      `\u{1F4E6} *Estoque Atual*: ${data.currentStock} unidades`,
      `\u23F3 *Duração Estimada*: ${data.daysRemaining} dias (até ${data.depletionDate.toLocaleDateString('pt-BR')})`,
      "",
      `\u{1F4C5} *Entregas em ${month}*: ${data.currentMonthTotal} unidades`,
      "",
      "_Gerado pelo Sistema da Fraldas Família_"
    ];

    const message = messageLines.join("\n");
    const params = new URLSearchParams();
    params.append("text", message);

    const url = `https://api.whatsapp.com/send?${params.toString()}`;
    window.open(url, '_blank');
  };

  return (
    <button 
      onClick={handleShare}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: '#25D366',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        zIndex: 1000,
        transition: 'transform 0.2s'
      }}
      title="Compartilhar no WhatsApp"
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      📱
    </button>
  );
}
