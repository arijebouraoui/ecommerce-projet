import { GoogleGenerativeAI } from '@google/generative-ai';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

// Initialize AI client
let genAI = null;
let GEMINI_AVAILABLE = false;

try {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your-api-key-here') {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    GEMINI_AVAILABLE = true;
    console.log('✅ Gemini API initialized successfully');
  } else {
    console.log('⚠️  Gemini API key not configured - using fallback mode');
  }
} catch (error) {
  console.log('⚠️  Gemini initialization failed:', error.message);
  GEMINI_AVAILABLE = false;
}

const GEMINI_MODEL = 'gemini-1.5-flash'; // Modèle stable

// === FONCTION UTILITAIRE: FORMATER PRIX EN DT ===
const formatPrice = (price) => {
  if (!price || isNaN(price)) return '0 DT';
  
  // Format tunisien avec espace pour milliers
  const formatted = new Intl.NumberFormat('fr-TN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(price);
  
  return `${formatted} DT`;
};

// === FALLBACK FUNCTIONS ===

function getFallbackChatResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  const responses = {
    greeting: [
      "Bonjour! 👋 Bienvenue dans notre boutique! Comment puis-je vous aider?",
      "Salut! 😊 Ravi de vous voir! Que cherchez-vous aujourd'hui?",
      "Bonjour! Je suis là pour vous aider! 🛍️"
    ],
    thanks: [
      "De rien! C'est un plaisir! 😊",
      "Avec plaisir! N'hésitez pas! 🌟",
      "Je vous en prie! 💙"
    ],
    price: [
      "Nos produits offrent un excellent rapport qualité-prix en DT! 💰",
      "Des prix compétitifs sur toute notre gamme! Tous affichés en Dinars Tunisiens! 💎",
      "Nous avons des produits pour tous les budgets! Prix en DT! 🏷️"
    ],
    shipping: [
      "Livraison en 3-5 jours partout en Tunisie! 🚚",
      "Livraison rapide et sécurisée! 📦",
      "Service de livraison fiable! 🚀"
    ],
    payment: [
      "Paiement 100% sécurisé! 💳 Carte, espèces, ou en ligne.",
      "Plusieurs modes de paiement disponibles! 🔒",
      "Paiement flexible et sécurisé! 💰"
    ],
    default: [
      "Je peux vous montrer nos montres 📱, téléphones 📞, vêtements 👔 ou produits enfants 👶!",
      "Que recherchez-vous? Je suis là pour vous aider! 🎯",
      "Demandez-moi de vous montrer une catégorie! ✨"
    ]
  };

  if (lowerMessage.match(/\b(hello|hi|bonjour|salut)\b/)) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  } else if (lowerMessage.match(/\b(merci|thank|thanks)\b/)) {
    return responses.thanks[Math.floor(Math.random() * responses.thanks.length)];
  } else if (lowerMessage.match(/\b(prix|price|cost|combien)\b/)) {
    return responses.price[Math.floor(Math.random() * responses.price.length)];
  } else if (lowerMessage.match(/\b(livraison|shipping|delivery)\b/)) {
    return responses.shipping[Math.floor(Math.random() * responses.shipping.length)];
  } else if (lowerMessage.match(/\b(paiement|payment|pay)\b/)) {
    return responses.payment[Math.floor(Math.random() * responses.payment.length)];
  } else {
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  }
}

function detectCategoryByKeywords(message, categories) {
  const lowerMessage = message.toLowerCase();
  
  // Patterns avec priorité (plus spécifique en premier)
  const patterns = [
    // Montres
    { 
      keywords: ['watch', 'watches', 'montre', 'montres', 'smartwatch', 'smart watch'], 
      slugs: ['smart-watches', 'watch', 'watches', 'montres']
    },
    // Téléphones
    { 
      keywords: ['phone', 'mobile', 'téléphone', 'smartphone', 'iphone', 'samsung'], 
      slugs: ['mobiles', 'mobile', 'phones', 'telephones']
    },
    // Collection Homme
    { 
      keywords: ['men', 'homme', 'costume', 'chemise', 'pantalon', 'men collection'], 
      slugs: ['men-collection', 'homme', 'hommes']
    },
    // Enfants
    { 
      keywords: ['kid', 'kids', 'enfant', 'enfants', 'basket', 'children'], 
      slugs: ['kids-collection', 'digital-kids', 'enfants']
    },
    // Femmes
    { 
      keywords: ['women', 'femme', 'femmes', 'robe', 'jupe', 'women collection'], 
      slugs: ['women-collection', 'femme', 'femmes']
    },
    // Maquillage
    { 
      keywords: ['makeup', 'maquillage', 'cosmetic', 'beauty'], 
      slugs: ['makeup', 'maquillage', 'beaute']
    },
    // Skincare
    { 
      keywords: ['skincare', 'skin', 'soin', 'creme', 'gel'], 
      slugs: ['skincare', 'soin']
    }
  ];

  for (const pattern of patterns) {
    for (const keyword of pattern.keywords) {
      if (lowerMessage.includes(keyword)) {
        // Chercher la catégorie correspondante
        for (const slug of pattern.slugs) {
          const category = categories.find(c => 
            c.slug === slug || 
            c.slug.includes(slug) || 
            c.name.toLowerCase().includes(keyword)
          );
          if (category) {
            console.log(`✅ Keyword match: "${keyword}" -> Category: ${category.name} (${category.slug})`);
            return category;
          }
        }
      }
    }
  }

  return null;
}

