export default function LeadCancelledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center max-w-md shadow-xl">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Compra cancelada</h1>
        <p className="text-gray-600 mb-6">
          No se ha realizado ningún cargo. El lead sigue disponible para otros profesionales.
        </p>
        <a
          href="https://t.me/rapidfix_fontanero_bot"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Volver a Telegram
        </a>
      </div>
    </div>
  )
}
