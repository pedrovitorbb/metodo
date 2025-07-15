
import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

// Mapeia o ID do produto da Hotmart para o plano no seu sistema
const PRODUCT_ID_TO_PLAN: { [key: string]: 'basic' | 'premium' } = {
  // ID do produto do plano Básico
  'm6i0896d': 'basic',
  // ID do produto do plano Premium
  'jhynedgi': 'premium',
};

export async function POST(request: NextRequest) {
  try {
    // 1. Verificação de Segurança (extremamente importante)
    // Lê o token secreto das variáveis de ambiente no servidor.
    const hottok = request.headers.get("hottok");
    const expectedHottok = process.env.HOTMART_HOTTOK;

    if (!expectedHottok) {
        console.error("Erro crítico: A variável de ambiente HOTMART_HOTTOK não está configurada no servidor.");
        return NextResponse.json({ message: "Erro de configuração no servidor." }, { status: 500 });
    }

    if (hottok !== expectedHottok) {
      console.warn("Aviso: Tentativa de webhook com Hottok inválido.", { hottok });
      return NextResponse.json({ message: "Acesso não autorizado." }, { status: 401 });
    }

    const payload = await request.json();

    // 2. Processar apenas eventos de compra relevantes
    const validEvents = ["purchase.approved", "purchase.paid"];
    if (!validEvents.includes(payload.event)) {
        console.log(`Evento '${payload.event}' ignorado.`);
        return NextResponse.json({ message: "Evento ignorado." }, { status: 200 });
    }

    const purchaseData = payload.data.purchase || payload.data;
    const buyerEmail = purchaseData.buyer.email;
    const buyerName = purchaseData.buyer.name;
    const productId = purchaseData.product.id.toString();

    const plan = PRODUCT_ID_TO_PLAN[productId];

    if (!plan) {
      console.log(`Produto com ID ${productId} não corresponde a nenhum plano configurado. Ignorando.`);
      return NextResponse.json({ message: "Produto não configurado." }, { status: 200 });
    }

    // 3. Encontrar ou criar o usuário
    let userRecord;
    try {
      // Tenta encontrar um usuário existente pelo e-mail
      userRecord = await adminAuth.getUserByEmail(buyerEmail);
      console.log(`Usuário encontrado: ${buyerEmail}, UID: ${userRecord.uid}. Atualizando plano para ${plan}.`);
      
      // Atualiza o plano no Firestore
      const userDocRef = adminDb.collection("users").doc(userRecord.uid);
      await userDocRef.update({ plan: plan });
      
      console.log(`Sucesso: Plano do usuário ${buyerEmail} atualizado para ${plan}.`);

    } catch (error: any) {
      // Se o erro for "user-not-found", criamos um novo usuário
      if (error.code === 'auth/user-not-found') {
        console.log(`Usuário com e-mail ${buyerEmail} não encontrado. Criando novo usuário...`);
        
        userRecord = await adminAuth.createUser({
          email: buyerEmail,
          emailVerified: true, // O e-mail da Hotmart é considerado verificado
          displayName: buyerName,
          // Não definimos senha aqui. O usuário a criará.
        });

        // Cria o perfil no Firestore
        const userDocRef = adminDb.collection("users").doc(userRecord.uid);
        await userDocRef.set({
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          photoURL: null,
          plan: plan, // Atribui o plano comprado
        });
        
        try {
            // Envia o e-mail de redefinição de senha para o usuário criar sua própria senha
            const resetLink = await adminAuth.generatePasswordResetLink(buyerEmail);
            console.log(`Usuário ${buyerEmail} criado com sucesso. E-mail para definição de senha será enviado pelo Firebase.`);
            // Você pode opcionalmente usar o 'resetLink' para enviar um e-mail customizado, mas o Firebase já envia um padrão.
        } catch (linkError) {
            console.error(`Erro ao gerar link de redefinição de senha para ${buyerEmail}:`, linkError);
        }

      } else {
        // Se for outro erro, registra e encerra
        console.error("Erro ao procurar/criar usuário:", error);
        throw error;
      }
    }

    return NextResponse.json({ message: "Webhook processado com sucesso." }, { status: 200 });

  } catch (error) {
    console.error("Erro no webhook da Hotmart:", error);
    return NextResponse.json({ message: "Ocorreu um erro no servidor." }, { status: 500 });
  }
}
