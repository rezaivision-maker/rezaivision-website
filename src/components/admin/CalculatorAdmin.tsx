import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, Loader2, GripVertical } from "lucide-react";
import { getCalculatorConfig, saveCalculatorConfig, CalculatorStep, CalculatorOption } from "../../lib/firebase/calculatorAPI";

export default function CalculatorAdmin() {
  const [steps, setSteps] = useState<CalculatorStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setLoading(true);
    try {
      const data = await getCalculatorConfig();
      if (data && data.length > 0) {
        setSteps(data);
      } else {
        // Init with default structure
        setSteps([
          {
            id: "step1",
            order: 1,
            title: "Umfang des Projekts",
            description: "Wähle das passende Paket für deine Videoproduktion",
            multiSelect: false,
            options: [
              { id: "opt1", title: "Content Day S", description: "1 Drehtag", basePrice: 625, isPackage: true, multiplierIndex: 1 }
            ]
          }
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveCalculatorConfig(steps);
      alert("Konfiguration erfolgreich gespeichert!");
    } catch (err) {
      console.error(err);
      alert("Fehler beim Speichern");
    } finally {
      setSaving(false);
    }
  };

  const addStep = () => {
    const newStep: CalculatorStep = {
      id: `step_${Date.now()}`,
      order: steps.length + 1,
      title: "Neuer Schritt",
      description: "Beschreibung hier einfügen",
      multiSelect: false,
      options: []
    };
    setSteps([...steps, newStep]);
  };

  const updateStep = (index: number, field: keyof CalculatorStep, value: any) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  const removeStep = (index: number) => {
    if (confirm("Diesen Schritt wirklich löschen?")) {
      const updated = [...steps];
      updated.splice(index, 1);
      setSteps(updated);
    }
  };

  const addOption = (stepIndex: number) => {
    const updated = [...steps];
    updated[stepIndex].options.push({
      id: `opt_${Date.now()}`,
      title: "Neue Option",
      description: "",
      basePrice: 0
    });
    setSteps(updated);
  };

  const updateOption = (stepIndex: number, optIndex: number, field: keyof CalculatorOption, value: any) => {
    const updated = [...steps];
    updated[stepIndex].options[optIndex] = { ...updated[stepIndex].options[optIndex], [field]: value };
    setSteps(updated);
  };

  const removeOption = (stepIndex: number, optIndex: number) => {
    const updated = [...steps];
    updated[stepIndex].options.splice(optIndex, 1);
    setSteps(updated);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-brand-accent w-8 h-8" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Preisrechner Konfiguration</h2>
          <p className="text-gray-400">Passe die Schritte und Preise für den interaktiven Rechner an.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-accent text-brand-bg px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all cursor-pointer hover:scale-105 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Speichern
        </button>
      </div>

      <div className="space-y-8">
        {steps.map((step, sIdx) => (
          <div key={step.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
            <button 
              onClick={() => removeStep(sIdx)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
            >
              <Trash2 size={20} />
            </button>
            
            <div className="flex gap-4 mb-6 pr-12">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Schritt Titel</label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => updateStep(sIdx, "title", e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Beschreibung</label>
                <input
                  type="text"
                  value={step.description}
                  onChange={(e) => updateStep(sIdx, "description", e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div className="w-32 flex items-end pb-2">
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={step.multiSelect}
                    onChange={(e) => updateStep(sIdx, "multiSelect", e.target.checked)}
                    className="w-4 h-4 rounded bg-black/40 border-white/10 text-brand-accent focus:ring-brand-accent focus:ring-offset-gray-900"
                  />
                  Mehrfachauswahl
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-300">Optionen:</h4>
              {step.options.map((opt, oIdx) => (
                <div key={opt.id} className="flex gap-3 items-center bg-black/20 p-3 rounded-xl border border-white/5">
                  <GripVertical size={16} className="text-gray-600 cursor-grab" />
                  
                  <input
                    type="text"
                    value={opt.title}
                    onChange={(e) => updateOption(sIdx, oIdx, "title", e.target.value)}
                    placeholder="Titel"
                    className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-accent"
                  />
                  
                  <input
                    type="text"
                    value={opt.description}
                    onChange={(e) => updateOption(sIdx, oIdx, "description", e.target.value)}
                    placeholder="Details"
                    className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-accent"
                  />
                  
                  <div className="w-24 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
                    <input
                      type="number"
                      value={opt.basePrice}
                      onChange={(e) => updateOption(sIdx, oIdx, "basePrice", Number(e.target.value))}
                      className="w-full bg-black/40 border border-white/10 rounded pl-7 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  <label className="flex items-center gap-1 text-xs text-gray-400">
                    <input
                      type="checkbox"
                      checked={opt.isPackage || false}
                      onChange={(e) => updateOption(sIdx, oIdx, "isPackage", e.target.checked)}
                      className="rounded bg-black/40 border-white/10 text-brand-accent"
                    />
                    Als Basis-Paket (Multiplier)
                  </label>

                  {opt.isPackage && (
                    <input
                      type="number"
                      value={opt.multiplierIndex || 1}
                      onChange={(e) => updateOption(sIdx, oIdx, "multiplierIndex", Number(e.target.value))}
                      placeholder="Faktor (z.B. 1,2,3)"
                      className="w-16 bg-black/40 border border-white/10 rounded px-2 py-1.5 text-sm text-white text-center focus:outline-none focus:border-brand-accent"
                      title="Multiplikator (1=S, 2=M, 3=L, 4=XL)"
                    />
                  )}

                  <button 
                    onClick={() => removeOption(sIdx, oIdx)}
                    className="text-gray-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              
              <button 
                onClick={() => addOption(sIdx)}
                className="text-sm font-medium text-brand-accent hover:text-white flex items-center gap-1 transition-colors mt-2 cursor-pointer"
              >
                <Plus size={16} />
                Option hinzufügen
              </button>
            </div>
          </div>
        ))}

        <button 
          onClick={addStep}
          className="w-full py-4 border-2 border-dashed border-white/10 hover:border-brand-accent/50 rounded-2xl text-gray-400 hover:text-brand-accent flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Plus size={20} />
          Neuen Schritt hinzufügen
        </button>
      </div>
    </div>
  );
}
