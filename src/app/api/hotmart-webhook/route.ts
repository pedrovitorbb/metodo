
import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

// Mapeia o ID do produto da Hotmart para o plano no seu sistema
const PRODUCT_ID_TO_PLAN: { [key: string]: 'basic' | 'premium' } = {
  // ID do produto do plano Básico
  'tbpun0ml': 'basic',
  // ID do produto do plano Premium
  'y3v9b5p3': 'premium',
  // ID do produto para teste real (se necessário)
  '7xigzj3x': 'premium'
};

export async function POST(request: NextRequest) {
  console.log("Webhook da Hotmart recebido. Iniciando processamento...");

  try {
    // 1. Verificação de Segurança
    const hottok = request.headers.get("hottok");
    const expectedHottok = process.env.HOTMART_HOTTOK;

    if (!expectedHottok) {
        console.error("ERRO CRÍTICO: A variável de ambiente HOTMART_HOTTOK não está configurada no servidor.");
        return NextResponse.json({ message: "Erro de configuração no servidor." }, { status: 500 });
    }

    if (hottok !== expectedHottok) {
      console.warn(`AVISO: Tentativa de webhook com Hottok inválido. Hottok recebido: ${hottok}`);
      return NextResponse.json({ message: "Acesso não autorizado." }, { status: 401 });
    }
    console.log("Sucesso: Hottok verificado com sucesso.");

    const payload = await request.json();
    console.log("Payload recebido:", JSON.stringify(payload, null, 2));

    // 2. Processar apenas eventos de compra relevantes
    const validEvents = ["purchase.approved", "purchase.paid"];
    if (!validEvents.includes(payload.event)) {
        console.log(`Evento '${payload.event}' ignorado por não ser 'purchase.approved' ou 'purchase.paid'.`);
        return NextResponse.json({ message: "Evento ignorado." }, { status: 200 });
    }
    console.log(`Evento '${payload.event}' é válido. Prosseguindo...`);

    const purchaseData = payload.data.purchase || payload.data;
    const buyerEmail = purchaseData.buyer.email;
    const buyerName = purchaseData.buyer.name;
    const productId = purchaseData.product.id.toString();

    const plan = PRODUCT_ID_TO_PLAN[productId];

    if (!plan) {
      console.log(`Produto com ID ${productId} não corresponde a nenhum plano configurado. Ignorando.`);
      return NextResponse.json({ message: "Produto não configurado." }, { status: 200 });
    }
    console.log(`Dados extraídos: Email: ${buyerEmail}, Nome: ${buyerName}, Plano: ${plan}`);

    // 3. Encontrar ou criar o usuário
    let userRecord;
    try {
      userRecord = await adminAuth.getUserByEmail(buyerEmail);
      console.log(`Usuário encontrado: ${buyerEmail} (UID: ${userRecord.uid}). Atualizando plano para ${plan}.`);
      
      const userDocRef = adminDb.collection("users").doc(userRecord.uid);
      await userDocRef.update({ plan: plan });
      
      console.log(`SUCESSO: Plano do usuário ${buyerEmail} atualizado para ${plan} no Firestore.`);

    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        console.log(`Usuário com e-mail ${buyerEmail} não encontrado. Criando novo usuário...`);
        
        userRecord = await adminAuth.createUser({
          email: buyerEmail,
          emailVerified: true,
          displayName: buyerName,
        });
        console.log(`Usuário criado no Firebase Auth com UID: ${userRecord.uid}`);

        const userDocRef = adminDb.collection("users").doc(userRecord.uid);
        await userDocRef.set({
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          photoURL: null,
          plan: plan,
        });
        console.log(`Perfil do usuário criado no Firestore com o plano ${plan}.`);
        
        try {
            await adminAuth.generatePasswordResetLink(buyerEmail);
            console.log(`SUCESSO: Usuário ${buyerEmail} criado. E-mail para definição de senha será enviado pelo Firebase.`);
        } catch (linkError) {
            console.error(`ERRO ao tentar enviar e-mail de redefinição de senha para ${buyerEmail}:`, linkError);
        }

      } else {
        console.error("ERRO desconhecido ao procurar/criar usuário:", error);
        throw error;
      }
    }

    return NextResponse.json({ message: "Webhook processado com sucesso." }, { status: 200 });

  } catch (error: any)
   {
    console.error("ERRO GERAL no processamento do webhook da Hotmart:", error.message, error.stack);
    return NextResponse.json({ message: "Ocorreu um erro no servidor." }, { status: 500 });
  }
}
