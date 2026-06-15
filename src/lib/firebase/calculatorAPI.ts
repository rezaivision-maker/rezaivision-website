import { db } from "../firebase";
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from "firebase/firestore";

export interface CalculatorOption {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  multiplierIndex?: number; // 1-4 for packages S, M, L, XL
  isPackage?: boolean;      // if true, this option defines the multiplier index
  packageDiscount?: number; // e.g. 0.05 for 5% discount
  icon?: string;
}

export interface CalculatorStep {
  id: string;
  order: number;
  title: string;
  description: string;
  options: CalculatorOption[];
  multiSelect: boolean;
}

export interface CalculatorLead {
  id?: string;
  name: string;
  phone?: string;
  email: string;
  selections: any;
  calculatedPrice: number;
  createdAt: string;
}

// Fixed document ID for the config
const CONFIG_DOC_ID = "mainConfig";

export async function getCalculatorConfig(): Promise<CalculatorStep[]> {
  const configDoc = doc(db, "calculatorConfig", CONFIG_DOC_ID);
  const snap = await getDoc(configDoc);
  if (snap.exists()) {
    return snap.data().steps as CalculatorStep[];
  }
  return [];
}

export async function saveCalculatorConfig(steps: CalculatorStep[]): Promise<void> {
  const configDoc = doc(db, "calculatorConfig", CONFIG_DOC_ID);
  await setDoc(configDoc, { steps });
}

export async function saveCalculatorLead(
  lead: Omit<CalculatorLead, "id" | "createdAt">,
  customerEmailHtml?: string,
  notificationEmailHtml?: string
): Promise<string> {
  const leadsRef = collection(db, "calculatorLeads");
  const docRef = await addDoc(leadsRef, {
    ...lead,
    createdAt: new Date().toISOString()
  });

  const mailRef = collection(db, "mail");

  if (customerEmailHtml) {
    await addDoc(mailRef, {
      to: lead.email,
      message: {
        subject: "Dein kalkuliertes Projektbudget | Rezai Vision",
        html: customerEmailHtml
      }
    });
  }

  if (notificationEmailHtml) {
    await addDoc(mailRef, {
      to: "rezaivision@gmail.com",
      message: {
        subject: `🎯 Neuer Lead: ${lead.name} — ${lead.calculatedPrice.toLocaleString('de-DE')} €`,
        html: notificationEmailHtml
      }
    });
  }

  return docRef.id;
}

export async function getCalculatorLeads(): Promise<CalculatorLead[]> {
  const leadsRef = collection(db, "calculatorLeads");
  const q = query(leadsRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as CalculatorLead));
}
