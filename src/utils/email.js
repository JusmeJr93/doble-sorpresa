import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_k40zd0i';
const TEMPLATE_ID = 'template_4rfcmog';
const PUBLIC_KEY = 'QaGiDq2qyK4Il-cr5';

export async function sendEmails({ person1, person2, regaloParaP1, regaloParaP2 }) {
    const res1 = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: person1.email,
        to_name: person1.name || 'Participante',
        other_name: person2.name || 'Tu pareja de intercambio',
        gift: regaloParaP1
    }, PUBLIC_KEY);

    const res2 = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: person2.email,
        to_name: person2.name || 'Participante',
        other_name: person1.name || 'Tu pareja de intercambio',
        gift: regaloParaP2
    }, PUBLIC_KEY);

    return [res1, res2];
}