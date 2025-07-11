
import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Mapeia o ID do produto da Hotmart para o plano no seu sistema
const PRODUCT_ID_TO_PLAN: { [key: string]: 'basic' | 'premium' } = {
  // ID do produto do plano Básico
  'tbpun0ml': 'basic', 
  // ID do produto do plano Premium
  'y3v9b5p3': 'premium', 
};

export async function POST(request: NextRequest) {
  try {
    // 1. Verificação de Segurança (extremamente importante)
    // A linha abaixo lê o token secreto do seu arquivo .env.local (ou das variáveis de ambiente no servidor)
    // Isso garante que o token nunca fique exposto no código.
    const hottok = request.headers.get("hottok");
    const expectedHottok = process.env.HOTMART_HOTTOK;

    if (hottok !== expectedHottok) {
      console.warn("Aviso: Tentativa de webhook com Hottok inválido.", { hottok });
      return NextResponse.json({ message: "Acesso não autorizado." }, { status: 401 });
    }

    const payload = await request.json();

    // 2. Processar apenas compras aprovadas
    if (payload.event !== "purchase.approved") {
        return NextResponse.json({ message: "Evento ignorado." }, { status: 200 });
    }
    
    const purchaseData = payload.data.purchase;
    const buyerEmail = purchaseData.buyer.email;
    const productId = purchaseData.product.id.toString();
    
    const plan = PRODUCT_ID_TO_PLAN[productId];

    // Se o produto comprado não mapeia para um plano, não fazemos nada.
    if (!plan) {
      console.log(`Produto com ID ${productId} não corresponde a nenhum plano configurado. Ignorando.`);
      return NextResponse.json({ message: "Produto não configurado." }, { status: 200 });
    }

    // 3. Encontrar o usuário no Firestore pelo e-mail
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", buyerEmail));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Se o usuário não existe, você pode optar por criá-lo aqui
      // ou simplesmente registrar o erro. Por enquanto, vamos registrar.
      console.error(`Erro: Usuário com e-mail ${buyerEmail} não encontrado no Firestore.`);
      return NextResponse.json({ message: "Usuário não encontrado." }, { status: 404 });
    }

    // 4. Atualizar o plano do usuário
    const userDocSnapshot = querySnapshot.docs[0];
    const userDocRef = doc(db, "users", userDocSnapshot.id);
    await updateDoc(userDocRef, {
      plan: plan,
    });

    console.log(`Sucesso: Plano do usuário ${buyerEmail} atualizado para ${plan}.`);
    return NextResponse.json({ message: "Plano do usuário atualizado com sucesso." }, { status: 200 });

  } catch (error) {
    console.error("Erro no webhook da Hotmart:", error);
    return NextResponse.json({ message: "Ocorreu um erro no servidor." }, { status: 500 });
  }
}