function getFallbackProductMessage(categoryName, productsCount) {
  const messages = [
    `Excellent choix! 🌟 Voici ${productsCount} ${categoryName} pour vous! Prix en DT.`,
    `Parfait! ✨ J'ai trouvé ${productsCount} ${categoryName} intéressants! Tous les prix en Dinars Tunisiens.`,
    `Super! 🎯 Découvrez ces ${productsCount} ${categoryName}! Prix affichés en DT.`,
    `Génial! 💎 Voici ${productsCount} ${categoryName} de qualité! Tarifs en Dinars Tunisiens.`,
    `Top! 🔥 ${productsCount} ${categoryName} sélectionnés pour vous! Prix en DT.`
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
}

// === CHAT AVEC IA ===

export const chatWithAI = async (req, res) => {
  try {
    console.log('🤖 Chat request received');
    
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    if (!GEMINI_AVAILABLE) {
      console.log('⚠️  Gemini not available, using fallback...');
      const fallbackResponse = getFallbackChatResponse(message);
      
      return res.status(200).json({ 
        success: true,
        message: fallbackResponse,
        source: 'fallback'
      });
    }

    try {
      console.log('🤖 Calling Gemini API...');
      
      const model = genAI.getGenerativeModel({ 
        model: GEMINI_MODEL,
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 200,
        }
      });

      const prompt = `Tu es un assistant e-commerce sympathique pour une boutique tunisienne.

Question du client: ${message}

Réponds de manière utile et amicale en français (maximum 3 phrases).
IMPORTANT: Tous les prix sont en Dinars Tunisiens (DT), PAS en dollars ($).
Si tu mentionnes un prix, utilise TOUJOURS "DT" (exemple: "150 DT", "1 500 DT").`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      console.log('✅ Gemini AI response received');

      return res.status(200).json({ 
        success: true,
        message: text,
        source: 'gemini'
      });
      
    } catch (geminiError) {
      console.log('⚠️  Gemini error, using fallback...');
      console.log('Error details:', geminiError.message);
      
      const fallbackResponse = getFallbackChatResponse(message);
      
      return res.status(200).json({ 
        success: true,
        message: fallbackResponse,
        source: 'fallback'
      });
    }

  } catch (error) {
    console.error('❌ Chat Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Service indisponible.'
    });
  }
};

// === RECOMMANDATIONS AVEC IA (AMÉLIORÉ) ===

