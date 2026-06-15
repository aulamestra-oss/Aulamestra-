export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Metodo nao permitido" });
  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: "API key nao configurada." });
  const { tema, nivel, duracao, num_slides, extensao, formato, objetivos } = req.body;
  const PROMPT = `Crie uma aula COMPLETA sobre "${tema}" para ${nivel}, duracao ${duracao}, exatamente ${num_slides} slides, formato ${formato}, extensao ${extensao}. ${objetivos ? `Objetivos: ${objetivos}` : ""} Retorne APENAS JSON puro sem markdown: {"titulo":"...","nivel":"${nivel}","duracao":"${duracao}","objetivos_aprendizagem":["objetivo1","objetivo2","objetivo3","objetivo4"],"resumo_executivo":"4 paragrafos ricos","slides":[{"titulo":"...","conteudo":"3-4 frases detalhadas","tipo":"INTRO","emoji":"🌱","destaque":"frase marcante"}],"bncc_competencias":[{"codigo":"EF07CI05","area":"Ciencias","descricao":"..."}],"atividades":[{"titulo":"...","descricao":"passo a passo","fase":"Introducao","duracao_min":10,"modalidade":"Grupo","materiais":["item1"]}],"referencias":["ref1","ref2","ref3","ref4","ref5","ref6"],"dica_professor":"dica pratica"} Gere exatamente ${num_slides} slides variados, 5 competencias BNCC reais, 4 atividades, 6 referencias ABNT.`;
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 8000, system: "Voce e um sistema pedagogico especialista. Responda APENAS com JSON puro valido. Sem markdown.", messages: [{ role: "user", content: PROMPT }] }),
    });
    const data = await response.json();
    const raw = data.content.map(b => b.text || "").join("");
    const clean = raw.replace(/^```json\s*/,"").replace(/^```/,"").replace(/```$/,"").trim();
    return res.status(200).json(JSON.parse(clean));
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
