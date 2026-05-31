const { GoogleGenerativeAI } = require("@google/generative-ai");
const { ChromaClient } = require("chromadb");
const fs = require("fs");
const path = require("path");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const chroma = new ChromaClient({ path: "http://localhost:8000" });
const COLLECTION_NAME = "rangras_kala_knowledge";

// Helper to chunk text
function chunkText(text, maxWords = 100) {
    const words = text.split(/\s+/);
    const chunks = [];
    for (let i = 0; i < words.length; i += maxWords) {
        chunks.push(words.slice(i, i + maxWords).join(" "));
    }
    return chunks;
}

// Get embeddings
async function getEmbeddings(text) {
    const model = genAI.getGenerativeModel({ model: "embedding-001" });
    const result = await model.embedContent(text);
    return result.embedding.values;
}

// Initialize and index data
async function indexData() {
    try {
        console.log("Indexing data into ChromaDB...");
        const dataPath = path.join(__dirname, "../data/website_data.json");
        const rawData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        
        let documents = [];
        
        // Process About Us
        if (rawData.aboutUs) {
            documents.push({ text: `About Us: ${rawData.aboutUs}`, metadata: { source: "aboutUs" } });
        }
        
        // Process Policies
        if (rawData.shippingPolicy) {
            documents.push({ text: `Shipping Policy: ${rawData.shippingPolicy}`, metadata: { source: "shippingPolicy" } });
        }
        if (rawData.returnPolicy) {
            documents.push({ text: `Return/Refund Policy: ${rawData.returnPolicy}`, metadata: { source: "returnPolicy" } });
        }
        
        // Process Contact Info
        if (rawData.contactInfo) {
            documents.push({ text: `Contact Info - Email: ${rawData.contactInfo.email}, Phone: ${rawData.contactInfo.phone}, Address: ${rawData.contactInfo.address}`, metadata: { source: "contactInfo" } });
        }
        
        // Process FAQs
        if (rawData.faqs && Array.isArray(rawData.faqs)) {
            rawData.faqs.forEach((faq, index) => {
                documents.push({ text: `FAQ: Q: ${faq.question} A: ${faq.answer}`, metadata: { source: `faq_${index}` } });
            });
        }
        
        // Create or get collection
        await chroma.deleteCollection({ name: COLLECTION_NAME }).catch(() => {}); // Delete if exists for fresh index
        const collection = await chroma.createCollection({ name: COLLECTION_NAME });
        
        const ids = [];
        const embeddings = [];
        const metadatas = [];
        const texts = [];
        
        for (let i = 0; i < documents.length; i++) {
            const doc = documents[i];
            const embedding = await getEmbeddings(doc.text);
            ids.push(`doc_${i}`);
            embeddings.push(embedding);
            metadatas.push(doc.metadata);
            texts.push(doc.text);
        }
        
        if (ids.length > 0) {
            await collection.add({
                ids,
                embeddings,
                metadatas,
                documents: texts
            });
            console.log("Vector DB indexed successfully.");
        }
    } catch (error) {
        console.error("Error indexing data:", error);
    }
}

// Query the knowledge base
async function queryKnowledgeBase(question) {
    try {
        const questionEmbedding = await getEmbeddings(question);
        const collection = await chroma.getCollection({ name: COLLECTION_NAME });
        
        const results = await collection.query({
            queryEmbeddings: [questionEmbedding],
            nResults: 3
        });
        
        if (results && results.documents && results.documents[0].length > 0) {
            return results.documents[0].join("\n\n");
        }
        return "";
    } catch (error) {
        console.error("Error querying ChromaDB:", error);
        return "";
    }
}

// Generate Response
async function generateResponse(question) {
    const context = await queryKnowledgeBase(question);
    
    const prompt = `You are a helpful AI customer support assistant for a handmade art e-commerce website called Rangras Kala Studio. 
Your goal is to answer questions about our website, custom handmade artworks, traditional paintings, personalized gifts, and policies.

Here is some retrieved context from our database to help you answer:
Context: ${context || "No specific context found. Answer based on the fact that we sell custom handmade art, paintings, and gifts."}

Rule: If the user asks a question completely unrelated to this website, its products, art, or e-commerce (e.g., coding, politics, general history), you MUST respond exactly with: "Sorry, I can only answer questions related to this website and its products."

User Question: ${question}
Answer:`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
}

module.exports = {
    indexData,
    queryKnowledgeBase,
    generateResponse
};
