import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-white drop-shadow-md mb-4">
                    Bienvenido a <span className="text-yellow-400 block md:inline">🎁Doble Sorpresa🎁</span>
                </h1>
                <p className="text-lg text-white max-w-lg mx-auto drop-shadow-sm">
                    Una herramienta divertida para intercambiar regalos sorpresa entre dos personas. Anota tus opciones, deja que la app elija al azar, y mantén la sorpresa hasta el día especial.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-10">
                <div className="flex flex-col items-center text-center">
                    <div className="bg-yellow-400 p-4 rounded-full shadow-lg mb-4">
                        <span className="text-3xl">📝</span>
                    </div>
                    <h3 className="font-bold text-lg text-white">1. Escribe tus regalos</h3>
                    <p className="text-sm text-white">
                        Anota tus datos y de 3 a 5 opciones de regalos que te gustaría recibir.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center">
                    <div className="bg-yellow-400 p-4 rounded-full shadow-lg mb-4">
                        <span className="text-3xl">🎲</span>
                    </div>
                    <h3 className="font-bold text-lg text-white">2. Selección al azar</h3>
                    <p className="text-sm text-white">
                        La app elige al azar un regalo de cada lista.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center">
                    <div className="bg-yellow-400 p-4 rounded-full shadow-lg mb-4">
                        <span className="text-3xl">📧</span>
                    </div>
                    <h3 className="font-bold text-lg text-white">3. Correos enviados</h3>
                    <p className="text-sm text-white">
                        Se envía un correo a cada participante con el regalo que debe comprar.
                    </p>
                </div>
            </div>

            <div className="mb-10">
                <img
                    src="/intercambio.png"
                    alt="Ilustración de Intercambio"
                    className="rounded-lg shadow-lg"
                />
            </div>

            <button
                onClick={() => navigate('/selection')}
                className="bg-yellow-400 text-blue-900 font-bold text-lg px-8 py-4 rounded-lg shadow-md hover:bg-yellow-300 hover:shadow-lg transition duration-300"
            >
                ¡Comenzar!
            </button>
        </motion.div>
    );
}