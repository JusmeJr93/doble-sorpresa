/* eslint-disable react/prop-types */
import { useState } from "react";
import { emailRegex } from "../utils/validation";

export default function PersonForm({ label, onChange }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [gifts, setGifts] = useState(['', '', '']);

    function updateParent() {
        onChange({
            name,
            email,
            confirmEmail,
            gifts: gifts.filter(g => g.trim() !== '')
        });
    }

    function handleGiftChange(value, index) {
        const newGifts = [...gifts];
        newGifts[index] = value;
        setGifts(newGifts);
        updateParent();
    }

    function addGiftField() {
        if (gifts.length < 5) {
            setGifts([...gifts, '']);
        }
    }

    function removeGiftField(index) {
        if (gifts.length > 3) {
            const newGifts = gifts.filter((_, i) => i !== index);
            setGifts(newGifts);
            updateParent();
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-600 mb-6 flex items-center">
                {label}
            </h2>

            <div className="mb-6">
                <label className="block mb-1 text-gray-700">Nombre:</label>
                <input
                    type="text"
                    className="border w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Entra el nombre"
                    value={name}
                    onChange={e => { setName(e.target.value); updateParent(); }}
                />
            </div>

            <div className="mb-6">
                <label className="block mb-1 text-gray-700">Correo:</label>
                <input
                    type="email"
                    className={`border w-full p-2 rounded-lg focus:outline-none focus:ring-2 ${emailRegex.test(email) ? 'border-green-500 focus:ring-green-300' : email ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
                        }`}
                    placeholder="Entra el correo"
                    value={email}
                    onChange={e => { setEmail(e.target.value); updateParent(); }}
                />
                {email && (
                    <p className={`text-sm mt-1 font-medium ${emailRegex.test(email) ? 'text-green-500' : 'text-red-500'}`}>
                        {emailRegex.test(email) ? 'Correo válido' : 'Correo inválido'}
                    </p>
                )}
            </div>

            <div className="mb-6">
                <label className="block mb-1 text-gray-700">Confirmar Correo:</label>
                <input
                    type="email"
                    className={`border w-full p-2 rounded-lg focus:outline-none focus:ring-2 ${email === confirmEmail && emailRegex.test(email) ? 'border-green-500 focus:ring-green-300' : confirmEmail ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
                        }`}
                    placeholder="Confirma el correo"
                    value={confirmEmail}
                    onChange={e => { setConfirmEmail(e.target.value); updateParent(); }}
                />
                {confirmEmail && (
                    <p className={`text-sm mt-1 font-medium ${email === confirmEmail && emailRegex.test(email) ? 'text-green-500' : 'text-red-500'}`}>
                        {email === confirmEmail && emailRegex.test(email) ? 'Correos coinciden' : 'Los correos no coinciden'}
                    </p>
                )}
            </div>

            <div>
                <label className="block mb-1 text-gray-700">Regalos:</label>
                {gifts.map((gift, idx) => (
                    <div key={idx} className="flex items-center mb-3">
                        <input
                            type="text"
                            className="border w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder={`Regalo ${idx + 1}`}
                            value={gift}
                            onChange={e => handleGiftChange(e.target.value, idx)}
                        />
                        {gifts.length > 3 && (
                            <button
                                type="button"
                                onClick={() => removeGiftField(idx)}
                                title="Quitar este regalo"
                                className="ml-2 text-red-500 hover:text-red-700 hover:font-extrabold"
                            >
                                X
                            </button>
                        )}
                    </div>
                ))}

                {gifts.length < 5 && (
                    <button
                        type="button"
                        onClick={addGiftField}
                        className="mt-2 text-blue-500 hover:text-blue-700  hover:font-semibold"
                    >
                        + Agregar otro regalo
                    </button>
                )}

                <p className="text-sm text-gray-500 text-right">
                    {gifts.filter(g => g.trim() !== '').length} de 5 regalos ingresados
                </p>
            </div>
        </div>
    );
}