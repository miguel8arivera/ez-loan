import type { BcpProduct } from '../types/bcpProduct';

export const BCP_URL = 'https://www.viabcp.com';

export const bcpProducts: BcpProduct[] = [
  {
    id: 'credit-history',
    title: 'Crea tu historial crediticio',
    features: [
      'Sin necesidad de historial previo',
      'Aprobación en minutos',
      'Sube de nivel hacia mejores tasas',
    ],
    steps: [
      'Verifica que tengas DNI vigente y seas mayor de 18 años.',
      'Reúne un comprobante de ingresos (boleta de pago) o un recibo de servicios que confirme tu domicilio.',
      'Revisa que no tengas deudas reportadas negativamente en centrales de riesgo como Infocorp o Equifax.',
      'Si aún no tienes historial, empieza con un producto simple para irlo construyendo poco a poco.',
      'Completa la solicitud en viabcp.com o la app BCP; la evaluación suele tardar solo minutos.',
    ],
    ctaLabel: 'Crear historial',
    detailsLabel: 'Ver detalle',
    url: BCP_URL,
    videoId: 'BwwcDM0fbMc',
    videoTitle: 'Infocorp: consejos para construir un buen historial crediticio',
  },
  {
    id: 'plans-terms',
    title: 'Ver planes y plazos',
    features: [
      'Plazos desde 6 hasta 60 meses',
      'Cuotas fijas y flexibles',
      'Simulador de pagos en línea',
    ],
    steps: [
      'Confirma que eres mayor de 18 años, con DNI vigente e ingresos que puedas demostrar.',
      'Si ya eres cliente BCP, ten a la mano tu Clave de Internet para agilizar la evaluación.',
      'Simula tu préstamo eligiendo el monto (desde S/ 500) y el plazo que prefieras (6 a 72 meses).',
      'Envía tu solicitud online; el banco evaluará tus ingresos, historial y capacidad de pago.',
      'Si te aprueban, el dinero se deposita directamente en tu cuenta BCP, usualmente el mismo día.',
    ],
    ctaLabel: 'Ver planes',
    detailsLabel: 'Ver detalle',
    url: BCP_URL,
    videoId: 'P4UXUvPN0H8',
    videoTitle: '¿Cómo funciona un préstamo personal?',
  },
  {
    id: 'fixed-term-deposit',
    title: 'Depósito a plazo fijo',
    features: [
      'Tasa fija garantizada',
      'Apertura desde S/. 500',
      'Protege y haz crecer tus ahorros',
    ],
    steps: [
      'Define cuánto quieres ahorrar: desde S/ 2,000 por banca digital o S/ 500 en agencia.',
      'Elige el plazo de permanencia de tu dinero (desde 90 días en agencia, o menos por banca digital).',
      'Para abrirlo digital, instala la app Banca Móvil BCP; para hacerlo presencial, lleva tu DNI a una agencia.',
      'Confirma la tasa de interés fija ofrecida antes de aperturar el depósito.',
      'Al vencer el plazo, recibe tu dinero junto con los intereses generados.',
    ],
    ctaLabel: 'Ver depósitos',
    detailsLabel: 'Ver detalle',
    url: BCP_URL,
    videoId: 'yTXhC_KdBmI',
    videoTitle: '¿Qué es un depósito a plazo fijo y cómo funciona?',
  },
];