export const getRecommendations = async (req, res) => {
  try {
    console.log('🔍 Recommendation request received');
    
    const { userMessage } = req.body;

    if (!userMessage) {
      return res.status(400).json({
        success: false,
        message: 'Message requis'
      });
    }

    // Récupérer toutes les catégories
    const categories = await Category.find({});
    console.log(`📂 Found ${categories.length} categories:`, categories.map(c => c.slug).join(', '));
    
    if (!categories || categories.length === 0) {
      return res.status(200).json({
        success: true,
        products: [],
        message: "Aucune catégorie disponible."
      });
    }

    let detectedCategory = null;
    let categoryName = 'produits';
    let aiMessage = '';

    // ===== ÉTAPE 1: DÉTECTER LA CATÉGORIE AVEC GEMINI =====
    if (GEMINI_AVAILABLE) {
      try {
        console.log('🤖 Trying Gemini for category detection...');
        
        const model = genAI.getGenerativeModel({ 
          model: GEMINI_MODEL,
          generationConfig: {
            temperature: 0.3, // Plus bas pour plus de précision
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 50,
          }
        });
        
        const categoryList = categories.map(c => `- ${c.name} (slug: ${c.slug})`).join('\n');
        
        const detectionPrompt = `Tu es un expert en classification de produits.

Catégories disponibles:
${categoryList}

Message de l'utilisateur: "${userMessage}"

Instructions:
1. Si l'utilisateur demande des montres/watches → réponds "smart-watches"
2. Si l'utilisateur demande des téléphones/phones → réponds "mobiles"
3. Si l'utilisateur demande des vêtements homme → réponds "men-collection"
4. Si l'utilisateur demande des produits enfants → réponds "kids-collection"
5. Si c'est général ou plusieurs catégories → réponds "all"
6. Si ce n'est pas une demande produit → réponds "none"

Réponds UNIQUEMENT avec le slug exact (exemple: "smart-watches"), sans explication.`;

        const detectionResult = await model.generateContent(detectionPrompt);
        const detectionResponse = detectionResult.response;
        const detected = detectionResponse.text().trim().toLowerCase().replace(/["'`]/g, '');

        console.log('🎯 Gemini detected slug:', detected);

        // Si ce n'est pas une demande de produits
        if (detected === 'none') {
          return res.status(200).json({
            success: true,
            products: [],
            message: "Je suis là pour vous aider! Nos catégories disponibles: " + 
                     categories.map(c => c.name).join(', ') + ". Que voulez-vous voir?"
          });
        }

        // Si c'est "all", on ne filtre pas
        if (detected !== 'all') {
          // Chercher la catégorie exacte par slug
          detectedCategory = categories.find(c => c.slug === detected);
          
          // Si pas trouvé par slug exact, chercher par correspondance partielle
          if (!detectedCategory) {
            detectedCategory = categories.find(c => 
              c.slug.includes(detected) || 
              detected.includes(c.slug)
            );
          }
          
          if (detectedCategory) {
            console.log('✅ Category found:', detectedCategory.name, `(${detectedCategory.slug})`);
          } else {
            console.log('⚠️  Slug not found:', detected);
          }
        }
        
      } catch (geminiError) {
        console.log('⚠️  Gemini detection failed:', geminiError.message);
      }
    }

    // ===== ÉTAPE 2: FALLBACK - DÉTECTION PAR MOTS-CLÉS =====
    if (!detectedCategory) {
      console.log('🔍 Using keyword detection fallback...');
      detectedCategory = detectCategoryByKeywords(userMessage, categories);
    }

    // ===== ÉTAPE 3: CONSTRUIRE LA REQUÊTE =====
    let query = {};
    if (detectedCategory) {
      query = { category: detectedCategory._id };
      categoryName = detectedCategory.name;
      console.log('🔎 Filtering by category:', categoryName, `(ID: ${detectedCategory._id})`);
    } else {
      console.log('🔎 Showing all products (no specific category detected)');
    }

    // ===== ÉTAPE 4: RÉCUPÉRER LES PRODUITS =====
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .select('name price description photo category slug quantity')
      .limit(10)
      .lean();

    console.log(`✅ Found ${products.length} products`);

    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        products: [],
        message: `Désolé, pas de ${categoryName} disponibles pour le moment. 😔`
      });
    }

    // ===== ÉTAPE 5: FORMATER LES PRODUITS AVEC PRIX EN DT =====
    const formattedProducts = products.map(product => ({
      ...product,
      price: product.price, // Prix numérique original
      formattedPrice: formatPrice(product.price), // Prix formaté: "150 DT" ou "1 500 DT"
      priceValue: product.price, // Pour calculs
      currency: 'DT' // Devise
    }));

    // ===== ÉTAPE 6: GÉNÉRER LE MESSAGE D'INTRODUCTION =====
    if (GEMINI_AVAILABLE) {
      try {
        console.log('💬 Generating intro message with Gemini...');
        
        const model = genAI.getGenerativeModel({ 
          model: GEMINI_MODEL,
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 100,
          }
        });
        
        // Liste des produits avec prix formatés en DT
        const productList = products.slice(0, 3).map(p => 
          `${p.name} (${formatPrice(p.price)})`
        ).join(', ');

        const introPrompt = `L'utilisateur a dit: "${userMessage}"

Nous lui montrons ${products.length} ${categoryName}.
Exemples avec prix: ${productList}

Écris UNE SEULE phrase enthousiaste en français (maximum 15 mots) pour introduire ces produits.
IMPORTANT: Les prix sont en Dinars Tunisiens (DT), PAS en dollars ($).
Si tu mentionnes un prix, utilise "DT" (exemple: "à partir de 150 DT").`;

        const introResult = await model.generateContent(introPrompt);
        const introResponse = introResult.response;
        aiMessage = introResponse.text().trim();
        
        console.log('✅ Gemini intro generated:', aiMessage);
        
      } catch (geminiError) {
        console.log('⚠️  Gemini intro failed, using fallback message');
        aiMessage = getFallbackProductMessage(categoryName, products.length);
      }
    } else {
      aiMessage = getFallbackProductMessage(categoryName, products.length);
    }

    // ===== ÉTAPE 7: ENVOYER LA RÉPONSE =====
    console.log('✅ Response ready - sending products with DT currency');

    res.status(200).json({
      success: true,
      products: formattedProducts,
      aiMessage: aiMessage,
      detectedCategory: categoryName,
      categorySlug: detectedCategory?.slug || null,
      totalProducts: products.length,
      currency: 'DT' // Indiquer la devise
    });

  } catch (error) {
    console.error('❌ Recommendation Error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la génération des recommandations'
    });
  }
};