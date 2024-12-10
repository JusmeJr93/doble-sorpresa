import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonForm from "../components/personForm";
import { emailRegex } from "../utils/validation";
import { sendEmails } from "../utils/email";
import { motion } from 'framer-motion';

function selectRandomGift(gifts) {
    return gifts[Math.floor(Math.random() * gifts.length)];
}

export default function Selection() {
    const navigate = useNavigate();
    const [person1, setPerson1] = useState({ email: '', confirmEmail: '', gifts: [] });
    const [person2, setPerson2] = useState({ email: '', confirmEmail: '', gifts: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function validateForm() {
        if (!emailRegex.test(person1.email) || person1.email !== person1.confirmEmail) {
            return 'Verifica el correo de Participante 1.';
        }

        if (!emailRegex.test(person2.email) || person2.email !== person2.confirmEmail) {
            return 'Verifica el correo de Participante 2.';
        }

        if (person1.gifts.length < 3 || person2.gifts.length < 3) {
            return 'Cada participante debe ingresar 3 regalos.';
        }

        return null;
    }

    async function handleSubmit() {
        const err = validateForm();
        if (err) {
            setError(err);
            return;
        }

        setError('');
        setLoading(true);

        const regaloParaP1 = selectRandomGift(person2.gifts);
        const regaloParaP2 = selectRandomGift(person1.gifts);

        try {
            await sendEmails({
                person1,
                person2,
                regaloParaP1,
                regaloParaP2
            });

            navigate('/confirmation', {
                state: {
                    person1Name: person1.name,
                    person1Email: person1.email,
                    person2Name: person2.name,
                    person2Email: person2.email,
                }
            });
        } catch (e) {
            console.error(e);
            setError('Hubo un error al enviar los correos. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-blue-600 p-6"
        >
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-blue-900 mb-4">Selecciona tus Regalos</h1>
                <p className="text-gray-700 text-xl max-w-2xl mx-auto">
                    Ingresa los datos de ambos participantes, junto con sus regalos, para generar un intercambio sorpresa.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-5xl w-full">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <PersonForm label="Participante 1" onChange={data => setPerson1(data)} />
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <PersonForm label="Participante 2" onChange={data => setPerson2(data)} />
                </div>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`bg-yellow-400 text-blue-900 font-bold text-lg px-10 py-4 rounded-lg shadow-md hover:bg-yellow-300 hover:shadow-lg transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Enviando...' : 'Generar y Enviar'}
            </button>

        </motion.div>
    );
}