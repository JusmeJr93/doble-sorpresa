import { useLocation, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

export default function Confirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { person1Name, person1Email, person2Name, person2Email } = location.state || {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 via-purple-100 to-purple-300 p-6">

            <h1 className="text-4xl font-extrabold text-purple-600 mb-6 flex items-center">
                🎉 ¡Listo! <span className="ml-2 text-purple-500">🎉</span>
            </h1>

            <p className="text-lg text-gray-700 text-center max-w-3xl mb-8">
                Los correos han sido enviados exitosamente. <br /> Cada participante debe revisar su bandeja de entrada para descubrir lo que le toca regalar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-10">
                {person1Email && (
                    <div className="bg-white shadow-md rounded-lg p-4 text-center">
                        <h2 className="text-lg font-bold text-gray-700 mb-2">
                            Correo de {person1Name || "Participante 1"}:
                        </h2>
                        <p className="text-gray-500">{person1Email}</p>
                    </div>
                )}
                {person2Email && (
                    <div className="bg-white shadow-md rounded-lg p-4 text-center">
                        <h2 className="text-lg font-bold text-gray-700 mb-2">
                            Correo de {person2Name || "Participante 2"}:
                        </h2>
                        <p className="text-gray-500">{person2Email}</p>
                    </div>
                )}
            </div>

            <button
                onClick={() => navigate('/')}
                className="bg-purple-500 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-md hover:bg-purple-400 hover:shadow-lg transition duration-300"
            >
                Volver al Inicio
            </button>
        </motion.div>
    );
}